import { onObjectFinalized } from "firebase-functions/v2/storage";
import * as admin from "firebase-admin";
import { defineString } from "firebase-functions/params";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();

const DIARIZER_API_URL = defineString("DIARIZER_API_URL");
const DIARIZER_API_KEY = defineString("DIARIZER_API_KEY");

export const processDiarization = onObjectFinalized(
  {
    bucket: "ts-diarize-api.firebasestorage.app",
    memory: "1GiB",
    timeoutSeconds: 300
  },
  async (event) => {
    const object = event.data;
    console.log("FUNCTION TRIGGERED onObjectFinalized for bucket:", object.bucket);
    console.log("Object details:", JSON.stringify(object));

    const filePath = object.name;
    if (!filePath || !filePath.startsWith("audios/")) {
      console.log(`Skipping: path ${filePath} does not start with 'audios/'`);
      return;
    }

    const pathParts = filePath.split("/");
    if (pathParts.length < 3) {
      console.log(`Skipping: path ${filePath} does not have enough parts (${pathParts.length})`);
      return;
    }

    const userId = pathParts[1];
    const filename = pathParts.slice(2).join("/"); // Get everything after /audios/<userId>/
    console.log(`Extracted userId: ${userId}, filename: ${filename} from filePath: ${filePath}`);

    let tempFilePath: string | null = null;
    let tempOpusPath: string | null = null;

    try {
      console.log(`Processing audio: ${filePath}`);

      // Descargar el archivo
      const bucket = storage.bucket(object.bucket); // Changed to use object.bucket
      const file = bucket.file(filePath);
      tempFilePath = path.join(os.tmpdir(), `audio_${Date.now()}`);

      await file.download({ destination: tempFilePath });
      console.log(`Audio downloaded to: ${tempFilePath}`);

      // Archivo de destino para Opus
      tempOpusPath = path.join(os.tmpdir(), `audio_opus_${Date.now()}.ogg`);

      console.log(`Starting conversion to Opus 16kHz...`);
      await new Promise<void>((resolve, reject) => {
        ffmpeg(tempFilePath as string)
          .audioCodec('libopus')
          .audioFrequency(16000)
          .audioChannels(1) // Monocanal es ideal para diarización
          .toFormat('ogg')
          .on('error', (err) => {
            console.error('Error in FFMPEG conversion:', err);
            reject(err);
          })
          .on('end', () => {
            console.log('FFMPEG conversion finished successfully');
            resolve();
          })
          .save(tempOpusPath as string);
      });

      // Leer el archivo convertido y pasarlo a base64
      const audioBuffer = fs.readFileSync(tempOpusPath);
      const base64Audio = audioBuffer.toString("base64");
      console.log(`Audio converted to Opus base64, size: ${base64Audio.length} chars`);

      // Enviar a la API de diarización
      console.log("Sending to diarization API...");
      const response = await axios.post(
        DIARIZER_API_URL.value(),
        {
          audio: base64Audio,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": DIARIZER_API_KEY.value(),
          },
          timeout: 300000, // Aumentado a 5 minutos (300,000 ms)
        }
      );

      console.log("API response received:", JSON.stringify(response.data).substring(0, 200));

      // Buscar el documento en Firestore
      const diarizationsRef = db.collection("diarizations");

      // Since filename in frontend might not have the timestamp prefix created by Storage, 
      // let's do a more permissive search by userId and status processing, and match the end of the filename
      const snapshot = await diarizationsRef
        .where("userId", "==", userId)
        .where("status", "==", "processing")
        .get();

      let targetDocId = null;

      if (!snapshot.empty) {
        // Find the specific file or just fallback to the first 'processing' document
        for (const doc of snapshot.docs) {
          const docData = doc.data();
          if (filename.includes(docData.filename) || docData.filename.includes(filename)) {
            targetDocId = doc.id;
            break;
          }
        }

        if (!targetDocId) {
          console.log("Exact filename match not found, but found processing document. Using fallback.");
          targetDocId = snapshot.docs[0].id; // Fallback to the newest/first processing document
        }
      }

      if (!targetDocId) {
        console.log(`No diarization document found in processing state for userId: ${userId}`);
        return;
      }

      // Actualizar documento
      console.log(`Found diarization document ID: ${targetDocId}, updating to completed...`);

      await diarizationsRef.doc(targetDocId).update({
        status: "completed",
        result: response.data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Diarization completed successfully for ${targetDocId}`);
    } catch (error: any) {
      const errorMessage = error?.message || String(error);
      console.error("CRITICAL ERROR during processDiarization:", errorMessage);
      if (error.response) {
        console.error("API Response Error Status:", error.response.status);
        console.error("API Response Error Data:", JSON.stringify(error.response.data));
      }
      console.error("Error payload trace:", error);

      try {
        const diarizationsRef = db.collection("diarizations");
        const query = diarizationsRef
          .where("userId", "==", userId)
          .where("status", "==", "processing");

        const snapshot = await query.get();

        let targetDocId = null;

        if (!snapshot.empty) {
          for (const doc of snapshot.docs) {
            const docData = doc.data();
            if (filename.includes(docData.filename) || docData.filename.includes(filename)) {
              targetDocId = doc.id;
              break;
            }
          }
          if (!targetDocId) {
            targetDocId = snapshot.docs[0].id;
          }
        }

        if (targetDocId) {
          await diarizationsRef.doc(targetDocId).update({
            status: "error",
            errorMessage: errorMessage,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
          console.log(`Error status successfully updated in Firestore for docId: ${targetDocId}`);
        } else {
          console.log(`CRITICAL: Could not write error to Firestore. No processing document found for userId: ${userId}`);
        }
      } catch (updateError) {
        console.error("Error while updating error status in Firestore:", updateError);
      }
    } finally {
      // Limpiar temporales
      try {
        if (tempFilePath && fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
        if (tempOpusPath && fs.existsSync(tempOpusPath)) fs.unlinkSync(tempOpusPath);
      } catch (cleanupErr) {
        console.error("Error cleaning up temp files:", cleanupErr);
      }
    }
  });
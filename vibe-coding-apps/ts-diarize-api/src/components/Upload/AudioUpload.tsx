import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';

export const AudioUpload: React.FC<{ onUploadComplete: () => void }> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const { currentUser } = useAuth();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setError('');
      } else {
        setError('Por favor selecciona un archivo de audio');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !currentUser) return;

    setUploading(true);
    setError('');

    try {
      // Subir archivo a Storage
      const storageRef = ref(storage, `audios/${currentUser.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const audioUrl = await getDownloadURL(storageRef);

      // Crear documento en Firestore
      const diarizationRef = collection(db, 'diarizations');
      await addDoc(diarizationRef, {
        userId: currentUser.uid,
        filename: file.name,
        audioUrl: audioUrl,
        status: 'processing',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      } as any);

      // Limpiar estado
      setFile(null);
      setFileName('');
      onUploadComplete();
    } catch (err: any) {
      setError(err.message || 'Error al subir el archivo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Subir audio</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition cursor-pointer">
        <label className="cursor-pointer">
          <div className="mb-2">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-8v20m-7-7l7 7 7-7"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            {fileName || 'Haz clic para seleccionar un archivo'}
          </p>
          <p className="text-xs text-gray-500">MP3, WAV, M4A, etc.</p>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full mt-4 bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50"
      >
        {uploading ? 'Subiendo...' : 'Subir y diarizar'}
      </button>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import type { Diarization } from '../../types';

interface DiarizationListProps {
  refreshTrigger: number;
}

export const DiarizationList: React.FC<DiarizationListProps> = ({ refreshTrigger }) => {
  const [diarizations, setDiarizations] = useState<Diarization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);

    const q = query(
      collection(db, 'diarizations'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Diarization[] = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Diarization);
      });
      setDiarizations(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser, refreshTrigger]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'processing':
        return 'En proceso';
      case 'completed':
        return 'Completado';
      case 'error':
        return 'Error';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border border-gray-300 border-t-black mx-auto mb-3"></div>
          <p className="text-sm text-gray-500">Cargando diarizaciones...</p>
        </div>
      </div>
    );
  }

  if (diarizations.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-500 mb-2">No hay diarizaciones aún</p>
          <p className="text-sm text-gray-400">Sube un audio para empezar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {diarizations.map((diarization) => (
        <div
          key={diarization.id}
          onClick={() => (diarization.status === 'completed' || diarization.status === 'error') && setSelectedId(selectedId === diarization.id ? null : diarization.id)}
          className={`border border-gray-200 rounded-lg p-4 transition ${(diarization.status === 'completed' || diarization.status === 'error') ? 'cursor-pointer hover:border-gray-300' : ''
            }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-sm mb-1">
                {diarization.filename}
              </h3>
              <p className="text-xs text-gray-500">
                {diarization.createdAt.toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(
                diarization.status
              )}`}
            >
              {getStatusLabel(diarization.status)}
            </span>
          </div>

          {/* Mostrar resultado si está completado y está seleccionado */}
          {selectedId === diarization.id && diarization.status === 'completed' && diarization.result && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Resultado:</h4>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {Array.isArray(diarization.result.diarization) ? (
                  diarization.result.diarization.map((segment: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 rounded p-3 border border-gray-100">
                      <p className="text-xs font-semibold text-indigo-600 mb-1">
                        Speaker {segment.speaker}
                      </p>
                      <p className="text-sm text-gray-700">{segment.text || "(Audio detectado sin texto)"}</p>
                      <p className="text-xs text-gray-500 mt-1 font-mono">
                        {segment.start.toFixed(2)}s - {segment.end.toFixed(2)}s
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-yellow-50 text-yellow-800 rounded">
                    El formato del resultado no es el esperado.
                    <pre className="mt-2 text-xs overflow-x-auto">
                      {JSON.stringify(diarization.result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mostrar error si está seleccionado */}
          {selectedId === diarization.id && diarization.status === 'error' && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs font-semibold text-red-900 mb-1">Error:</p>
                <p className="text-sm text-red-700 font-mono break-all">{diarization.errorMessage || 'Error desconocido'}</p>
                {diarization.result && (
                  <pre className="mt-2 text-xs text-red-700 overflow-x-auto">
                    {JSON.stringify(diarization.result, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
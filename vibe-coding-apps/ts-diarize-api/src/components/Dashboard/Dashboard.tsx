import React, { useState } from 'react';
import { AudioUpload } from '../Upload/AudioUpload';
import { DiarizationList } from '../Dashboard/DiarizationList';
import { Navbar } from '../Layout/Navbar';

export const Dashboard: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadComplete = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Upload */}
          <div className="lg:col-span-1">
            <AudioUpload onUploadComplete={handleUploadComplete} />
          </div>

          {/* Columna derecha - Lista de diarizaciones */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Diarizaciones
              </h2>
              <DiarizationList refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
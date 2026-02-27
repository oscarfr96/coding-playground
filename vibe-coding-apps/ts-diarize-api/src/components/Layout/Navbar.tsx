import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-light tracking-tight text-gray-900">
              ts-diarize
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              {currentUser?.email}
            </p>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 text-gray-700 hover:text-gray-900 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-arcade-dark flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-arcade-yellow border-t-transparent rounded-full animate-spin mb-6 shadow-arcade-yellow"></div>
        <p className="font-arcade text-arcade-yellow text-sm tracking-wider animate-pulse">
          CHECKING ADMIN CREDENTIALS...
        </p>
        <p className="font-vt text-slate-400 text-xl mt-2">
          INSERTING AUTH TOKEN
        </p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

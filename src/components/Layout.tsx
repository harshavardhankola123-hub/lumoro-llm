import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../store/authStore';

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="w-full flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto h-screen relative">
        <Outlet />
      </div>
    </div>
  );
}

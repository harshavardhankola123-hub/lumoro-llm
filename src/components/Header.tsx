import React from 'react';
import { useAuth } from '../store/authStore';
import { Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <header className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 flex-shrink-0">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        {actions}
        
        {/* Notification Bell */}
        <button className="w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 relative">
          <span className="w-2 h-2 rounded-full bg-lumora-600 absolute top-2 right-2"></span>
          <Bell className="w-4 h-4" />
        </button>
        
        {/* Profile/Badge depends on role */}
        {user.role === 'student' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-lumora-50 text-lumora-700 rounded-full text-xs font-semibold border border-lumora-100">
            Batch 04 · Week 6 of 12
          </span>
        )}
      </div>
    </header>
  );
}

import React from 'react';
import { useAuth } from '../store/authStore';
import { useAdmin } from '../store/AdminContext';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { loginAsUser } = useAuth();
  const { data } = useAdmin();
  const navigate = useNavigate();
  
  const handleLogin = (role: 'student' | 'faculty' | 'admin') => {
    // Find the first user in AdminContext that matches this role
    const customUser = data?.users?.find((u: any) => u.role.toLowerCase() === role.toLowerCase());
    
    if (customUser) {
      const mappedUser = {
        id: customUser.id,
        name: customUser.name,
        role: customUser.role.toLowerCase() as any,
        email: customUser.email,
        avatarInitials: customUser.avatar || customUser.name.substring(0, 2).toUpperCase()
      };
      
      loginAsUser(mappedUser);
      
      if (role === 'admin') navigate('/admin');
      else if (role === 'faculty') navigate('/faculty');
      else navigate('/student');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 min-h-screen p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 text-center border-b border-slate-100">
          <div className="w-12 h-12 mx-auto bg-lumora-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-sm mb-4">
            L
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">LumoraSpace</h1>
          <p className="text-sm text-slate-500 mt-2">Select your portal to enter.</p>
        </div>
        
        <div className="p-8 space-y-4">
          <button 
            onClick={() => handleLogin('student')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 hover:border-lumora-300 hover:bg-lumora-50 text-left transition group"
          >
            <div>
              <p className="text-sm font-bold text-slate-900 group-hover:text-lumora-700">Student Portal</p>
              <p className="text-xs text-slate-500">Access courses & progress</p>
            </div>
            <LogIn className="w-5 h-5 text-slate-400 group-hover:text-lumora-600" />
          </button>

          <button 
            onClick={() => handleLogin('faculty')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-left transition group"
          >
            <div>
              <p className="text-sm font-bold text-slate-900 group-hover:text-amber-700">Faculty / Mentor</p>
              <p className="text-xs text-slate-500">Manage courses & feedback</p>
            </div>
            <LogIn className="w-5 h-5 text-slate-400 group-hover:text-amber-600" />
          </button>

          <button 
            onClick={() => handleLogin('admin')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-left transition group"
          >
            <div>
              <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">Administrator</p>
              <p className="text-xs text-slate-500">Platform management</p>
            </div>
            <LogIn className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

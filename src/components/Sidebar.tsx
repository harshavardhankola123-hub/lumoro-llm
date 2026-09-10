import React from 'react';
import { useAuth } from '../store/authStore';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, Users, BookOpen, Layers, UserPlus, 
  UserCheck, GraduationCap, FileText, Award, BarChart3, 
  CreditCard, Bell, Settings, Target, MessageSquare, 
  Calendar, CheckSquare
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const adminNav: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Programs', href: '/admin/programs', icon: BookOpen },
  { name: 'Batches', href: '/admin/batches', icon: Layers },
  { name: 'Enrollments', href: '/admin/enrollments', icon: UserPlus },
  { name: 'Mentors', href: '/admin/mentors', icon: UserCheck },
  { name: 'Curriculum', href: '/admin/curriculum', icon: GraduationCap },
  { name: 'Assessments', href: '/admin/assessments', icon: FileText },
  { name: 'Certificates', href: '/admin/certificates', icon: Award },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const studentNav: NavItem[] = [
  { name: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { name: 'My Learning', href: '/student/learning', icon: BookOpen },
  { name: 'Practice Hub', href: '/student/practice', icon: Target },
  { name: 'Progress', href: '/student/progress', icon: BarChart3 },
  { name: 'Community', href: '/student/community', icon: MessageSquare },
];

const facultyNav: NavItem[] = [
  { name: 'Dashboard', href: '/faculty', icon: LayoutDashboard },
  { name: 'My Batches', href: '/faculty/batches', icon: Layers },
  { name: 'Grading', href: '/faculty/grading', icon: CheckSquare },
  { name: 'Schedule', href: '/faculty/schedule', icon: Calendar },
  { name: 'Students', href: '/faculty/students', icon: Users },
  { name: 'Resources', href: '/faculty/resources', icon: BookOpen },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = user.role === 'admin' 
    ? adminNav 
    : user.role === 'faculty' 
      ? facultyNav 
      : studentNav;

  const activeColor = user.role === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'bg-lumora-50 text-lumora-700';
  const logoColor = user.role === 'admin' ? 'bg-indigo-600' : 'bg-lumora-600';
  const logoText = user.role === 'admin' ? <span className="text-xs uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 ml-1">Admin</span> : null;

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between flex-shrink-0 z-20 h-screen sticky top-0 overflow-y-auto">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-3">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm", logoColor)}>
            L
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">
            Lumora<span className={user.role === 'admin' ? 'text-indigo-600' : 'text-lumora-600'}>Space</span>
            {logoText}
          </span>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition",
                  isActive 
                    ? activeColor 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 mt-auto">
        {user.role === 'admin' ? (
          <div className="text-xs text-slate-400 p-2">LumoraSpace Engine v2.4.0</div>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition" onClick={logout}>
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-medium text-xs text-slate-700 flex-shrink-0">
              {user.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">Log out</p>
            </div>
          </div>
        )}
        {user.role === 'admin' && (
           <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition mt-2 border-t border-slate-100" onClick={logout}>
             <div className="text-sm font-semibold text-slate-800">Log out Admin</div>
           </div>
        )}
      </div>
    </aside>
  );
}

import React, { createContext, useContext, useState } from 'react';
import { 
  programsData, 
  batchesData, 
  enrollmentsData, 
  mentorsData, 
  curriculumData, 
  assessmentsData, 
  paymentsData, 
  notificationsData 
} from '../data/mockAdminData';

const initialUsers = [
  { id: "1", name: "Sarah Miller", email: "sarah@lumoraspace.com", role: "Student", status: "Active", joined: "Jan 12, 2026", avatar: "SM", color: "bg-slate-200 text-slate-600" },
  { id: "2", name: "Alex Morgan", email: "alex@lumoraspace.com", role: "Faculty", status: "Active", joined: "Aug 05, 2025", avatar: "AM", color: "bg-amber-100 text-amber-700" },
  { id: "3", name: "Admin User", email: "admin@lumoraspace.com", role: "Admin", status: "Active", joined: "Mar 01, 2024", avatar: "AD", color: "bg-indigo-100 text-indigo-700" }
];

const initialCertificates = [
  { id: "LUM-2026-00124", learner: "Alex Morgan", program: "Forge Data Analyst", date: "Sep 01, 2026", status: "Valid" },
  { id: "LUM-2026-00125", learner: "David Vance", program: "Full Stack Developer", date: "Aug 28, 2026", status: "Valid" }
];

type AdminContextType = {
  data: Record<string, any[]>;
  addItem: (category: string, item: any) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [data, setData] = useState({
    users: initialUsers,
    programs: programsData.data,
    batches: batchesData.data,
    enrollments: enrollmentsData.data,
    mentors: mentorsData.data,
    curriculum: curriculumData.data,
    assessments: assessmentsData.data,
    certificates: initialCertificates,
    payments: paymentsData.data,
    notifications: notificationsData.data,
  });

  const addItem = (category: string, item: any) => {
    setData(prev => ({
      ...prev,
      [category]: [item, ...(prev[category as keyof typeof prev] || [])]
    }));
  };

  return (
    <AdminContext.Provider value={{ data, addItem }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};

import React, { useState } from 'react';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import { Search, Plus, Filter } from 'lucide-react';
import { useAdmin } from '../../store/AdminContext';

export default function Users() {
  const { data, addItem } = useAdmin();
  const users = data.users || [];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Student' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = formData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
    const newItem = {
      id: Math.random().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: "Active",
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      avatar: initials,
      color: formData.role === 'Student' ? 'bg-slate-200 text-slate-600' : formData.role === 'Faculty' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
    };
    
    addItem('users', newItem);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', role: 'Student' });
  };

  return (
    <>
      <Header 
        title="User Management" 
        subtitle="View, add, and manage platform users."
        actions={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add User
          </button>
        }
      />
      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <select className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>All Roles</option>
              <option>Student</option>
              <option>Faculty</option>
              <option>Admin</option>
            </select>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-semibold text-slate-500 tracking-wider">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Joined</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50/75 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${u.color}`}>{u.avatar}</div>
                      <div>
                        <p className="font-semibold text-slate-800">{u.name}</p>
                        <p className="text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4"><span className="text-slate-600 font-medium">{u.role}</span></td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{u.joined}</td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button className="font-medium text-indigo-600 hover:text-indigo-700">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
        <form className="space-y-4" onSubmit={handleAdd}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Full Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Jane Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="jane@example.com" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Role</label>
            <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="Student">Student</option>
              <option value="Faculty">Faculty / Mentor</option>
              <option value="Admin">Administrator</option>
            </select>
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">Create User</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

import React, { useState } from 'react';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import { Download, Plus } from 'lucide-react';
import { useAdmin } from '../../store/AdminContext';

export default function Certificates() {
  const { data, addItem } = useAdmin();
  const certificates = data.certificates || [];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ learner: '', program: '' });

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: `LUM-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`,
      learner: formData.learner,
      program: formData.program,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Valid'
    };
    
    addItem('certificates', newItem);
    setIsModalOpen(false);
    setFormData({ learner: '', program: '' });
  };

  return (
    <>
      <Header 
        title="Issued Certificates" 
        subtitle="Manage, verify, and revoke issued completion credentials."
        actions={
          <>
            <button className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition shadow-sm flex items-center gap-2">
              <Download className="w-3.5 h-3.5" />
              Export Registry
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              Issue Certificate
            </button>
          </>
        }
      />
      
      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Metric Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Issued</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{1246 + certificates.length}</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pending Verification</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">14</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Revoked Records</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">3</p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Templates</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">4</p>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-80">
            <input 
              type="text" 
              placeholder="Search by student or Certificate ID..." 
              className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>All Programs</option>
              <option>Forge Data Analyst</option>
              <option>Full Stack Developer</option>
            </select>
            <select className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>All Statuses</option>
              <option>Valid</option>
              <option>Revoked</option>
            </select>
          </div>
        </div>

        {/* Credential Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-semibold text-slate-500 tracking-wider">
                <th className="py-3.5 px-4">Certificate ID</th>
                <th className="py-3.5 px-4">Learner</th>
                <th className="py-3.5 px-4">Program Track</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {certificates.map((cert, index) => (
                <tr key={index} className="hover:bg-slate-50/75 transition">
                  <td className="py-3.5 px-4 font-mono font-medium text-indigo-600">{cert.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{cert.learner}</td>
                  <td className="py-3.5 px-4 text-slate-600">{cert.program}</td>
                  <td className="py-3.5 px-4 text-slate-500">{cert.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${cert.status.includes('Valid') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {cert.status} {cert.status === 'Valid' ? '· Verified' : ''}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button className="font-medium text-indigo-600 hover:text-indigo-700">View Detail</button>
                    <span className="text-slate-300">|</span>
                    <button className="font-medium text-rose-600 hover:text-rose-700">Revoke</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue New Certificate">
        <form className="space-y-4" onSubmit={handleIssue}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Learner Name</label>
            <input required type="text" value={formData.learner} onChange={e => setFormData({...formData, learner: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Jane Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Program Track</label>
            <input required type="text" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Full Stack Developer" />
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">Issue Certificate</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

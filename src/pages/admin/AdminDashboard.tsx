import React, { useState } from 'react';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import { Search, AlertTriangle, CheckSquare, UserMinus, ShieldAlert, UserPlus, FilePlus, Layers, UserCheck, Users, GraduationCap, Flame, Award } from 'lucide-react';
import { useAdmin } from '../../store/AdminContext';

export default function AdminDashboard() {
  const { data, addItem } = useAdmin();
  const [activeModal, setActiveModal] = useState<'addUser' | 'createProgram' | 'createBatch' | 'assignMentor' | null>(null);

  const closeModal = () => setActiveModal(null);

  const totalLearners = 12450 + (data.users?.filter(u => u.role === 'Student').length || 0) - 1; // mock logic base 12450 + additions
  const activeLearners = 1248 + (data.users?.filter(u => u.role === 'Student' && u.status === 'Active').length || 0) - 1;
  const activePrograms = data.programs?.filter(p => p.status === 'Published').length || 0;
  const activeMentors = data.mentors?.filter(m => m.status === 'Active').length || 0;

  // Add User Form State
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'Student' });
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = userForm.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
    addItem('users', {
      id: Math.random().toString(),
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      status: "Active",
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      avatar: initials,
      color: userForm.role === 'Student' ? 'bg-slate-200 text-slate-600' : userForm.role === 'Faculty' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
    });
    closeModal();
    setUserForm({ name: '', email: '', role: 'Student' });
  };

  // Add Program Form State
  const [programForm, setProgramForm] = useState({ title: '', duration: '6 Months' });
  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    addItem('programs', {
      id: `PRG-${Math.floor(Math.random() * 900) + 100}`,
      title: programForm.title,
      duration: programForm.duration,
      status: 'Draft'
    });
    closeModal();
    setProgramForm({ title: '', duration: '6 Months' });
  };

  // Add Batch Form State
  const [batchForm, setBatchForm] = useState({ program: 'Forge Data Analyst', startDate: '' });
  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const dateFormatted = batchForm.startDate ? new Date(batchForm.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Upcoming';
    addItem('batches', {
      id: `BAT-${Math.floor(Math.random() * 900) + 100}`,
      program: batchForm.program,
      start_date: dateFormatted,
      students: "0",
      status: "Upcoming"
    });
    closeModal();
    setBatchForm({ program: 'Forge Data Analyst', startDate: '' });
  };

  return (
    <>
      <Header 
        title="Dashboard" 
        subtitle="Overview of your LumoraSpace platform."
        actions={
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Global Search..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none w-64"
              />
            </div>
            <div className="flex bg-slate-100 rounded-full p-1">
              <button className="px-3 py-1 text-xs font-medium text-slate-600 rounded-full hover:bg-white">7d</button>
              <button className="px-3 py-1 text-xs font-medium bg-indigo-600 text-white rounded-full shadow-sm">30d</button>
              <button className="px-3 py-1 text-xs font-medium text-slate-600 rounded-full hover:bg-white">90d</button>
            </div>
          </div>
        }
      />
      
      <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Needs Attention Panel */}
          <div className="lg:col-span-2 bg-[#fdf2f0] border border-[#fad4ce] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-rose-700 font-semibold mb-6">
              <AlertTriangle className="w-5 h-5" />
              <span>Needs Attention</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/60 p-4 rounded-xl">
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-bold text-rose-700">14</span>
                  <CheckSquare className="w-5 h-5 text-rose-400" />
                </div>
                <p className="text-xs font-medium text-slate-700 mt-2 h-8">Assignments waiting for review</p>
                <a href="#" className="text-xs text-rose-600 font-semibold mt-4 inline-block hover:underline">View Reviews &rarr;</a>
              </div>
              
              <div className="bg-white/60 p-4 rounded-xl">
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-bold text-rose-700">8</span>
                  <UserMinus className="w-5 h-5 text-rose-400" />
                </div>
                <p className="text-xs font-medium text-slate-700 mt-2 h-8">Learners not assigned to a mentor</p>
                <a href="#" className="text-xs text-rose-600 font-semibold mt-4 inline-block hover:underline">Assign Mentors &rarr;</a>
              </div>
              
              <div className="bg-white/60 p-4 rounded-xl">
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-bold text-rose-700">3</span>
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                </div>
                <p className="text-xs font-medium text-slate-700 mt-2 h-8">Failed certificate generations</p>
                <a href="#" className="text-xs text-rose-600 font-semibold mt-4 inline-block hover:underline">Investigate &rarr;</a>
              </div>
            </div>
          </div>
          
          {/* Quick Actions Panel */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 shadow-sm row-span-2 flex flex-col">
            <div className="flex items-center gap-2 text-indigo-900 font-semibold mb-6">
              <span className="text-lg">⚡ Quick Actions</span>
            </div>
            
            <div className="space-y-3 flex-1">
              <button onClick={() => setActiveModal('addUser')} className="w-full flex items-center gap-4 p-4 bg-white border border-indigo-100 rounded-xl hover:shadow-md transition text-left group">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Add User</p>
                  <p className="text-[11px] text-slate-500">Invite new learners or staff</p>
                </div>
              </button>
              
              <button onClick={() => setActiveModal('createProgram')} className="w-full flex items-center gap-4 p-4 bg-white border border-indigo-100 rounded-xl hover:shadow-md transition text-left group">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <FilePlus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Create Program</p>
                  <p className="text-[11px] text-slate-500">Draft a new learning path</p>
                </div>
              </button>
              
              <button onClick={() => setActiveModal('createBatch')} className="w-full flex items-center gap-4 p-4 bg-white border border-indigo-100 rounded-xl hover:shadow-md transition text-left group">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Create Batch</p>
                  <p className="text-[11px] text-slate-500">Schedule a new cohort</p>
                </div>
              </button>
              
              <button onClick={() => setActiveModal('assignMentor')} className="w-full flex items-center gap-4 p-4 bg-white border border-indigo-100 rounded-xl hover:shadow-md transition text-left group">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Assign Mentor</p>
                  <p className="text-[11px] text-slate-500">Link learners to guides</p>
                </div>
              </button>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white">&uarr; 2.1%</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mb-1">Total Learners</p>
              <h3 className="text-2xl font-bold text-slate-900">{totalLearners.toLocaleString()}</h3>
            </div>
            
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white">&uarr; 8.4%</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mb-1">Active Learners</p>
              <h3 className="text-2xl font-bold text-slate-900">{activeLearners.toLocaleString()}</h3>
            </div>
            
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">Total</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mb-1">Active Programs</p>
              <h3 className="text-2xl font-bold text-slate-900">{activePrograms}</h3>
            </div>
            
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">Total</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mb-1">Active Mentors</p>
              <h3 className="text-2xl font-bold text-slate-900">{activeMentors}</h3>
            </div>
          </div>
          
        </div>
      </main>

      {/* Quick Action Modals */}
      <Modal isOpen={activeModal === 'addUser'} onClose={closeModal} title="Add New User">
        <form className="space-y-4" onSubmit={handleAddUser}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Full Name</label>
            <input required value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Jane Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <input required value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} type="email" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="jane@example.com" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Role</label>
            <select required value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="Student">Student</option>
              <option value="Faculty">Faculty / Mentor</option>
              <option value="Admin">Administrator</option>
            </select>
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={closeModal} className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">Create User</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'createProgram'} onClose={closeModal} title="Draft New Program">
        <form className="space-y-4" onSubmit={handleAddProgram}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Program Title</label>
            <input required value={programForm.title} onChange={e => setProgramForm({...programForm, title: e.target.value})} type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Advanced Frontend Engineering" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Duration</label>
            <input required value={programForm.duration} onChange={e => setProgramForm({...programForm, duration: e.target.value})} type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. 6 Months" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Description</label>
            <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-24" placeholder="Brief overview of the program..."></textarea>
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={closeModal} className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">Create Program</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'createBatch'} onClose={closeModal} title="Schedule New Batch">
        <form className="space-y-4" onSubmit={handleAddBatch}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Select Program</label>
            <select required value={batchForm.program} onChange={e => setBatchForm({...batchForm, program: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              {data.programs?.map((p: any) => (
                <option key={p.id} value={p.title}>{p.title}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Start Date</label>
              <input required value={batchForm.startDate} onChange={e => setBatchForm({...batchForm, startDate: e.target.value})} type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">End Date</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Capacity</label>
            <input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. 50" />
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={closeModal} className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">Schedule Batch</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'assignMentor'} onClose={closeModal} title="Assign Mentor">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Select Batch</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              {data.batches?.map((b: any) => (
                <option key={b.id}>{b.id} - {b.program}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Select Mentor</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              {data.users?.filter((u: any) => u.role === 'Faculty' || u.role === 'Mentor').map((m: any) => (
                <option key={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={closeModal} className="flex-1 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">Assign Mentor</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

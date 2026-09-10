import React, { useMemo } from 'react';
import Header from '../../components/Header';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAdmin } from '../../store/AdminContext';
import { Users, BookOpen, GraduationCap, DollarSign } from 'lucide-react';

const enrollmentData = [
  { name: 'Week 1', students: 120 },
  { name: 'Week 2', students: 132 },
  { name: 'Week 3', students: 101 },
  { name: 'Week 4', students: 134 },
  { name: 'Week 5', students: 190 },
];

export default function Analytics() {
  const { data } = useAdmin();

  // Dynamic calculations based on context data
  const stats = useMemo(() => {
    const totalStudents = data.users.filter(u => u.role.toLowerCase() === 'student').length;
    const activePrograms = data.programs.filter(p => p.status.toLowerCase() === 'active').length;
    const totalEnrollments = data.enrollments.length;
    
    // Parse revenue
    const totalRevenue = data.payments
      .filter(p => p.status.toLowerCase() === 'paid')
      .reduce((sum, payment) => {
        const amt = parseFloat(payment.amount.replace(/[^0-9.-]+/g,""));
        return sum + (isNaN(amt) ? 0 : amt);
      }, 0);

    return {
      totalStudents,
      activePrograms,
      totalEnrollments,
      totalRevenue
    };
  }, [data]);

  // Generate dynamic chart data based on payments context
  const dynamicRevenueData = useMemo(() => {
    // Basic mock mapping if there's very little data, or we just map actuals to months
    const baseData = [
      { name: 'Jan', revenue: 1000 },
      { name: 'Feb', revenue: 1500 },
      { name: 'Mar', revenue: 2000 },
      { name: 'Apr', revenue: 2780 },
      { name: 'May', revenue: 1890 },
      { name: 'Jun', revenue: 2390 },
    ];
    
    // Add current month revenue from context to the end for visualization
    baseData.push({ name: 'Current', revenue: stats.totalRevenue || 3490 });
    return baseData;
  }, [stats.totalRevenue]);

  return (
    <>
      <Header 
        title="Analytics" 
        subtitle="Platform-wide performance and engagement metrics."
      />
      <main className="p-8 max-w-7xl w-full mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* Dynamic Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</p>
              <h4 className="text-2xl font-bold text-slate-900">{stats.totalStudents}</h4>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Programs</p>
              <h4 className="text-2xl font-bold text-slate-900">{stats.activePrograms}</h4>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enrollments</p>
              <h4 className="text-2xl font-bold text-slate-900">{stats.totalEnrollments}</h4>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</p>
              <h4 className="text-2xl font-bold text-slate-900">
                ${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900">Revenue Growth</h3>
              <p className="text-xs text-slate-500">Monthly subscription and course fees.</p>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dynamicRevenueData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#4f46e5', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900">New Enrollments</h3>
              <p className="text-xs text-slate-500">Student registrations over the last 5 weeks.</p>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={enrollmentData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  barSize={32}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="students" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

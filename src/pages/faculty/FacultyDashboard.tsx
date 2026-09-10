import React from 'react';
import Header from '../../components/Header';
import { Users, CheckSquare, MessageSquare, BookOpen } from 'lucide-react';

export default function FacultyDashboard() {
  return (
    <>
      <Header title="Mentor Dashboard" subtitle="Manage your batches and review student progress." />
      
      <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
        
        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-amber-500" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Students</p>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">128</h3>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <CheckSquare className="w-5 h-5 text-emerald-500" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Reviews</p>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">24</h3>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Unread Messages</p>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">5</h3>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Batches</p>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">3</h3>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assignments to review */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Requires Grading</h2>
              <button className="text-xs font-medium text-amber-600 hover:text-amber-700">View All</button>
            </div>
            <div className="border border-slate-200 rounded-xl bg-white divide-y divide-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">Sarah Miller</p>
                  <p className="text-xs text-slate-500">SQL Indexing & Query Plan Optimization</p>
                </div>
                <button className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition">Review</button>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">David Vance</p>
                  <p className="text-xs text-slate-500">React State Management</p>
                </div>
                <button className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition">Review</button>
              </div>
            </div>
          </section>

          {/* Upcoming Schedule */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Today's Schedule</h2>
            </div>
            <div className="border border-slate-200 rounded-xl bg-white divide-y divide-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 flex gap-4 hover:bg-slate-50 transition">
                <div className="w-16 flex-shrink-0 text-center">
                  <p className="text-xs font-bold text-slate-900">4:00 PM</p>
                  <p className="text-[10px] text-slate-500">60 min</p>
                </div>
                <div className="w-1 bg-amber-200 rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Live Q&A: Backend Architecture</p>
                  <p className="text-xs text-slate-500 mt-1">Batch 04 · 42 students expected</p>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-xs font-medium transition">Join Room</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </main>
    </>
  );
}

import React from 'react';
import Header from '../../components/Header';
import { PlayCircle } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <>
      <Header title="Student Dashboard" />
      
      <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* Hero "Continue Learning" Banner */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-lumora-500/20 text-lumora-300 text-xs font-semibold uppercase tracking-wider">Current Lesson</span>
              <span className="text-xs text-slate-400">· Module 03: Backend Architecture</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Middleware Architecture & Auth Security</h2>
            <p className="text-sm text-slate-300">Learn how token verification works with distributed sessions and Redis caching.</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="px-5 py-2.5 bg-lumora-600 hover:bg-lumora-500 text-white rounded-lg font-medium text-sm transition shadow-sm inline-flex items-center gap-2">
              <PlayCircle className="w-4 h-4 fill-current text-lumora-600 bg-white rounded-full" />
              Resume Lesson
            </button>
          </div>
        </section>

        {/* Stat Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Completion</p>
            <div className="mt-2 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">68%</h3>
              <span className="text-xs text-emerald-600 font-semibold">+4% this week</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
              <div className="bg-lumora-600 h-1.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignments Passed</p>
            <div className="mt-2 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">14 / 18</h3>
              <span className="text-xs text-slate-500">2 pending review</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '77%' }}></div>
            </div>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Learning Streak</p>
            <div className="mt-2 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">12 Days</h3>
              <span className="text-xs text-amber-600 font-medium">🔥 Active</span>
            </div>
            <p className="text-xs text-slate-500 mt-3">Consistent daily activity</p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Live Q&A</p>
            <div className="mt-2">
              <h3 className="text-base font-bold text-slate-900 truncate">Tomorrow @ 4:00 PM</h3>
              <p className="text-xs text-slate-500 mt-1">With Mentor Alex Morgan</p>
            </div>
          </div>
        </section>

        {/* Two-Column Workspace: Assignments & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Actionable Tasks */}
          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Immediate Tasks & Assignments</h2>
              <button className="text-xs font-medium text-lumora-600 hover:text-lumora-700">View All</button>
            </div>
            <div className="border border-slate-200 rounded-xl bg-white divide-y divide-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50/75 transition gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Due Today</span>
                  <p className="text-sm font-semibold text-slate-800">SQL Indexing & Query Plan Optimization</p>
                  <p className="text-xs text-slate-500">Module 03 · Practical assessment</p>
                </div>
                <button className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition whitespace-nowrap self-start sm:self-auto">Submit Task</button>
              </div>
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50/75 transition gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">Upcoming</span>
                  <p className="text-sm font-semibold text-slate-800">Redis Cache-Aside Pattern Implementation</p>
                  <p className="text-xs text-slate-500">Module 03 · Lab Exercise</p>
                </div>
                <button className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium transition whitespace-nowrap self-start sm:self-auto">Start Lab</button>
              </div>
            </div>
          </section>

          {/* Right 1 Col: Mentor Feedback Highlights */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Recent Mentor Feedback</h2>
            <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-lumora-100 text-lumora-700 font-bold text-xs flex items-center justify-center">AM</div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Alex Morgan</p>
                  <p className="text-[11px] text-slate-400">Database Mentor · 2h ago</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-700 leading-relaxed">
                "Great work on query execution plans. For part 2, consider composite B-tree indices for high-cardinality lookups."
              </div>
              <button className="inline-block text-xs font-semibold text-lumora-600 hover:text-lumora-700">Read Full Review &rarr;</button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

import React from 'react';
import Header from '../../components/Header';
import { PlayCircle, Clock, BookOpen, CheckCircle } from 'lucide-react';

export default function MyLearning() {
  return (
    <>
      <Header title="My Learning" subtitle="Continue your enrolled programs and courses." />
      <main className="p-8 max-w-7xl w-full mx-auto space-y-8">
        <h2 className="text-lg font-bold text-slate-900">In Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row hover:shadow-md transition">
            <div className="h-48 sm:h-auto sm:w-48 bg-slate-900 flex-shrink-0 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-lumora-900/80 to-transparent"></div>
              <BookOpen className="w-12 h-12 text-white/50 relative z-10" />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-lumora-50 text-lumora-700 rounded text-[10px] font-bold uppercase tracking-wider">Module 03</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 2h 15m left</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">Backend Architecture & Security</h3>
                <p className="text-xs text-slate-500 line-clamp-2">Master distributed systems, token verification, and Redis caching patterns for scalable backends.</p>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700">68% Completed</span>
                  <span className="text-slate-500">14/20 Lessons</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
                  <div className="bg-lumora-600 h-1.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <button className="w-full py-2 bg-lumora-600 hover:bg-lumora-700 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                  <PlayCircle className="w-4 h-4" /> Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-200 mt-8">Completed</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-500">Dec 2025</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Frontend Fundamentals</h3>
            <p className="text-xs text-slate-500 mb-4">React, Tailwind, and State Management basics.</p>
            <button className="text-xs font-semibold text-lumora-600 hover:text-lumora-700">View Certificate &rarr;</button>
          </div>
        </div>
      </main>
    </>
  );
}

import React from 'react';
import Header from './Header';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <>
      <Header title={title} subtitle={description} />
      <main className="p-8 max-w-7xl w-full mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
          <Construction className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">{title}</h2>
        <p className="text-sm text-slate-500 max-w-md leading-relaxed">
          {description} This module is currently under active development for the prototype. Please check back later or explore the completed dashboard features.
        </p>
      </main>
    </>
  );
}

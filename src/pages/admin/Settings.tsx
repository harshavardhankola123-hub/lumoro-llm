import React, { useState } from 'react';
import Header from '../../components/Header';
import { Save, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    orgName: 'LumoraSpace',
    supportEmail: 'support@lumoraspace.com',
    platformUrl: 'https://learn.lumoraspace.com',
    timezone: 'UTC (Coordinated Universal Time)',
    language: 'English (US)'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  const tabs = ['General', 'Security', 'Billing', 'API Keys'];

  return (
    <>
      <Header 
        title="Settings" 
        subtitle="Platform configuration and preferences."
        actions={
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 disabled:opacity-70"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        }
      />
      <main className="p-8 max-w-7xl w-full mx-auto space-y-6 animate-in fade-in duration-300 relative">
        
        {/* Toast Notification */}
        {showToast && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 z-50">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Settings saved successfully</span>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'font-semibold text-indigo-600 border-b-2 border-indigo-600' 
                    : 'font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8 max-w-2xl space-y-8">
            {activeTab === 'General' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Platform Details</h3>
                  <p className="text-xs text-slate-500 mb-4">Update your organization's core information.</p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Organization Name</label>
                        <input 
                          type="text" 
                          value={formData.orgName}
                          onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Support Email</label>
                        <input 
                          type="email" 
                          value={formData.supportEmail}
                          onChange={(e) => setFormData({...formData, supportEmail: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Platform URL</label>
                      <input 
                        type="text" 
                        value={formData.platformUrl}
                        onChange={(e) => setFormData({...formData, platformUrl: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100 my-8" />

                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Preferences</h3>
                  <p className="text-xs text-slate-500 mb-4">Manage regional and communication settings.</p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Timezone</label>
                        <select 
                          value={formData.timezone}
                          onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        >
                          <option>UTC (Coordinated Universal Time)</option>
                          <option>EST (Eastern Standard Time)</option>
                          <option>PST (Pacific Standard Time)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Language</label>
                        <select 
                          value={formData.language}
                          onChange={(e) => setFormData({...formData, language: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        >
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'General' && (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl opacity-50">🚧</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{activeTab} Settings</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">This section is currently under construction and will be available in the next platform update.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

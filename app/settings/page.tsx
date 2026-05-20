import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-slate-500">Configure your workspace and preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          <SettingsSection 
            icon={User} 
            title="Profile" 
            description="Manage your personal information and public profile."
          />
          <SettingsSection 
            icon={Bell} 
            title="Notifications" 
            description="Choose what notifications you want to receive."
          />
          <SettingsSection 
            icon={Shield} 
            title="Security" 
            description="Manage your password and account security."
          />
          <SettingsSection 
            icon={Database} 
            title="Data & Export" 
            description="Export your leads and interactions data."
          />
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-400 mb-4 font-bold tracking-widest text-xs uppercase">
            <Globe size={16} />
            Open Source
          </div>
          <h2 className="text-2xl font-bold mb-2">Open Lead CRM v0.1.0</h2>
          <p className="text-slate-400 max-w-lg mb-6">
            This project is under active development. Help us build the best open-source CRM for agencies.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition-all">
              Star on GitHub
            </button>
            <button className="px-6 py-2 bg-slate-800 rounded-lg font-bold hover:bg-slate-700 transition-all">
              Roadmap
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

function SettingsSection({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <button className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Configure</button>
    </div>
  );
}

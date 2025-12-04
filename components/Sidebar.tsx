import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Kanban, Users, CreditCard, Settings, Hexagon } from 'lucide-react';

interface SidebarProps {
  activeView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onChangeView }) => {
  
  const navItems: { id: ViewState; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Pipeline', icon: Kanban },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-full fixed left-0 top-0 glass-panel flex flex-col z-20 border-r border-white/50">
      <div className="p-8 pb-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Hexagon className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-lg text-slate-800 tracking-tight">Northeastern 14</span>
      </div>

      <div className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-white/60 text-indigo-600 shadow-sm' 
                  : 'hover:bg-white/40 text-slate-500 hover:text-slate-800 hover:translate-x-1'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-400'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-6">
        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <img src="https://picsum.photos/40/40" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Alex Chen</p>
              <p className="text-xs text-slate-500">Pro Plan</p>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[75%]" />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-right">375/500 Leads Used</p>
        </div>
      </div>
    </aside>
  );
};
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ViewState, Lead, PipelineStage, Metric } from './types';
import { MOCK_LEADS, PIPELINE_COLUMNS } from './constants';
import { Confetti } from './components/Confetti';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Plus, Search, Filter, MoreHorizontal, ArrowUpRight, CheckCircle2, DollarSign, Activity, Users, Settings, FileText, Check, CreditCard, Bell, Globe, AppWindow, AtSign, Shield, Lock } from 'lucide-react';

// -- Sub-Components --

const StatCard: React.FC<{ metric: Metric; icon: React.ElementType }> = ({ metric, icon: Icon }) => (
  <div className="glass-card rounded-3xl p-6 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon className="w-24 h-24 text-indigo-500" />
    </div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
          <Icon className="w-6 h-6" />
        </div>
        {metric.positive && (
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-full">
            <ArrowUpRight className="w-3 h-3" />
            {metric.trend}%
          </div>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{metric.label}</h3>
      <p className="text-3xl font-semibold text-slate-800 tracking-tight">{metric.value}</p>
    </div>
  </div>
);

const PipelineCard: React.FC<{ lead: Lead; onDragStart: (e: React.DragEvent, leadId: string) => void }> = ({ lead, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, lead.id)}
    className="glass-card p-4 rounded-xl mb-3 cursor-grab active:cursor-grabbing hover:shadow-lg group animate-pop-in"
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex gap-2">
        {lead.tags.map(tag => (
          <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100/50">
            {tag}
          </span>
        ))}
      </div>
      <button className="text-slate-400 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
    <h4 className="font-semibold text-slate-800 text-sm mb-0.5">{lead.company}</h4>
    <p className="text-slate-500 text-xs mb-3">{lead.name}</p>
    <div className="flex items-center justify-between border-t border-slate-100/50 pt-3">
      <div className="flex items-center gap-2">
        <img src={lead.avatarUrl} alt={lead.name} className="w-6 h-6 rounded-full border border-white" />
        <span className="text-xs text-slate-400">{lead.lastActivity}</span>
      </div>
      <span className="font-medium text-sm text-slate-700">${lead.value.toLocaleString()}</span>
    </div>
  </div>
);

// -- Views --

const DashboardView: React.FC = () => {
  const metrics: Metric[] = [
    { label: 'Pipeline Value', value: '$142,500', trend: 12.5, positive: true },
    { label: 'Active Leads', value: '34', trend: 5.2, positive: true },
    { label: 'Win Rate', value: '68%', trend: 2.1, positive: true },
    { label: 'Avg Deal Size', value: '$12,400', trend: 8.4, positive: true },
  ];

  const data = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ];

  const pieData = [
    { name: 'Won', value: 400, color: '#10B981' },
    { name: 'Lost', value: 100, color: '#EF4444' },
    { name: 'Open', value: 300, color: '#6366F1' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-500">Welcome back, Alex. Your pipeline looks healthy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard metric={metrics[0]} icon={DollarSign} />
        <StatCard metric={metrics[1]} icon={Users} />
        <StatCard metric={metrics[2]} icon={Activity} />
        <StatCard metric={metrics[3]} icon={CheckCircle2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6">
          <h3 className="text-lg font-medium text-slate-700 mb-6">Revenue Trend</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center relative">
           <h3 className="absolute top-6 left-6 text-lg font-medium text-slate-700">Deal Status</h3>
           <div className="h-[240px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
           </div>
           <div className="text-center">
             <span className="text-3xl font-bold text-slate-800">800</span>
             <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Total Deals</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const PipelineView: React.FC<{ 
  leads: Lead[]; 
  onMoveLead: (leadId: string, toStage: PipelineStage) => void 
}> = ({ leads, onMoveLead }) => {
  
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (leadId) {
      onMoveLead(leadId, stage);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-light text-slate-800">Pipeline</h1>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all active:scale-95">
          <Plus className="w-4 h-4" />
          <span>Add Deal</span>
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full px-1">
          {PIPELINE_COLUMNS.map((stage) => {
            const stageLeads = leads.filter(l => l.stage === stage);
            const totalValue = stageLeads.reduce((acc, l) => acc + l.value, 0);

            return (
              <div 
                key={stage} 
                className="w-80 flex flex-col"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
              >
                <div className="flex justify-between items-end mb-4 px-2">
                  <span className="font-semibold text-slate-600">{stage}</span>
                  <span className="text-xs text-slate-400 font-medium">${totalValue.toLocaleString()}</span>
                </div>
                <div className="flex-1 rounded-2xl bg-white/10 border border-white/40 p-3 transition-colors hover:bg-white/20">
                  {stageLeads.length === 0 ? (
                    <div className="h-32 flex items-center justify-center text-slate-400 text-sm italic border-2 border-dashed border-slate-200 rounded-xl m-2">
                      Drop leads here
                    </div>
                  ) : (
                    stageLeads.map(lead => (
                      <PipelineCard key={lead.id} lead={lead} onDragStart={handleDragStart} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const BillingView: React.FC = () => {
  const tabs = ['Account', 'Members', 'Billing', 'Plans', 'Settings', 'Notifications', 'API'];
  const invoices = [
    { id: '#012', label: 'Invoice #012 - Dec 2023', date: 'Dec 1, 2023', status: 'Paid', amount: '$0.00' },
    { id: '#011', label: 'Invoice #011 - Nov 2023', date: 'Nov 1, 2023', status: 'Paid', amount: '$0.00' },
    { id: '#010', label: 'Invoice #010 - Oct 2023', date: 'Oct 1, 2023', status: 'Paid', amount: '$0.00' },
    { id: '#009', label: 'Invoice #009 - Sep 2023', date: 'Sep 1, 2023', status: 'Paid', amount: '$0.00' },
    { id: '#008', label: 'Invoice #008 - Aug 2023', date: 'Aug 1, 2023', status: 'Paid', amount: '$0.00' },
  ];

  return (
    <div className="space-y-8 animate-pop-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-slate-800 mb-2">Billing</h1>
        <p className="text-slate-500">Manage your billing and payment details.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200/50 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              tab === 'Billing'
                ? 'bg-slate-800 text-white shadow-lg shadow-slate-500/20'
                : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan Card */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
                <div>
                <h3 className="text-xl font-semibold text-slate-800">Free Plan</h3>
                <p className="text-slate-500 text-sm mt-1">Free for individual use up to 1000 records.</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-semibold text-slate-800">$0</span>
                    <span className="text-sm text-slate-400 font-normal ml-1">/ month</span>
                </div>
            </div>
            
            <div className="mb-8 max-w-lg">
                <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-700">120 / 1000 records</span>
                </div>
                <div className="w-full bg-slate-200/50 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-[12%] h-full rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20">
              Upgrade
            </button>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Payment Method</h3>
                <p className="text-slate-500 text-sm mb-6">Change how you pay for your plan.</p>
                
                <div className="bg-white/40 border border-white/60 p-4 rounded-xl flex items-center gap-4 hover:bg-white/60 transition-colors cursor-pointer group">
                    <div className="w-12 h-8 bg-white rounded border border-slate-200 flex items-center justify-center shadow-sm">
                        <CreditCard className="w-6 h-6 text-slate-700" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">**** **** **** 4242</p>
                        <p className="text-xs text-slate-400">Expires 02/2026</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
             <p className="text-xs text-slate-400 mb-2">Next billing date: Jan 1, 2024</p>
             <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 hover:underline">
                Edit payment method
             </button>
            </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="space-y-4">
        <div>
            <h3 className="text-lg font-semibold text-slate-800">Invoices</h3>
            <p className="text-slate-500 text-sm">Access all your previous invoices.</p>
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden border border-white/60">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-4 font-medium w-1/3">Invoice</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-white/40 transition-colors cursor-pointer group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-rose-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">{inv.label}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                                    <Check className="w-3 h-3" />
                                    {inv.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right text-slate-600 font-medium">{inv.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

const SettingsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Account');

    const generalSettings = [
        { id: 'Apps', icon: AppWindow },
        { id: 'Account', icon: AtSign },
        { id: 'Notification', icon: Bell },
        { id: 'Language & Region', icon: Globe },
    ];

    const workspaceSettings = [
        { id: 'General', icon: Settings },
        { id: 'Members', icon: Users },
        { id: 'Billing', icon: CreditCard },
    ];
  
    return (
      <div className="flex flex-col h-full animate-pop-in">
        <div className="mb-6">
          <h1 className="text-3xl font-light text-slate-800">Account Settings</h1>
        </div>
  
        <div className="flex flex-col lg:flex-row flex-1 gap-8 overflow-hidden">
          {/* Settings Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
              <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">General Settings</h3>
                  <div className="space-y-1">
                      {generalSettings.map(item => (
                          <button 
                              key={item.id}
                              onClick={() => setActiveTab(item.id)}
                              className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  activeTab === item.id 
                                  ? 'bg-white/60 text-indigo-600 shadow-sm' 
                                  : 'text-slate-600 hover:bg-white/40 hover:text-slate-900'
                              }`}
                          >
                              <item.icon className="w-4 h-4 opacity-70" />
                              {item.id}
                          </button>
                      ))}
                  </div>
              </div>
  
               <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Workspace Settings</h3>
                  <div className="space-y-1">
                      {workspaceSettings.map(item => (
                          <button 
                              key={item.id}
                              onClick={() => setActiveTab(item.id)}
                              className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  activeTab === item.id 
                                  ? 'bg-white/60 text-indigo-600 shadow-sm' 
                                  : 'text-slate-600 hover:bg-white/40 hover:text-slate-900'
                              }`}
                          >
                              <item.icon className="w-4 h-4 opacity-70" />
                              {item.id}
                          </button>
                      ))}
                  </div>
              </div>
          </div>
  
          {/* Settings Content */}
          <div className="flex-1 glass-panel rounded-3xl p-8 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
              {/* Profile Section */}
              <div className="mb-10">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">My Profile</h2>
                  
                  <div className="flex items-center gap-6 mb-8">
                      <img src="https://picsum.photos/100/100" alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
                      <div>
                          <div className="flex gap-3 mb-2">
                              <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                                  + Change Image
                              </button>
                              <button className="px-4 py-2 bg-white text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors">
                                  Remove Image
                              </button>
                          </div>
                          <p className="text-xs text-slate-400">We support PNGs, JPEGs and GIFs under 2MB</p>
                      </div>
                  </div>
  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                          <input type="text" defaultValue="Alex" className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 transition-shadow" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                          <input type="text" defaultValue="Chen" className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 transition-shadow" />
                      </div>
                  </div>
              </div>
  
              <hr className="border-slate-200/60 my-8" />
  
              {/* Account Security */}
              <div className="mb-10">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Account Security</h2>
                  
                  <div className="space-y-6">
                      <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                           <div className="flex gap-4">
                              <input type="email" defaultValue="alex.chen@northeastern.io" disabled className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 cursor-not-allowed" />
                              <button className="px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap">
                                  Change email
                              </button>
                           </div>
                      </div>
  
                      <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                           <div className="flex gap-4">
                              <input type="password" defaultValue="password123" className="flex-1 px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 text-slate-700" />
                              <button className="px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap">
                                  Change password
                              </button>
                           </div>
                      </div>
  
                      <div className="flex items-center justify-between py-2">
                          <div>
                              <p className="text-sm font-medium text-slate-800">2-Step Verifications</p>
                              <p className="text-xs text-slate-400 mt-1">Add an additional layer of security to your account during login.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900 transition-colors"></div>
                          </label>
                      </div>
                  </div>
              </div>
  
              <hr className="border-slate-200/60 my-8" />
  
              {/* Support Access */}
              <div>
                   <h2 className="text-xl font-semibold text-slate-800 mb-6">Support Access</h2>
                   
                   <div className="space-y-8">
                      <div className="flex items-center justify-between">
                          <div>
                              <p className="text-sm font-medium text-slate-800">Support access</p>
                              <p className="text-xs text-slate-400 mt-1">You have granted us to access to your account for support purposes until Aug 31, 2023, 9:40 PM.</p>
                          </div>
                           <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900 transition-colors"></div>
                          </label>
                      </div>
  
                      <div className="flex items-center justify-between">
                          <div>
                              <p className="text-sm font-medium text-slate-800">Log out of all devices</p>
                              <p className="text-xs text-slate-400 mt-1">Log out of all other active sessions on other devices besides this one.</p>
                          </div>
                          <button className="px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                              Log out
                          </button>
                      </div>
  
                       <div className="flex items-center justify-between">
                          <div>
                              <p className="text-sm font-medium text-rose-500">Delete my account</p>
                              <p className="text-xs text-slate-400 mt-1">Permanently delete the account and remove access from all workspaces.</p>
                          </div>
                          <button className="px-4 py-2 bg-rose-50 text-rose-600 text-sm font-medium rounded-lg border border-rose-100 hover:bg-rose-100 transition-colors">
                              Delete Account
                          </button>
                      </div>
                   </div>
              </div>
          </div>
        </div>
      </div>
    );
  };

// -- Main App Component --

export default function App() {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const moveLead = (leadId: string, toStage: PipelineStage) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        if (toStage === PipelineStage.CLOSED_WON && l.stage !== PipelineStage.CLOSED_WON) {
          setConfettiTrigger(c => c + 1); // Trigger celebration
        }
        return { ...l, stage: toStage };
      }
      return l;
    }));
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'pipeline':
        return <PipelineView leads={leads} onMoveLead={moveLead} />;
      case 'leads':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-light text-slate-800">Leads</h1>
            <div className="glass-panel rounded-3xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/30 text-slate-500 text-xs uppercase tracking-wider font-medium">
                  <tr>
                    <th className="p-6">Name</th>
                    <th className="p-6">Company</th>
                    <th className="p-6">Value</th>
                    <th className="p-6">Stage</th>
                    <th className="p-6">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-white/40 transition-colors group cursor-pointer">
                      <td className="p-6 font-medium text-slate-700 flex items-center gap-3">
                         <img src={lead.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
                         {lead.name}
                      </td>
                      <td className="p-6 text-slate-600">{lead.company}</td>
                      <td className="p-6 text-slate-600">${lead.value.toLocaleString()}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          lead.stage === PipelineStage.CLOSED_WON ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          lead.stage === PipelineStage.NEW ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-slate-50 text-slate-600 border-slate-100'
                        }`}>
                          {lead.stage}
                        </span>
                      </td>
                      <td className="p-6 text-slate-400 text-sm">{lead.lastActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'billing':
        return <BillingView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-pop-in">
             <div className="w-20 h-20 rounded-3xl glass-card flex items-center justify-center text-indigo-300">
                <Settings className="w-10 h-10" />
             </div>
             <h2 className="text-xl font-medium text-slate-600">Coming Soon</h2>
             <p className="text-slate-400 max-w-sm">This module is currently under development. Check back later for updates.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/50 overflow-hidden">
      <Sidebar activeView={activeView} onChangeView={setActiveView} />
      
      {/* Right Side Wrapper */}
      <div className="flex-1 ml-64 flex flex-col h-full relative">
        
        {/* Header - Fixed/Pinned */}
        <header className="flex-shrink-0 h-20 px-8 lg:px-12 flex items-center justify-between z-20">
             {/* Search */}
             <div className="w-96 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search leads, companies..." 
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/80 transition-all text-sm placeholder:text-slate-400 backdrop-blur-sm shadow-sm"
                  />
             </div>

             {/* Actions */}
             <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-xl bg-white/50 border border-white/60 flex items-center justify-center hover:bg-white text-slate-500 transition-colors shadow-sm">
                     <Filter className="w-4 h-4" />
                  </button>
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 cursor-pointer hover:bg-indigo-700 transition-colors">
                     <span className="font-semibold text-sm">AC</span>
                  </div>
             </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 pt-0 lg:pt-0">
             <div className="relative z-0 min-h-full pt-4">
                {renderContent()}
             </div>
        </main>
      </div>

      <Confetti trigger={confettiTrigger} />
    </div>
  );
}

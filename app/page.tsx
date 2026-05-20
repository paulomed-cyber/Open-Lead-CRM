import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { prisma } from '@/lib/db';
import StatCard from '@/components/dashboard/StatCard';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function DashboardPage() {
  const totalLeads = await prisma.lead.count();
  const activeDeals = await prisma.lead.count({
    where: { status: { in: ['Em Conversa', 'Proposta Enviada', 'Negociação'] } }
  });
  const closedDeals = await prisma.lead.count({
    where: { status: 'Fechado' }
  });
  
  const estimatedRevenue = await prisma.lead.aggregate({
    _sum: { estimatedValue: true },
    where: { status: 'Negociação' }
  });

  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  const pendingTasks = await prisma.task.count({
    where: { completed: false }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-500">Welcome to Open Lead CRM. Here is your business overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Leads" 
          value={totalLeads} 
          icon={Users} 
          color="bg-blue-600"
        />
        <StatCard 
          title="Active Deals" 
          value={activeDeals} 
          icon={TrendingUp} 
          color="bg-indigo-600"
        />
        <StatCard 
          title="Pending Tasks" 
          value={pendingTasks} 
          icon={Clock} 
          color="bg-amber-600"
        />
        <StatCard 
          title="Pipeline Value" 
          value={formatCurrency(estimatedRevenue._sum.estimatedValue || 0)} 
          icon={CheckCircle2} 
          color="bg-emerald-600"
          description="Total in Negotiation"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Leads</h2>
            <Link href="/leads" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Company</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/leads/${lead.id}`} className="font-medium text-blue-600 hover:underline">
                        {lead.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{lead.company || '-'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Info/Alerts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-blue-600" />
              Project Status
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Early Development</p>
                <p className="text-xs text-blue-600 mt-1">
                  Open Lead CRM is currently in MVP stage. Some features are under construction.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">MVP Progress</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-[65%]"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-2">Need help?</h2>
            <p className="text-slate-400 text-sm mb-4">
              Check our documentation or contribute on GitHub to help us grow.
            </p>
            <button className="w-full py-2 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors">
              Read Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

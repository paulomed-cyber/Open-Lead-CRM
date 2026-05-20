import React from 'react';
import { prisma } from '@/lib/db';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  Tag,
  MessageSquare,
  History,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      tasks: { orderBy: { dueDate: 'asc' } },
      interactions: { orderBy: { createdAt: 'desc' } }
    }
  });

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/leads" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{lead.name}</h1>
          <p className="text-slate-500">{lead.company || 'Individual'}</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Edit size={18} />
            Edit
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-red-100 rounded-lg text-red-600 hover:bg-red-50">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Lead Info & Marketing */}
        <div className="space-y-6">
          {/* Main Info */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-bold border-b border-slate-100 pb-2">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-slate-400" />
                <span className="text-slate-600">{lead.email || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-slate-400" />
                <span className="text-slate-600">{lead.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 size={16} className="text-slate-400" />
                <span className="text-slate-600">{lead.company || 'N/A'}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Status</span>
                <span className="font-medium text-blue-600">{lead.status}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Source</span>
                <span className="font-medium">{lead.source}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Value</span>
                <span className="font-medium">{formatCurrency(lead.estimatedValue || 0)}</span>
              </div>
            </div>
          </div>

          {/* Marketing Attribution */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-bold border-b border-slate-100 pb-2 flex items-center gap-2">
              <Tag size={18} className="text-blue-600" />
              Marketing Attribution
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">UTM Source</span>
                <span className="font-medium">{lead.utmSource || '-'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">UTM Medium</span>
                <span className="font-medium">{lead.utmMedium || '-'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">UTM Campaign</span>
                <span className="font-medium">{lead.utmCampaign || '-'}</span>
              </div>
              {lead.gclid && (
                <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-100 text-[10px] break-all">
                  <span className="text-slate-400 block mb-1 uppercase">GCLID (Google Click ID)</span>
                  <span className="font-mono">{lead.gclid}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Column: Interactions & Tasks */}
        <div className="lg:col-span-2 space-y-8">
          {/* Notes/Interactions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-600" />
                Interactions & Notes
              </h2>
              <button className="text-sm text-blue-600 font-medium hover:underline">Add Interaction</button>
            </div>
            <div className="p-6 space-y-6">
              {lead.interactions.length > 0 ? (
                <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {lead.interactions.map((interaction) => (
                    <div key={interaction.id} className="relative flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm shrink-0 z-10">
                        <History size={16} className="text-slate-400" />
                      </div>
                      <div className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{interaction.type}</span>
                          <span className="text-xs text-slate-400">{formatDate(interaction.createdAt)}</span>
                        </div>
                        <p className="text-sm text-slate-700">{interaction.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500">No interactions recorded yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold flex items-center gap-2">
                <CheckCircle2 size={18} className="text-blue-600" />
                Tasks & Follow-ups
              </h2>
              <button className="text-sm text-blue-600 font-medium hover:underline">New Task</button>
            </div>
            <div className="divide-y divide-slate-100">
              {lead.tasks.length > 0 ? (
                lead.tasks.map((task) => (
                  <div key={task.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div className={cn(
                      "w-5 h-5 rounded border flex items-center justify-center shrink-0",
                      task.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300"
                    )}>
                      {task.completed && <CheckCircle2 size={12} />}
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm font-medium", task.completed && "text-slate-400 line-through")}>{task.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 uppercase tracking-wide">
                          {task.type}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={12} />
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-slate-500">No tasks assigned.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

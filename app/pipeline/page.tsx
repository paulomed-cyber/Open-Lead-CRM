import React from 'react';
import { prisma } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import { MoreHorizontal, Plus, GripVertical } from 'lucide-react';
import Link from 'next/link';

const COLUMNS = [
  'Novo Lead',
  'Em Conversa',
  'Proposta Enviada',
  'Negociação',
  'Fechado',
  'Perdido'
];

export default async function PipelinePage() {
  const leads = await prisma.lead.findMany();

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sales Pipeline</h1>
          <p className="text-slate-500">Visualize your sales stages and progress.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Settings
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {COLUMNS.map((column) => {
            const columnLeads = leads.filter((l) => l.status === column);
            const totalValue = columnLeads.reduce((acc, l) => acc + (l.estimatedValue || 0), 0);

            return (
              <div key={column} className="w-80 flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-slate-700">{column}</h2>
                    <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                      {columnLeads.length}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <div className="bg-slate-100/50 p-2 rounded-xl flex-1 space-y-3 min-h-[500px]">
                  <div className="flex justify-between items-center px-1 mb-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Value</span>
                    <span className="text-xs font-bold text-slate-600">{formatCurrency(totalValue)}</span>
                  </div>

                  {columnLeads.map((lead) => (
                    <Link 
                      key={lead.id} 
                      href={`/leads/${lead.id}`}
                      className="block bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                          {lead.name}
                        </h3>
                        <GripVertical size={14} className="text-slate-300 group-hover:text-slate-400" />
                      </div>
                      <p className="text-xs text-slate-500 mb-3 truncate">{lead.company || 'Individual'}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs font-bold text-slate-700">
                          {formatCurrency(lead.estimatedValue || 0)}
                        </span>
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">
                            {lead.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                  <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all text-xs font-medium flex items-center justify-center gap-1">
                    <Plus size={14} />
                    Add Lead
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

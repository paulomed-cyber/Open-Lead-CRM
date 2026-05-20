import React from 'react';
import { prisma } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { 
  CheckCircle2, 
  Clock, 
  Calendar as CalendarIcon, 
  User,
  Plus,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    include: { lead: true },
    orderBy: { dueDate: 'asc' }
  });

  const overdue = tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date());
  const pending = tasks.filter(t => !t.completed && new Date(t.dueDate) >= new Date());
  const completed = tasks.filter(t => t.completed);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-slate-500">Keep track of your commercial activities.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={18} />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Filter size={18} />
              Filter Tasks
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</label>
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    Pending
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    Completed
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    Overdue
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Type</label>
                <select className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-slate-50">
                  <option>All Types</option>
                  <option>Call</option>
                  <option>WhatsApp</option>
                  <option>Meeting</option>
                  <option>Email</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="lg:col-span-3 space-y-8">
          {/* Overdue Section */}
          {overdue.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-red-600 font-bold flex items-center gap-2">
                <Clock size={18} />
                Overdue
              </h2>
              <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden divide-y divide-slate-100">
                {overdue.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Pending Section */}
          <div className="space-y-4">
            <h2 className="text-slate-900 font-bold flex items-center gap-2">
              <CalendarIcon size={18} />
              Upcoming
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {pending.length > 0 ? pending.map((task) => (
                <TaskItem key={task.id} task={task} />
              )) : (
                <div className="p-8 text-center text-slate-500">No upcoming tasks.</div>
              )}
            </div>
          </div>

          {/* Completed Section */}
          {completed.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-emerald-600 font-bold flex items-center gap-2">
                <CheckCircle2 size={18} />
                Completed
              </h2>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100 opacity-60">
                {completed.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskItem({ task }: { task: any }) {
  return (
    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group">
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-6 h-6 rounded-full border flex items-center justify-center mt-0.5",
          task.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300"
        )}>
          {task.completed && <CheckCircle2 size={14} />}
        </div>
        <div>
          <h3 className={cn("font-bold text-slate-900", task.completed && "text-slate-400 line-through")}>
            {task.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 uppercase font-bold tracking-wider">
              {task.type}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <CalendarIcon size={12} className="text-slate-400" />
              {formatDate(task.dueDate)}
            </span>
            <Link 
              href={`/leads/${task.leadId}`}
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
            >
              <User size={12} />
              {task.lead.name}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest">Edit</button>
        <button className="text-xs font-bold text-slate-400 hover:text-red-600 uppercase tracking-widest">Delete</button>
      </div>
    </div>
  );
}

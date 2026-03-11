'use client'

import { FadeIn } from '@/components/shared/animations'
import { Plus, Briefcase, Building, ExternalLink, Edit2, Trash2 } from 'lucide-react'

const OPPORTUNITIES_LIST = [
  { id: 1, title: 'Senior Software Engineer', org: 'TechTr', type: 'Job' },
  { id: 2, title: 'Research Fellowship', org: 'UN Mission', type: 'Scholarship' },
]

export default function AdminOpportunitiesPage() {
  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">Opportunities Board.</h1>
            <p className="text-muted font-medium">Post and manage jobs, internships, and research opportunities.</p>
         </div>
         <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            Post Opportunity
         </button>
      </header>

      <div className="bg-white border border-border rounded-[40px] overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-zinc-50 border-b border-border">
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted">Opportunity</th>
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted">Organization</th>
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted">Type</th>
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted flex justify-end">Actions</th>
               </tr>
            </thead>
            <tbody>
               {OPPORTUNITIES_LIST.map((opt) => (
                  <tr key={opt.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors group">
                     <td className="px-10 py-8">
                        <p className="font-bold text-lg">{opt.title}</p>
                     </td>
                     <td className="px-10 py-8 text-muted font-medium">{opt.org}</td>
                     <td className="px-10 py-8">
                        <span className="px-3 py-1 bg-zinc-100 text-[10px] font-bold uppercase tracking-wider rounded-lg">{opt.type}</span>
                     </td>
                     <td className="px-10 py-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-3 bg-zinc-50 border border-border rounded-xl">
                              <Edit2 className="w-4 h-4 text-zinc-600" />
                           </button>
                           <button className="p-3 bg-red-50 border border-red-100 rounded-xl">
                              <Trash2 className="w-4 h-4 text-red-600" />
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  )
}

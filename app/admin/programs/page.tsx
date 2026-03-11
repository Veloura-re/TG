'use client'

import { FadeIn, AnimatedSection } from '@/components/shared/animations'
import { Plus, GraduationCap, Award, MoreVertical, Edit2, Trash2 } from 'lucide-react'

const PROGRAMS_LIST = [
  { id: 1, name: 'Excellence Scholarships', students: 120, deadline: 'Sep 30, 2026' },
  { id: 2, name: 'Leadership Training', students: 45, deadline: 'Oct 15, 2026' },
]

export default function AdminProgramsPage() {
  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">Programs Management.</h1>
            <p className="text-muted font-medium">Manage scholarships, exchange programs, and training initiatives.</p>
         </div>
         <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            Add Program
         </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {PROGRAMS_LIST.map((prog) => (
            <FadeIn key={prog.id}>
               <div className="bg-white border border-border p-6 md:p-10 rounded-[48px] hover:shadow-xl transition-all group">
                  <div className="flex items-start justify-between mb-8">
                     <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center border border-border group-hover:bg-black group-hover:text-white transition-colors">
                        <GraduationCap className="w-8 h-8" />
                     </div>
                     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-border transition-all">
                           <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-3 bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 transition-all">
                           <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                     </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 tracking-tight">{prog.name}</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted">
                        <span>Participants</span>
                        <span className="text-black">{prog.students} Graduates</span>
                     </div>
                     <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted">
                        <span>Next Deadline</span>
                        <span className="text-black">{prog.deadline}</span>
                     </div>
                  </div>
               </div>
            </FadeIn>
         ))}
      </div>
    </div>
  )
}

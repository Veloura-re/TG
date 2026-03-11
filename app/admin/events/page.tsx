'use client'

import { FadeIn } from '@/components/shared/animations'
import { Plus, Calendar, MapPin, MoreVertical, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'

const EVENTS_LIST = [
  { id: 1, title: 'Annual Alumni Summit', date: 'Apr 15, 2026', location: 'London, UK', attendees: 450 },
  { id: 2, title: 'Leadership Workshop', date: 'May 20, 2026', location: 'Ankara, TR', attendees: 50 },
]

export default function AdminEventsPage() {
  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">Events Management.</h1>
            <p className="text-muted font-medium">Schedule and manage upcoming and past events.</p>
         </div>
         <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            Add Event
         </button>
      </header>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {EVENTS_LIST.map((event) => (
            <FadeIn key={event.id}>
               <div className="bg-white border border-border p-8 rounded-[40px] hover:shadow-xl transition-all group">
                  <div className="flex items-start justify-between mb-8">
                     <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex flex-col items-center justify-center border border-border group-hover:bg-black group-hover:text-white transition-colors">
                        <span className="text-[10px] font-bold uppercase opacity-60">APR</span>
                        <span className="text-2xl font-bold">15</span>
                     </div>
                     <div className="flex gap-2">
                        <button className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-border transition-all">
                           <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-3 bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 transition-all">
                           <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">{event.title}</h3>
                  <div className="space-y-3 font-medium text-muted">
                     <div className="flex items-center gap-3"><Calendar className="w-5 h-5" /> {event.date}</div>
                     <div className="flex items-center gap-3"><MapPin className="w-5 h-5" /> {event.location}</div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-zinc-50 flex items-center justify-between">
                     <p className="text-sm font-bold uppercase tracking-widest text-muted">{event.attendees} Registered</p>
                     <p className="text-xs font-bold text-green-600 uppercase tracking-widest">Active</p>
                  </div>
               </div>
            </FadeIn>
         ))}
      </div>
    </div>
  )
}

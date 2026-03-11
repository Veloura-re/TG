'use client'

import { FadeIn } from '@/components/shared/animations'
import { Plus, Files, Download, Trash2, Edit2 } from 'lucide-react'

const RESOURCES_LIST = [
  { id: 1, title: 'Alumni Network Handbook 2026', type: 'PDF' },
  { id: 2, title: 'Official Guidelines', type: 'DOCX' },
]

export default function AdminResourcesPage() {
  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">Resource Center.</h1>
            <p className="text-muted font-medium">Upload and manage official documents and guides.</p>
         </div>
         <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            Upload Document
         </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {RESOURCES_LIST.map((res) => (
            <FadeIn key={res.id}>
               <div className="p-8 bg-white border border-border rounded-[32px] hover:border-black transition-all flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center border border-border group-hover:bg-black group-hover:text-white transition-colors">
                        <Files className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-xl mb-1">{res.title}</h4>
                        <p className="text-sm font-bold text-muted uppercase tracking-widest">{res.type} Document</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-3 hover:bg-zinc-100 rounded-xl border border-transparent hover:border-border">
                        <Download className="w-5 h-5" />
                     </button>
                     <button className="p-3 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100">
                        <Trash2 className="w-5 h-5 text-red-600" />
                     </button>
                  </div>
               </div>
            </FadeIn>
         ))}
      </div>
    </div>
  )
}

'use client'

import { FadeIn } from '@/components/shared/animations'
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'

const NEWS_LIST = [
  { id: 1, title: 'Annual Global Alumni Summit 2026', category: 'Events', status: 'Published', date: 'Mar 15, 2026' },
  { id: 2, title: 'New Research Grants and Funding', category: 'Scholarships', status: 'Draft', date: 'Mar 10, 2026' },
]

export default function AdminNewsPage() {
  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">News Management.</h1>
            <p className="text-muted font-medium">Create, edit, and manage all articles and announcements.</p>
         </div>
         <Link href="/admin/news/new" className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            Create News
         </Link>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:row items-center gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
            <input type="text" placeholder="Search by title..." className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5" />
         </div>
         <button className="flex items-center gap-2 px-8 py-4 bg-white border border-border rounded-2xl font-bold hover:bg-zinc-50">
            <Filter className="w-5 h-5" /> Filter
         </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-[40px] overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-zinc-50 border-b border-border">
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted">Title</th>
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted">Category</th>
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted">Status</th>
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted">Date</th>
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted flex justify-end">Actions</th>
               </tr>
            </thead>
            <tbody>
               {NEWS_LIST.map((news) => (
                  <tr key={news.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors group">
                     <td className="px-10 py-8 font-bold text-lg">{news.title}</td>
                     <td className="px-10 py-8 text-muted font-medium">{news.category}</td>
                     <td className="px-10 py-8">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${news.status === 'Published' ? 'bg-green-50 text-green-700' : 'bg-zinc-100 text-zinc-600'}`}>
                           {news.status}
                        </span>
                     </td>
                     <td className="px-10 py-8 text-muted font-medium">{news.date}</td>
                     <td className="px-10 py-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-3 hover:bg-white rounded-xl border border-transparent hover:border-border transition-all">
                              <Edit2 className="w-5 h-5 text-zinc-600" />
                           </button>
                           <button className="p-3 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all">
                              <Trash2 className="w-5 h-5 text-red-600" />
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

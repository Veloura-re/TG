'use client'

import { FadeIn, AnimatedSection } from '@/components/shared/animations'
import { Plus, ImageIcon, Trash2, Edit2, UploadCloud } from 'lucide-react'

export default function AdminGalleryPage() {
  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">Gallery Management.</h1>
            <p className="text-muted font-medium">Upload photos to the organization's public gallery and events feed.</p>
         </div>
         <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            Upload Photo
         </button>
      </header>

      {/* Upload Zone Placeholder */}
      <FadeIn>
         <div className="bg-white border-2 border-dashed border-border p-6 md:p-16 rounded-[48px] flex flex-col items-center justify-center text-center group hover:border-black transition-colors cursor-pointer">
            <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center border border-border mb-8 group-hover:bg-black group-hover:text-white transition-colors">
               <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Drop your photos here.</h3>
            <p className="text-muted font-medium">JPG, PNG or WEBP (max 10MB per file)</p>
         </div>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {[1, 2, 3, 4, 5, 6].map((img) => (
            <FadeIn key={img}>
               <div className="relative aspect-square bg-zinc-100 rounded-[32px] overflow-hidden group border border-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                     <ImageIcon className="w-12 h-12 text-black/5" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                     <button className="p-3 bg-white rounded-xl hover:scale-110 transition-transform">
                        <Edit2 className="w-5 h-5 text-black" />
                     </button>
                     <button className="p-3 bg-red-600 rounded-xl hover:scale-110 transition-transform">
                        <Trash2 className="w-5 h-5 text-white" />
                     </button>
                  </div>
               </div>
            </FadeIn>
         ))}
      </div>
    </div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase-browser'
import { FadeIn } from '@/components/shared/animations'
import { Plus, ImageIcon, Trash2, UploadCloud, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminGalleryPage() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchGallery = async () => {
    setIsLoading(true)
    const { data: gallery, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to load gallery images')
    } else {
      setData(gallery || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    // In a full implementation, delete from Storage bucket as well
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete image')
    } else {
      toast.success('Image deleted successfully')
      fetchGallery()
    }
  }

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">Gallery Management.</h1>
          <p className="text-muted font-medium">Upload photos to the organization's public gallery and events feed.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={fetchGallery} disabled={isLoading} className="p-4 bg-white border border-border rounded-2xl hover:bg-zinc-50 transition-colors">
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <Link href="/admin/gallery/new" className="bg-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-primary transition-all shadow-xl">
            <Plus className="w-5 h-5" />
            Upload Photo
          </Link>
        </div>
      </header>

      {/* Upload Zone Placeholder - Links to new page */}
      <FadeIn>
         <Link href="/admin/gallery/new">
           <div className="bg-white border-2 border-dashed border-border p-6 md:p-16 rounded-[48px] flex flex-col items-center justify-center text-center group hover:border-black transition-colors cursor-pointer bg-zinc-50/50">
              <div className="w-20 h-20 bg-white shadow-sm rounded-3xl flex items-center justify-center border border-border mb-8 group-hover:bg-black group-hover:text-white transition-colors">
                 <UploadCloud className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">Drop your photos here.</h3>
              <p className="text-muted font-medium text-sm">Or click to browse - JPG, PNG or WEBP (max 10MB)</p>
           </div>
         </Link>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {isLoading ? (
           <div className="col-span-full py-24 flex justify-center">
             <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
           </div>
         ) : data.length === 0 ? (
           <div className="col-span-full py-24 text-center text-muted font-medium">
             No images found in the gallery.
           </div>
         ) : (
           data.map((img, i) => (
              <FadeIn key={img.id} delay={i * 0.05}>
                 <div className="relative aspect-square bg-zinc-100 rounded-[32px] overflow-hidden group border border-border">
                    <Image 
                      src={img.image_url || "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=800&auto=format&fit=crop"} 
                      alt={img.caption || 'Gallery Image'} 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium truncate">{img.caption}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
                       <button onClick={() => handleDelete(img.id)} className="p-3 bg-red-600 rounded-xl hover:scale-110 transition-transform shadow-lg">
                          <Trash2 className="w-5 h-5 text-white" />
                       </button>
                    </div>
                 </div>
              </FadeIn>
           ))
         )}
      </div>
    </div>
  )
}

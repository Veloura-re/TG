'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function NewGalleryPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    image_url: '',
    caption: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('gallery')
        .insert([formData])

      if (error) throw error

      toast.success('Visual intelligence deployed to gallery!')
      router.push('/admin/gallery')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to deploy visual')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <header className="flex items-center justify-between">
        <Link 
          href="/admin/gallery" 
          className="flex items-center gap-2 text-muted hover:text-black transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Visuals
        </Link>
      </header>

      <div className="space-y-4">
         <div className="flex items-center gap-3 text-primary font-bold text-[10px] uppercase tracking-[0.4em]">
            <ImageIcon className="w-4 h-4" /> Vision Protocol
         </div>
         <h1 className="text-5xl font-bold tracking-tighter italic">UPLOAD<br/><span className="text-primary not-italic">PHOTO.</span></h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white border border-border p-8 md:p-12 rounded-[48px] shadow-sm space-y-8">
          <div className="space-y-3">
            <Label htmlFor="image_url" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Image Source URL</Label>
            <Input
              id="image_url"
              required
              placeholder="https://images.unsplash.com/..."
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              className="h-16 rounded-2xl border-border focus-visible:ring-primary shadow-sm bg-zinc-50/30"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="caption" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Visual Caption</Label>
            <Input
              id="caption"
              placeholder="Briefly describe the visual protocol..."
              value={formData.caption}
              onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
              className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
            />
          </div>

          {formData.image_url && (
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Feed Preview</Label>
              <div className="aspect-video w-full rounded-3xl overflow-hidden border border-border relative bg-zinc-50">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                       (e.target as any).src = "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=800&auto=format&fit=crop"
                    }}
                 />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-6">
          <Link href="/admin/gallery">
            <Button type="button" variant="ghost" className="h-16 px-10 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
              Abort
            </Button>
          </Link>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="h-16 px-12 rounded-2xl font-bold uppercase tracking-widest text-[10px] gap-3 shadow-2xl active:scale-95 transition-all bg-black hover:bg-primary"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Initiate Deployment
          </Button>
        </div>
      </form>
    </div>
  )
}

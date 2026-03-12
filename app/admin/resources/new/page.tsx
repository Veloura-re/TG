'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, Files, Upload } from 'lucide-react'
import Link from 'next/link'

export default function NewResourcePage() {
  const router = useRouter()
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_url: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('resources')
        .insert([formData])

      if (error) throw error

      toast.success('Resource deployment successful!')
      router.push('/admin/resources')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to deploy resource')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <header className="flex items-center justify-between">
        <Link 
          href="/admin/resources" 
          className="flex items-center gap-2 text-muted hover:text-black transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Files
        </Link>
      </header>

      <div className="space-y-4">
         <div className="flex items-center gap-3 text-primary font-bold text-[10px] uppercase tracking-[0.4em]">
            <Files className="w-4 h-4" /> Data Protocol
         </div>
         <h1 className="text-5xl font-bold tracking-tighter italic">UPLOAD<br/><span className="text-primary not-italic">RESOURCE.</span></h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white border border-border p-8 md:p-12 rounded-[48px] shadow-sm space-y-8">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Resource Title</Label>
            <Input
              id="title"
              required
              placeholder="Alumni Handbook 2026 Edition..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="h-16 rounded-2xl border-border focus-visible:ring-primary shadow-sm bg-zinc-50/30"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="file_url" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">File Link / Link URL</Label>
            <div className="relative">
               <Input
                  id="file_url"
                  required
                  placeholder="https://storage.turkishgraduates.org/..."
                  value={formData.file_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, file_url: e.target.value }))}
                  className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30 pr-16"
               />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                  <Upload className="w-5 h-5" />
               </div>
            </div>
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-2 ml-4">Tip: Link to a document in Supabase Storage or an external guide.</p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Resource Description</Label>
            <Textarea
              id="description"
              required
              placeholder="Briefly explain the contents and purpose of this resource..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[200px] rounded-3xl border-border focus-visible:ring-primary bg-zinc-50/30 p-8 text-lg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-6">
          <Link href="/admin/resources">
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

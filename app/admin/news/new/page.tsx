'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/shared/animations'

export default function NewNewsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'General',
    content: '',
    cover_image: '',
    publish_date: new Date().toISOString().split('T')[0]
  })

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
    
    setFormData(prev => ({ ...prev, title, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('news')
        .insert([formData])

      if (error) throw error

      toast.success('News article published successfully!')
      router.push('/admin/news')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to publish article')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <header className="flex items-center justify-between">
        <Link 
          href="/admin/news" 
          className="flex items-center gap-2 text-muted hover:text-black transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Intelligence
        </Link>
      </header>

      <div className="space-y-4">
         <div className="flex items-center gap-3 text-primary font-bold text-[10px] uppercase tracking-[0.4em]">
            <Sparkles className="w-4 h-4" /> New Article Protocol
         </div>
         <h1 className="text-5xl font-bold tracking-tighter italic">DEPLOY<br/><span className="text-primary not-italic">INTELLIGENCE.</span></h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white border border-border p-8 md:p-12 rounded-[48px] shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Article Title</Label>
              <Input
                id="title"
                required
                placeholder="The Future of the Network..."
                value={formData.title}
                onChange={handleTitleChange}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary shadow-sm bg-zinc-50/30"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="slug" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">URL Identifier (Slug)</Label>
              <Input
                id="slug"
                required
                placeholder="future-of-network"
                value={formData.slug}
                className="h-16 rounded-2xl border-border bg-zinc-50 text-muted font-medium cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-3">
              <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Category</Label>
              <Input
                id="category"
                required
                placeholder="Announcements, Events, etc."
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="publish_date" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Publish Date</Label>
              <Input
                id="publish_date"
                type="date"
                required
                value={formData.publish_date}
                onChange={(e) => setFormData(prev => ({ ...prev, publish_date: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="cover_image" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Cover Image URL</Label>
            <Input
              id="cover_image"
              placeholder="https://images.unsplash.com/..."
              value={formData.cover_image}
              onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
              className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="content" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Article Content</Label>
            <Textarea
              id="content"
              required
              placeholder="Compose your intelligence brief here..."
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-[400px] rounded-3xl border-border focus-visible:ring-primary bg-zinc-50/30 p-8 text-lg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-6">
          <Link href="/admin/news">
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

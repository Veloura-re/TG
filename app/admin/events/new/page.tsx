'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function NewEventPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    banner_image: '',
    event_date: '',
    location: '',
    online_link: '',
    registration_link: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Supabase expects ISO string for timestamptz
      const dataToInsert = {
        ...formData,
        event_date: new Date(formData.event_date).toISOString()
      }

      const { error } = await supabase
        .from('events')
        .insert([dataToInsert])

      if (error) throw error

      toast.success('Event scheduled successfully!')
      router.push('/admin/events')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to schedule event')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <header className="flex items-center justify-between">
        <Link 
          href="/admin/events" 
          className="flex items-center gap-2 text-muted hover:text-black transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Operations
        </Link>
      </header>

      <div className="space-y-4">
         <div className="flex items-center gap-3 text-primary font-bold text-[10px] uppercase tracking-[0.4em]">
            <Calendar className="w-4 h-4" /> Summit Protocol
         </div>
         <h1 className="text-5xl font-bold tracking-tighter italic">SCHEDULE<br/><span className="text-primary not-italic">SUMMIT.</span></h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white border border-border p-8 md:p-12 rounded-[48px] shadow-sm space-y-8">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Event Title</Label>
            <Input
              id="title"
              required
              placeholder="Annual Alumni Summit 2026..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="h-16 rounded-2xl border-border focus-visible:ring-primary shadow-sm bg-zinc-50/30"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="event_date" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Event Date & Time</Label>
              <Input
                id="event_date"
                type="datetime-local"
                required
                value={formData.event_date}
                onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="location" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Physical Location</Label>
              <Input
                id="location"
                placeholder="London, UK or TBD"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="online_link" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Online Link (Zoom/Meet)</Label>
              <Input
                id="online_link"
                placeholder="https://zoom.us/..."
                value={formData.online_link}
                onChange={(e) => setFormData(prev => ({ ...prev, online_link: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="registration_link" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Registration Link</Label>
              <Input
                id="registration_link"
                placeholder="https://forms.gle/..."
                value={formData.registration_link}
                onChange={(e) => setFormData(prev => ({ ...prev, registration_link: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="banner_image" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Banner Image URL</Label>
            <Input
              id="banner_image"
              placeholder="https://images.unsplash.com/..."
              value={formData.banner_image}
              onChange={(e) => setFormData(prev => ({ ...prev, banner_image: e.target.value }))}
              className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Event Description</Label>
            <Textarea
              id="description"
              required
              placeholder="Detail the agenda and protocol for this event..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[200px] rounded-3xl border-border focus-visible:ring-primary bg-zinc-50/30 p-8 text-lg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-6">
          <Link href="/admin/events">
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

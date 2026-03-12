'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function NewOpportunityPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    description: '',
    deadline: '',
    apply_link: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('opportunities')
        .insert([formData])

      if (error) throw error

      toast.success('Opportunity listed successfully!')
      router.push('/admin/opportunities')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to list opportunity')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <header className="flex items-center justify-between">
        <Link 
          href="/admin/opportunities" 
          className="flex items-center gap-2 text-muted hover:text-black transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Intelligence
        </Link>
      </header>

      <div className="space-y-4">
         <div className="flex items-center gap-3 text-primary font-bold text-[10px] uppercase tracking-[0.4em]">
            <Briefcase className="w-4 h-4" /> Career Protocol
         </div>
         <h1 className="text-5xl font-bold tracking-tighter italic">OPEN<br/><span className="text-primary not-italic">OPPORTUNITY.</span></h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white border border-border p-8 md:p-12 rounded-[48px] shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Position / Opportunity Title</Label>
              <Input
                id="title"
                required
                placeholder="Senior Research Fellow..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary shadow-sm bg-zinc-50/30"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="organization" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Organization Name</Label>
              <Input
                id="organization"
                required
                placeholder="Global Network HQ..."
                value={formData.organization}
                onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="deadline" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Application Deadline</Label>
              <Input
                id="deadline"
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="apply_link" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Apply URL</Label>
              <Input
                id="apply_link"
                placeholder="https://career.portal/..."
                value={formData.apply_link}
                onChange={(e) => setFormData(prev => ({ ...prev, apply_link: e.target.value }))}
                className="h-16 rounded-2xl border-border focus-visible:ring-primary bg-zinc-50/30"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Role Description</Label>
            <Textarea
              id="description"
              required
              placeholder="Outline the responsibilities and requirements..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[300px] rounded-3xl border-border focus-visible:ring-primary bg-zinc-50/30 p-8 text-lg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-6">
          <Link href="/admin/opportunities">
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

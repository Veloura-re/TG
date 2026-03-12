'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollFadeIn, StaggerContainer, StaggerItem, AnimatedSection, Magnetic, GlowLine } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Comments } from '@/components/shared/comments'
import { Calendar, MapPin, Users, ArrowRight, Star, Loader2, Plus } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase-browser'

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      setEvents(data || [])

      // Check admin status
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: admin } = await supabase
          .from('admins')
          .select('role')
          .eq('id', user.id)
          .single()
        setIsAdmin(!!admin)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEventStatus = (eventDate: string) => {
    const today = new Date()
    const date = new Date(eventDate)
    if (date < today) return 'Past Event'
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays <= 30) return 'Registration Open'
    return 'Upcoming'
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <InteractiveGrid />
      
      <div className="section-padding relative z-10">
        {/* Hero */}
        <ScrollFadeIn className="max-w-4xl mb-32">
          <motion.span 
            className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Events & Gatherings
          </motion.span>
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter mb-8 italic text-black uppercase">
            CONNECTING <span className="text-primary not-italic">PEOPLE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
            We organize regular summits, workshops, and local meetups to keep our global community strong and active.
          </p>
          
          {isAdmin && (
            <div className="mt-12">
              <Magnetic>
                <Link href="/admin/events/new" className="group bg-black text-white px-10 py-6 rounded-3xl font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-4 hover:bg-primary transition-all shadow-2xl active:scale-95 border border-white/10 w-fit">
                  <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                    <Plus className="w-5 h-5" />
                  </div>
                  Deploy Summit
                </Link>
              </Magnetic>
            </div>
          )}
        </ScrollFadeIn>

        <GlowLine className="mb-16" />

        {/* Events List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted">Loading Events...</span>
          </div>
        ) : events.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 gap-8">
            {events.map((event) => (
              <StaggerItem key={event.id}>
                <motion.div 
                  className="group bg-white border-2 border-zinc-100 p-6 md:p-10 md:p-16 rounded-[60px] hover:border-primary transition-all shadow-[0_20px_60px_-20px_rgba(0,0,0,0.05)] overflow-hidden"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-6 flex-1">
                      <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{getEventStatus(event.date)}</span>
                        <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3" /> {formatDate(event.date)}</span>
                      </motion.div>
                      <h2 className="text-4xl md:text-5xl font-bold group-hover:text-primary transition-colors uppercase">{event.title}</h2>
                      <p className="text-xl text-muted leading-relaxed max-w-2xl">{event.description}</p>
                      <div className="flex flex-wrap items-center gap-8 text-black font-bold text-xs uppercase tracking-widest pt-4">
                         <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.location}</span>
                         <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> {event.capacity ? `${event.capacity} Capacity` : 'Open Attendance'}</span>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Magnetic>
                        {event.link ? (
                          <Link href={event.link.startsWith('http') ? event.link : `/events/${event.id}`} className="bg-black text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all shadow-xl whitespace-nowrap">
                            View Details <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          <button className="bg-black text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all shadow-xl whitespace-nowrap">
                            Join Event <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </Magnetic>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-40">
            <h3 className="text-2xl font-bold text-muted uppercase tracking-widest">No Events Found</h3>
            <p className="text-muted mt-4">Check back later for new gatherings.</p>
          </div>
        )}

        {/* Past Events Short Summary */}
        <ScrollFadeIn direction="up" className="mt-40 border-t-2 border-zinc-100 pt-32">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                 <h3 className="text-3xl font-bold uppercase mb-4">Past <span className="text-primary italic">Highlights.</span></h3>
                 <p className="text-muted font-medium">Over 50 successful gatherings in 20 countries since our foundation.</p>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <motion.div 
                   className="bg-zinc-50 p-8 rounded-3xl border-2 border-transparent hover:border-zinc-200 transition-all"
                   whileHover={{ scale: 1.03 }}
                 >
                    <Star className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold mb-2 uppercase">2025 Grand Summit</h4>
                    <p className="text-xs text-muted">Istanbul // 500+ Attendees</p>
                 </motion.div>
                 <motion.div 
                   className="bg-zinc-50 p-8 rounded-3xl border-2 border-transparent hover:border-zinc-200 transition-all"
                   whileHover={{ scale: 1.03 }}
                 >
                    <Star className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold mb-2 uppercase">Tech Connect 24</h4>
                    <p className="text-xs text-muted">London // Innovation Focus</p>
                 </motion.div>
              </div>
           </div>
        </ScrollFadeIn>

        {/* Comments Section */}
        <GlowLine className="mt-32 mb-16" />
        <ScrollFadeIn>
          <Comments targetType="events" targetId="events-page-general" />
        </ScrollFadeIn>
      </div>
    </div>
  )
}


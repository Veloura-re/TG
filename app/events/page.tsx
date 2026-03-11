'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrollFadeIn, StaggerContainer, StaggerItem, AnimatedSection, Magnetic, GlowLine } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Comments } from '@/components/shared/comments'
import { Calendar, MapPin, Users, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function EventsPage() {
  const events = [
    {
      id: "evt-summit-2026",
      title: "Global Alumni Summit 2026",
      date: "August 15-17, 2026",
      location: "Istanbul, Turkey",
      description: "Our flagship event bringing together graduates from across the globe for three days of networking, workshops, and celebration.",
      status: "Upcoming",
      link: "/events/summit-2026"
    },
    {
      id: "evt-berlin-2026",
      title: "Regional Network Gathering",
      date: "May 10, 2026",
      location: "Berlin, Germany",
      description: "A professional networking dinner for our members based in Western Europe. Hosted at the Berlin Tech Hub.",
      status: "Upcoming"
    },
    {
      id: "evt-workshop-6 md:p-2026",
      title: "Career Excellence Workshop",
      date: "March 22, 2026",
      location: "Online / Virtual",
      description: "A specialized session on global career transitions and advanced leadership skills for our alumni.",
      status: "Registration Open"
    }
  ]

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
        </ScrollFadeIn>

        <GlowLine className="mb-16" />

        {/* Events List */}
        <StaggerContainer className="grid grid-cols-1 gap-8">
          {events.map((event) => (
            <StaggerItem key={event.id}>
              <motion.div 
                className="group bg-white border-2 border-zinc-100 p-6 md:p-10 md:p-6 md:p-16 rounded-[60px] hover:border-primary transition-all shadow-[0_20px_60px_-20px_rgba(0,0,0,0.05)]"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row justify-between gap-6 md:p-12">
                  <div className="space-y-6 flex-1">
                    <motion.div 
                      className="flex items-center gap-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{event.status}</span>
                      <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3" /> {event.date}</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold group-hover:text-primary transition-colors uppercase">{event.title}</h2>
                    <p className="text-xl text-muted leading-relaxed max-w-2xl">{event.description}</p>
                    <div className="flex items-center gap-8 text-black font-bold text-xs uppercase tracking-widest pt-4">
                       <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.location}</span>
                       <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> 200+ Attending</span>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Magnetic>
                      {event.link ? (
                        <Link href={event.link} className="bg-black text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all shadow-xl">
                          View Details <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <button className="bg-black text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all shadow-xl">
                          Register Now <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </Magnetic>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Past Events Short Summary */}
        <ScrollFadeIn direction="up" className="mt-40 border-t-2 border-zinc-100 pt-32">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-12 items-center">
              <div>
                 <h3 className="text-3xl font-bold uppercase mb-4">Past <span className="text-primary italic">Highlights.</span></h3>
                 <p className="text-muted font-medium">Over 50 successful gatherings in 20 countries since our foundation.</p>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
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

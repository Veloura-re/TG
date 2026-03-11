'use client'

import React from 'react'
import { FadeIn, AnimatedSection, TextReveal, Magnetic } from '@/components/shared/animations'
import { Calendar, MapPin, Clock, ArrowRight, Zap, Globe, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const EVENTS = [
  { 
    id: 1, 
    title: 'Annual Global Alumni Summit 2026', 
    date: 'Apr 15-17, 2026', 
    location: 'London, UK / Virtual Node', 
    type: 'Summit', 
    node: 'Alpha',
    status: 'Registration Open' 
  },
  { 
    id: 2, 
    title: 'High-Performance Leadership Workshop', 
    date: 'May 20, 2026', 
    location: 'Ankara, TR', 
    type: 'Workshop', 
    node: 'Beta',
    status: 'Upcoming' 
  },
  { 
    id: 3, 
    title: 'Strategic Networking Lunch: Node Istanbul', 
    date: 'Jun 05, 2026', 
    location: 'Istanbul, TR', 
    type: 'Networking', 
    node: 'Gamma',
    status: 'Planned' 
  },
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'past'>('upcoming')

  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <div className="max-w-6xl mb-24">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Operations // Summits</span>
          </FadeIn>
          <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black">
            <TextReveal text="GLOBAL" className="mb-2" />
            <span className="text-primary italic"><TextReveal text="SUMMITS." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-3xl">
            High-performance gatherings across global nodes. Connect, strategize, and lead the future of professional collaboration.
          </p>
        </div>

        {/* Futuristic Tab Switcher */}
        <div className="flex justify-center border-b border-zinc-100 mb-20">
          <div className="inline-flex gap-12 p-1 bg-zinc-50 rounded-full border border-border">
            {['upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === tab ? "bg-black text-white shadow-xl" : "text-muted hover:text-black"
                )}
              >
                {tab} Protocols
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="space-y-12">
          {EVENTS.map((event, i) => (
            <FadeIn key={event.id} delay={i * 0.1}>
              <div className="group relative bg-white border border-border p-10 md:p-16 rounded-[48px] hover:border-primary hover:shadow-2xl transition-all duration-700 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:text-primary transition-all pointer-events-none">
                  <Shield className="w-80 h-80 rotate-12" />
                </div>
                
                <div className="flex-1 space-y-10 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-zinc-50 border border-border rounded-3xl flex flex-col items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-700">
                       <span className="text-[10px] font-bold uppercase opacity-60">Node</span>
                       <span className="text-2xl font-bold tracking-tighter">{event.node}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 text-primary font-bold text-[10px] tracking-widest uppercase mb-2">
                        <Zap className="w-3.5 h-3.5 animate-pulse" /> {event.type} Protocol
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none group-hover:text-black transition-colors">{event.title}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted font-medium text-lg">
                    <div className="flex items-center gap-4 py-4 border-b border-zinc-50 group-hover:text-black transition-colors">
                      <Calendar className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors" /> {event.date}
                    </div>
                    <div className="flex items-center gap-4 py-4 border-b border-zinc-50 group-hover:text-black transition-colors">
                      <MapPin className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors" /> {event.location}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col items-center gap-6">
                  <div className="px-6 py-2 bg-zinc-50 border border-border rounded-full text-[9px] font-bold uppercase tracking-widest group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary transition-all">
                    {event.status}
                  </div>
                  <Magnetic>
                    <button className="bg-black text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl group-hover:bg-primary transition-all flex items-center gap-3 active:scale-95">
                      Request Access <ArrowRight className="w-4 h-4" />
                    </button>
                  </Magnetic>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  )
}

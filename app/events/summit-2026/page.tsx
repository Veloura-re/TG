'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn, AnimatedSection, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Calendar, MapPin, Users, ArrowLeft, Clock, Info, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function SummitDetailPage() {
  const schedule = [
    { time: "09:00", title: "Opening Ceremony", desc: "Welcome address from the organization leaders." },
    { time: "11:00", title: "Professional Networking", desc: "Meet fellow graduates in your industry." },
    { time: "14:00", title: "Innovation Workshops", desc: "Deep dive into future technology and career growth." },
    { time: "19:00", title: "Alumni Dinner", desc: "A formal dinner celebrating our shared achievements." }
  ]

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <InteractiveGrid />
      
      <div className="section-padding relative z-10">
        <div className="mb-12">
           <Link href="/events" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to Events
           </Link>
        </div>

        <div className="max-w-4xl mb-32">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Major Event</span>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 italic text-black uppercase leading-[0.9]">
            ANNUAL SUMMIT <br /><span className="text-primary not-italic">2026.</span>
          </h1>
          
          <div className="flex flex-wrap gap-10 py-10 border-y-2 border-zinc-100 my-12">
             <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                <div>
                   <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Date</p>
                   <p className="font-bold">August 15-17, 2026</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                   <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Location</p>
                   <p className="font-bold">Istanbul, Turkey</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <div>
                   <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Attendance</p>
                   <p className="font-bold">500+ Alumni</p>
                </div>
             </div>
          </div>

          <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
            Join hundreds of graduates from all generations for our biggest event of the year. The 2026 Summit focuses on "Global Impact & Leadership" - helping you take your career to the next level while staying connected to your roots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-40">
           <div className="lg:col-span-7 space-y-20">
              <div className="space-y-10">
                 <h2 className="text-4xl font-bold uppercase italic">The <span className="text-primary not-italic">Agenda.</span></h2>
                 <div className="space-y-8">
                    {schedule.map((slot, i) => (
                      <FadeIn key={i} delay={i * 0.1}>
                        <div className="flex gap-8 group">
                           <div className="text-primary font-mono font-bold text-xl pt-1">{slot.time}</div>
                           <div className="flex-1 pb-10 border-b border-zinc-100 space-y-3">
                              <h4 className="text-2xl font-bold group-hover:text-primary transition-colors">{slot.title}</h4>
                              <p className="text-muted font-medium leading-relaxed">{slot.desc}</p>
                           </div>
                        </div>
                      </FadeIn>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-5">
              <div className="bg-zinc-50 rounded-[40px] p-12 sticky top-32 space-y-12 border-2 border-zinc-100">
                 <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 uppercase"><Info className="w-6 h-6 text-primary" /> Registration Info</h3>
                    <p className="text-muted font-medium mb-8">Early bird tickets are available until May 1st. Includes access to all workshops, formal dinner, and networking sessions.</p>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex justify-between font-bold text-xs uppercase tracking-widest border-b border-zinc-200 pb-4">
                       <span className="text-muted">Standard Ticket</span>
                       <span>$150 USD</span>
                    </div>
                    <div className="flex justify-between font-bold text-xs uppercase tracking-widest border-b border-zinc-200 pb-4">
                       <span className="text-muted">Early Bird (-20%)</span>
                       <span className="text-primary">$120 USD</span>
                    </div>
                 </div>

                 <Magnetic>
                    <button className="w-full bg-primary text-white py-6 rounded-3xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-2xl">
                       Secure Regular Spot
                    </button>
                 </Magnetic>
                 
                 <p className="text-[10px] text-center font-bold text-muted uppercase tracking-widest">Financial aid is available for recent graduates.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

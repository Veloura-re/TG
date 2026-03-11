'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FadeIn, TextReveal, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Users, Zap, CheckCircle2, ArrowRight, MessageSquare, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <InteractiveGrid />
      
      <div className="section-padding relative z-10">
        <div className="max-w-4xl mb-32">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Mentorship Program</span>
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter mb-8 italic text-black uppercase">
            GROW <span className="text-primary not-italic">TOGETHER.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
            Our mentorship program connects experienced alumni with recent graduates to share career advice, industry insights, and professional guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-20 items-center mb-40">
           <div className="space-y-12">
              <div className="space-y-6">
                 <h2 className="text-4xl font-bold uppercase tracking-tight">How it <span className="text-primary italic">Works.</span></h2>
                 <p className="text-lg text-muted font-medium">We match mentors and mentees based on their professional fields, location, and career goals.</p>
              </div>
              
              <div className="space-y-8">
                 {[
                   { title: "Personal Matching", desc: "Find a mentor who understands your specific career path.", icon: Users },
                   { title: "Career Growth", desc: "Get advice on job applications, interviews, and promotions.", icon: Briefcase },
                   { title: "Direct Contact", desc: "Message your mentor directly through our secure alumni portal.", icon: MessageSquare }
                 ].map((item, i) => (
                   <FadeIn key={i} delay={i * 0.1}>
                     <div className="flex gap-6 group">
                        <div className="w-14 h-14 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all shadow-sm">
                           <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div>
                           <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                           <p className="text-muted font-medium">{item.desc}</p>
                        </div>
                     </div>
                   </FadeIn>
                 ))}
              </div>
           </div>
           
           <FadeIn delay={0.3} className="bg-zinc-50 rounded-[60px] p-6 md:p-12 md:p-6 md:p-20 border-2 border-transparent hover:border-zinc-200 transition-all">
              <h3 className="text-3xl font-bold mb-8 uppercase">Become a <span className="text-primary italic">Mentor.</span></h3>
              <p className="text-muted font-medium mb-12">Share your experience and help the next generation of graduates succeed in their professional journey.</p>
              <ul className="space-y-4 mb-12">
                 {["5+ Years professional experience", "Willingness to meet monthly", "Supportive and guiding mindset"].map((rule, i) => (
                   <li key={i} className="flex items-center gap-3 font-bold text-xs uppercase tracking-widest">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      {rule}
                   </li>
                 ))}
              </ul>
              <Magnetic>
                 <button className="w-full bg-black text-white py-6 rounded-3xl font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-xl">
                    Apply as Mentor
                 </button>
              </Magnetic>
           </FadeIn>
        </div>

        {/* CTA */}
        <div className="bg-primary rounded-[60px] p-6 md:p-20 text-center text-white relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
           <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase italic tracking-tighter">Ready to <span className="not-italic">Connect?</span></h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium">Join our community and find the perfect mentor to help you reach your goals.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                 <Link href="/login" className="bg-white text-primary px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all shadow-2xl">
                    Join via Alumni Portal
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

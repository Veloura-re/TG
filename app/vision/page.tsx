'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic, RevealBox, ScrollFadeIn, StaggerContainer, StaggerItem, GlowLine } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Target, Zap, Shield, Globe, ArrowRight, Cpu, Compass, Rocket } from 'lucide-react'
import { Comments } from '@/components/shared/comments'

export default function VisionPage() {
  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      <InteractiveGrid />
      
      {/* Hero Section */}
      <section className="section-padding pt-48 pb-32">
        <div className="max-w-6xl">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Our Vision & Goals</span>
          </FadeIn>
          <h1 className="text-4xl md:text-[160px] font-bold tracking-tighter mb-12 leading-[0.8] text-black italic-bold">
            <TextReveal text="VISION" className="mb-4" />
            <span className="text-primary not-italic"><TextReveal text="2030." /></span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted leading-relaxed font-medium max-w-4xl">
            Our long-term goal for supporting Turkish graduates worldwide. We are building a future where every alumni has access to global opportunities, professional growth, and a strong community.
          </p>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="section-padding py-40 bg-zinc-50/50 border-y border-zinc-100 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-12">
          {[
            { 
              title: 'Alumni Excellence', 
              desc: 'Building a professional community of over 100,000 successful graduates by 2030.',
              icon: Shield 
            },
            { 
              title: 'Career Matching', 
              desc: 'Helping our members find the perfect academic and job opportunities worldwide.',
              icon: Cpu 
            },
            { 
              title: 'Global Reach', 
              desc: 'Establishing local branches and digital groups in every major city across the globe.',
              icon: Globe 
            }
          ].map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-6 md:p-12 bg-white border border-border rounded-[60px] hover:border-primary transition-all duration-700 group shadow-sm hover:shadow-2xl">
                 <div className="w-20 h-20 bg-zinc-50 border border-border rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl mb-10">
                    <pillar.icon className="w-10 h-10" />
                 </div>
                 <h3 className="text-3xl font-bold tracking-tighter mb-6 underline decoration-primary/20 group-hover:decoration-primary transition-all">{pillar.title}</h3>
                 <p className="text-muted font-medium text-lg leading-relaxed">{pillar.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* The Strategy Loop */}
      <section className="section-padding py-40">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:p-24">
           <div className="flex-1 space-y-12">
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight italic-bold uppercase">OUR CORE <br/><span className="text-primary not-italic">GOALS.</span></h2>
              <p className="text-xl md:text-2xl text-muted font-medium leading-relaxed">
                We are more than a network; we are a community focused on your success. Our 2030 vision uses the talent of our graduates to create a positive impact on technology and global cooperation.
              </p>
              <div className="flex flex-wrap gap-8 pt-8">
                 <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black">
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center border border-border group"><Compass className="w-6 h-6 text-primary group-hover:rotate-45 transition-transform" /></div>
                    Direction Protocol
                 </div>
                 <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black">
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center border border-border group"><Rocket className="w-6 h-6 text-primary group-hover:-translate-y-1 transition-transform" /></div>
                    Launch Sequence
                 </div>
              </div>
           </div>
           <div className="flex-1 w-full aspect-square bg-black rounded-[80px] p-8 md:p-24 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
              <div className="relative z-10 text-center space-y-12">
                 <div className="text-4xl md:text-[120px] md:text-4xl md:text-[200px] font-bold tracking-tighter leading-none text-white/5 group-hover:text-primary transition-all duration-1000">TR</div>
                 <div className="text-xs font-bold uppercase tracking-[0.5em] text-primary animate-pulse">Scanning Future Nodes...</div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
           </div>
        </div>
      </section>

      {/* Comments */}
      <section className="section-padding py-20">
        <GlowLine className="mb-16" />
        <ScrollFadeIn>
          <Comments targetType="programs" targetId="vision-2030" />
        </ScrollFadeIn>
      </section>
    </div>
  )
}

'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic } from '@/components/shared/animations'
import { Landmark, Target, Eye, Compass, ShieldCheck, Zap, ArrowRight, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Narrative High-Header */}
      <section className="section-padding pt-40 pb-24 border-b border-zinc-100">
        <div className="max-w-6xl">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Protocol 01 // Origins</span>
          </FadeIn>
          <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter mb-12 leading-[0.85] text-black">
            <TextReveal text="MISSION" className="mb-2" />
            <span className="text-primary italic"><TextReveal text="INTELLIGENCE." /></span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted max-w-3xl leading-relaxed font-medium">
            Deploying a lifelong legacy of excellence and mutual support for the global network of elite Turkish program graduates.
          </p>
        </div>
      </section>

      {/* Deep Dive Section */}
      <AnimatedSection className="section-padding py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <div className="space-y-12 text-2xl text-muted leading-relaxed font-medium">
            <p className="text-black text-3xl font-bold tracking-tight">
              Established with the vision of creating a sustainable bridge between elite talent and global opportunities.
            </p>
            <p>
              Our organization has grown from a local initiative into a global powerhouse of technological innovation and cultural collaboration. 
              We believe that the completion of a program is just the beginning of a high-performance journey.
            </p>
            <p>
              Our mission is to ensure that every graduate remains connected, supported, and empowered to make meaningful contributions to the global ecosystem.
            </p>
            <div className="pt-10">
              <Magnetic>
                <button className="bg-black text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all shadow-2xl">
                  Explore Nodes <Zap className="w-4 h-4 fill-white" />
                </button>
              </Magnetic>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-zinc-50 rounded-[60px] relative overflow-hidden group border border-border">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.1),transparent_70%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Landmark className="w-40 h-40 text-black/5 group-hover:text-primary/10 transition-colors duration-1000 group-hover:scale-110" />
              </div>
              <div className="absolute bottom-10 left-10 p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-white/20 max-w-[280px]">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <p className="text-xs font-bold text-black uppercase tracking-widest">Secure Network Verified</p>
              </div>
            </div>
            {/* Floating decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-primary/20 rounded-full animate-pulse pointer-events-none" />
          </div>
        </div>
      </AnimatedSection>

      {/* Core Objectives / Stats Grid */}
      <AnimatedSection className="bg-black py-40 px-6 rounded-[80px] mx-6 mb-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {[
            { 
              title: "Global Mission", 
              desc: "Facilitating extreme networking and providing continuous intelligence for our alumni nodes.",
              icon: Target
            },
            { 
              title: "Futuristic Vision", 
              desc: "To be the premier global platform for professional excellence and high-tech collaboration.",
              icon: Eye
            },
            { 
              title: "Secure Values", 
              desc: "Integrity, Global Citizenship, and Mutual Respect encrypted into our network protocol.",
              icon: ShieldCheck
            },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-16 rounded-[60px] hover:bg-white/10 hover:border-primary transition-all group backdrop-blur-sm">
              <div className="mb-12 w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <item.icon className="w-10 h-10" />
              </div>
              <h3 className="text-4xl font-bold mb-6 tracking-tight text-white">{item.title}</h3>
              <p className="text-white/60 text-xl leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  )
}

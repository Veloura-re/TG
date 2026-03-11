'use client'

import Link from 'next/link'
import { FadeIn, AnimatedSection, TextReveal, Magnetic, ScrollFadeIn, StaggerContainer, StaggerItem, FloatingElement, GlowLine } from '@/components/shared/animations'
import { Timeline } from '@/components/about/timeline'
import { Landmark, Target, Eye, Compass, ShieldCheck, Zap, ArrowRight, Shield } from 'lucide-react'
import { Comments } from '@/components/shared/comments'

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Narrative High-Header */}
      <section className="section-padding pt-40 pb-24 border-b border-zinc-100">
        <div className="max-w-6xl">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Our Story</span>
          </FadeIn>
          <h1 className="text-4xl md:text-[140px] font-bold tracking-tighter mb-12 leading-[0.85] text-black">
            <TextReveal text="ABOUT" className="mb-2" />
            <span className="text-primary italic uppercase"><TextReveal text="US." /></span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted max-w-3xl leading-relaxed font-medium">
            Building a lifelong legacy of excellence and support for our global network of Turkish program graduates.
          </p>
        </div>
      </section>

      {/* Deep Dive Section */}
      <AnimatedSection className="section-padding py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:p-32 items-start">
          <ScrollFadeIn direction="left" className="space-y-12 text-2xl text-muted leading-relaxed font-medium">
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
                <Link href="/network" className="bg-black text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-3 hover:bg-primary transition-all shadow-2xl">
                  Our Network <Zap className="w-4 h-4 fill-white" />
                </Link>
              </Magnetic>
            </div>
          </ScrollFadeIn>
          <ScrollFadeIn direction="right" delay={0.2} className="relative">
            <div className="aspect-[4/5] bg-zinc-50 rounded-[60px] relative overflow-hidden group border border-border">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.1),transparent_70%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Landmark className="w-40 h-40 text-black/5 group-hover:text-primary/10 transition-colors duration-1000 group-hover:scale-110" />
              </div>
              <div className="absolute bottom-10 left-10 p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-white/20 max-w-[280px]">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <p className="text-xs font-bold text-black uppercase tracking-widest">Trusted Network</p>
              </div>
            </div>
            {/* Floating decoration */}
            <FloatingElement amplitude={10} duration={5} className="absolute -top-6 md:p-10 -right-10 pointer-events-none">
              <div className="w-40 h-40 border border-primary/20 rounded-full" />
            </FloatingElement>
          </ScrollFadeIn>
        </div>
      </AnimatedSection>

      {/* Milestones Protocol Section */}
      <section className="section-padding py-40 border-t border-zinc-100 bg-zinc-50/30 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-32">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block">Our History</span>
          </FadeIn>
          <h2 className="text-5xl md:text-9xl font-bold tracking-tighter text-black italic-bold leading-none mb-12 uppercase">
            OUR<br />JOURNEY.
          </h2>
          <p className="text-2xl text-muted font-medium leading-relaxed">
            The evolution of our professional community, from its first meeting to a global organization.
          </p>
        </div>
        <Timeline />
      </section>

      {/* Core Objectives / Stats Grid */}
      <AnimatedSection className="bg-black py-40 px-6 rounded-[80px] mx-6 mb-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        <StaggerContainer className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:p-12 relative z-10">
          {[
            { 
              title: "Global Mission", 
              desc: "Connecting alumni and providing continuous updates for our global network.",
              icon: Target
            },
            { 
              title: "Our Vision", 
              desc: "To be the premier platform for professional excellence and collaboration.",
              icon: Eye
            },
            { 
              title: "Our Values", 
              desc: "Integrity, Global Citizenship, and Mutual Respect are at the heart of everything we do.",
              icon: ShieldCheck
            },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-white/5 border border-white/10 p-6 md:p-16 rounded-[60px] hover:bg-white/10 hover:border-primary transition-all group backdrop-blur-sm">
                <div className="mb-12 w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-bold mb-6 tracking-tight text-white">{item.title}</h3>
                <p className="text-white/60 text-xl leading-relaxed font-medium">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* Comments */}
      <section className="section-padding py-20">
        <GlowLine className="mb-16" />
        <ScrollFadeIn>
          <Comments targetType="news" targetId="about-page" />
        </ScrollFadeIn>
      </section>
    </div>
  )
}

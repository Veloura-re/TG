'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic } from '@/components/shared/animations'
import { GraduationCap, Award, Globe, Zap, ArrowRight, Shield, Cpu } from 'lucide-react'

const PROGRAMS = [
  { 
    id: 1, 
    name: 'Excellence Scholarships', 
    description: 'Tier-1 funding for high-performance research in quantum computing and sustainable energy.', 
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    eligibility: 'GPA 3.8+ / Research Proposal Alpha',
    deadline: 'Sep 30, 2026'
  },
  { 
    id: 2, 
    name: 'Leadership Training Protocol', 
    description: 'Executive-level strategic management and cultural diplomacy training for global nodes.', 
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    eligibility: '3+ Years Professional Experience',
    deadline: 'Oct 15, 2026'
  },
  { 
    id: 3, 
    name: 'Global Exchange Initiative', 
    description: 'Secure cross-node placement in international high-tech organizations and research labs.', 
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800',
    eligibility: 'Current Program Graduate Only',
    deadline: 'Jan 10, 2027'
  },
]

export default function ProgramsPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <div className="max-w-6xl mb-32">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Operations // Programs</span>
          </FadeIn>
          <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black">
            <TextReveal text="EXCELLENCE" className="mb-2" />
            <span className="text-primary italic"><TextReveal text="PROTOCOLS." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-3xl">
            Strategic educational pathways and professional acceleration for the global Turkish graduate elite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROGRAMS.map((prog, i) => (
            <FadeIn key={prog.id} delay={i * 0.1}>
              <div className="group bg-white border border-border rounded-[60px] overflow-hidden hover:border-primary hover:shadow-2xl transition-all duration-700 flex flex-col h-full shadow-sm">
                <div className="aspect-[16/11] bg-zinc-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-primary/10 transition-colors duration-700" />
                  <div className="absolute top-8 left-8">
                    <div className="w-16 h-16 bg-white border border-border rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl">
                      <Cpu className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 p-8">
                     <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45 duration-700">
                        <ArrowRight className="w-6 h-6" />
                     </div>
                  </div>
                </div>

                <div className="p-12 pb-16 flex-1 flex flex-col space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-4xl font-bold tracking-tighter leading-none group-hover:text-primary transition-colors">{prog.name}</h3>
                    <p className="text-muted leading-relaxed font-medium text-lg">{prog.description}</p>
                  </div>

                  <div className="pt-10 border-t border-zinc-50 space-y-4 font-bold text-[10px] tracking-widest uppercase">
                    <div className="flex justify-between items-center group-hover:text-black transition-colors">
                      <span className="text-muted flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Eligibility</span>
                      <span>{prog.eligibility}</span>
                    </div>
                    <div className="flex justify-between items-center group-hover:text-black transition-colors">
                      <span className="text-primary flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> Deadline</span>
                      <span>{prog.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  )
}

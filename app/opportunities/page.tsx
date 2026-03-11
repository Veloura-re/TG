'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic } from '@/components/shared/animations'
import { Briefcase, Building, ExternalLink, ArrowUpRight, Zap, Target, Globe } from 'lucide-react'
import Link from 'next/link'

const OPPORTUNITIES = [
  { id: 1, title: 'Senior Software Engineer (AI Ops)', org: 'Velo Solutions', type: 'Job', location: 'London / Remote', node: 'Node 01' },
  { id: 2, title: 'Quantum Research Fellowship', org: 'UN Mission Alpha', type: 'Scholarship', location: 'Geneva, CH', node: 'Node 02' },
  { id: 3, title: 'Strategic Logistics Intern', org: 'Global Core Inc.', type: 'Internship', location: 'Ankara, TR', node: 'Node 03' },
  { id: 4, title: 'Lead Architect (Sustainability)', org: 'Future Works', type: 'Job', location: 'New York, US', node: 'Node 04' },
]

export default function OpportunitiesPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <div className="max-w-6xl mb-32">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Operations // Access Board</span>
          </FadeIn>
          <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black italic">
            <TextReveal text="STRATEGIC" className="mb-2" />
            <span className="text-primary"><TextReveal text="ACCESS." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-3xl">
            Direct gateways to high-value positions and research opportunities curated exclusively for Turkish program graduates.
          </p>
        </div>

        <div className="space-y-6">
          {OPPORTUNITIES.map((opt, i) => (
            <FadeIn key={opt.id} delay={i * 0.1}>
              <div className="group bg-white border border-border rounded-[40px] p-10 md:p-14 hover:border-primary hover:shadow-2xl transition-all duration-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-150 group-hover:text-primary transition-all duration-1000">
                  <Briefcase className="w-60 h-60" />
                </div>
                
                <div className="flex-1 space-y-8 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-zinc-50 border border-border rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl">
                      <Target className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 text-primary font-bold text-[10px] tracking-widest uppercase mb-2">
                        <span className="px-3 py-1 bg-primary/10 rounded-full">{opt.type} Protocol</span>
                        <span>{opt.node}</span>
                      </div>
                      <h3 className="text-4xl font-bold tracking-tighter group-hover:text-black transition-colors">{opt.title}</h3>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-12 text-muted font-medium text-lg pt-4 border-t border-zinc-50">
                    <div className="flex items-center gap-4 group-hover:text-black transition-colors">
                      <Building className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" /> {opt.org}
                    </div>
                    <div className="flex items-center gap-4 group-hover:text-black transition-colors text-zinc-400">
                      <Globe className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" /> {opt.location}
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <Magnetic>
                    <button className="bg-black text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl group-hover:bg-primary transition-all flex items-center gap-3 group-active:scale-95">
                      Initiate Application <ArrowUpRight className="w-4 h-4" />
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

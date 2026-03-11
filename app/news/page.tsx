'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic, RevealBox } from '@/components/shared/animations'
import Link from 'next/link'
import { ArrowRight, Search, Filter, Cpu, Globe, Zap, Radio } from 'lucide-react'

const NEWS_ITEMS = [
  { id: 1, title: 'Annual Global Alumni Summit 2026: Node Registration Open', category: 'Events', date: 'Mar 15, 2026', slug: 'alumni-summit-2026', node: '01' },
  { id: 2, title: 'Extreme Research Grants for High-Performance Graduates', category: 'Scholarships', date: 'Mar 10, 2026', slug: 'research-grants-2026', node: '02' },
  { id: 3, title: 'Intelligence Spotlight: Dr. Arda Yilmaz on Future Core', category: 'Spotlight', date: 'Mar 05, 2026', slug: 'arda-yilmaz-spotlight', node: '03' },
  { id: 4, title: 'Strategic Partnership with ERC Intelligence Ops', category: 'Partnerships', date: 'Feb 28, 2026', slug: 'erc-partnership', node: '04' },
  { id: 5, title: 'Digital Skills Protocol for 2026 Excellence', category: 'Training', date: 'Feb 20, 2026', slug: 'digital-skills-2026', node: '05' },
  { id: 6, title: 'Global Mission Goals: Current Node Commitments', category: 'Reports', date: 'Feb 15, 2026', slug: 'sdg-commitments', node: '06' },
]

export default function NewsPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <FadeIn>
          <div className="flex flex-col md:flex-grow md:items-end justify-between gap-8 mb-24">
            <div className="max-w-4xl">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block flex items-center gap-4">
                 <Radio className="w-4 h-4 animate-pulse" /> Live Intelligence Feed
              </span>
              <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black">
                <TextReveal text="GLOBAL" className="mb-2" />
                <span className="text-primary italic"><TextReveal text="INTELLIGENCE." /></span>
              </h1>
              <p className="text-2xl text-muted leading-relaxed font-medium max-w-2xl">
                Real-time updates and strategic reporting from the global Turkish graduate network. Stay ahead of the curve.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Futuristic Search/Filter */}
        <FadeIn delay={0.2} className="mb-24">
          <div className="flex flex-col md:flex-row gap-4 p-4 bg-zinc-50 border border-border rounded-[32px] shadow-sm">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-hover:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search Intelligence Protocol..." 
                className="w-full pl-16 pr-6 py-6 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <Magnetic>
              <button className="flex items-center justify-center gap-3 px-12 py-6 bg-black text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-primary transition-all">
                <Filter className="w-5 h-5" />
                Filter Feed
              </button>
            </Magnetic>
          </div>
        </FadeIn>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {NEWS_ITEMS.map((item, i) => (
            <FadeIn key={item.id} delay={0.1 * (i % 3)} className="group">
              <Link href={`/news/${item.slug}`}>
                <div className="bg-white border border-transparent border-b-border pb-12 group-hover:border-primary transition-all duration-700">
                  <div className="aspect-[16/10] bg-zinc-50 rounded-[40px] mb-10 overflow-hidden relative border border-border group-hover:border-primary/50 group-hover:shadow-2xl transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-xl">
                        Node {item.node}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-primary tracking-widest uppercase">
                      <span>{item.category} Protocol</span>
                      <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                      <span className="text-muted">{item.date}</span>
                    </div>
                    <h3 className="text-3xl font-bold group-hover:text-primary transition-colors leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <div className="pt-4 flex items-center justify-between">
                       <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-black transition-all">Download Briefing</span>
                       <div className="w-12 h-12 bg-zinc-50 border border-border rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-6 h-6" />
                       </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  )
}

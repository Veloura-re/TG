'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic } from '@/components/shared/animations'
import { Files, Download, ArrowRight, Shield, Zap, Search, Globe, FileText } from 'lucide-react'
import Link from 'next/link'

const RESOURCES = [
  { id: 1, title: 'Network Protocol Handbook 2026', type: 'PDF', size: '2.4 MB', node: 'Node 01' },
  { id: 2, title: 'Strategic Collaboration Guidelines', type: 'DOCX', size: '1.1 MB', node: 'Node 02' },
  { id: 3, title: 'Global Mission Alpha Report', type: 'PDF', size: '5.8 MB', node: 'Node 03' },
  { id: 4, title: 'Secure Authentication Guide', type: 'PDF', size: '0.9 MB', node: 'Node 04' },
  { id: 5, title: 'Alumni Node Operations Manual', type: 'DOCX', size: '3.2 MB', node: 'Node 05' },
]

export default function ResourcesPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <div className="max-w-6xl mb-32">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Operations // Assets</span>
          </FadeIn>
          <h1 className="text-4xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black italic-bold">
            <TextReveal text="ASSET" className="mb-2" />
            <span className="text-primary"><TextReveal text="CENTER." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-3xl">
            Encryption-standard access to official documents, research papers, and strategic network guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESOURCES.map((res, i) => (
            <FadeIn key={res.id} delay={i * 0.1}>
              <Link href={`/resources/${res.id}`}>
              <div className="group p-6 md:p-10 bg-white border border-border rounded-[40px] hover:border-primary hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 flex items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] group-hover:scale-150 group-hover:-rotate-12 transition-all duration-1000">
                  <Files className="w-32 h-32 md:w-60 md:h-60" />
                </div>
                
                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-zinc-50 border border-border rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-700 shadow-xl">
                    <FileText className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-primary font-bold text-[9px] tracking-widest uppercase mb-2">
                       <span>{res.node}</span>
                       <div className="w-1 h-1 bg-primary/20 rounded-full" />
                       <span className="text-muted">{res.size}</span>
                    </div>
                    <h4 className="font-bold text-2xl md:text-3xl tracking-tight group-hover:text-black transition-colors">{res.title}</h4>
                    <p className="text-xs font-bold text-muted uppercase tracking-[0.2em] mt-2 group-hover:text-primary transition-colors">{res.type} Protocol</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <Magnetic>
                    <button className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl active:scale-95 group-hover:rotate-12 duration-500">
                      <Download className="w-6 h-6" />
                    </button>
                  </Magnetic>
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

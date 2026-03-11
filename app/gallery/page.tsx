'use client'

import { FadeIn, AnimatedSection, TextReveal } from '@/components/shared/animations'
import { ImageIcon, Maximize2, Zap, Globe, Shield } from 'lucide-react'
import Link from 'next/link'

export default function GalleryPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <div className="max-w-6xl mb-32">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Operations // Visual Feed</span>
          </FadeIn>
          <h1 className="text-4xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black">
            <TextReveal text="VISUAL" className="mb-2" />
            <span className="text-primary italic"><TextReveal text="EVIDENCE." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-3xl">
            Archived visual reporting from worldwide nodes and strategic summits.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:p-10 space-y-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((img, i) => (
            <FadeIn key={img} delay={i * 0.1}>
              <Link href={`/gallery/${img}`}>
              <div className="break-inside-avoid relative group rounded-[48px] overflow-hidden border border-border hover:border-primary transition-all duration-700 shadow-sm cursor-pointer">
                <div 
                  className="aspect-video md:aspect-[3/4] group-even:aspect-square bg-zinc-50 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-${1500000000000 + img}?auto=format&fit=crop&q=80&w=800')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 md:p-12 text-center">
                    <div className="mb-6 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-700 shadow-2xl">
                      <Maximize2 className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-2">Summit Alpha // Node 0{img}</span>
                    <p className="text-white/80 font-bold text-xl tracking-tight italic">Strategic Networking Protocal Initiated</p>
                  </div>
                </div>
                
                {/* Custom pointer effect area */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 w-4 bg-primary rounded-full animate-ping" />
                </div>
              </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Futuristic Background Blur */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/2 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-black/5 rounded-full blur-[150px]" />
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Landmark, Youtube, Twitter, Instagram, Linkedin, Mail, Zap, Shield, ArrowUpRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Magnetic } from '@/components/shared/animations'

export function Footer() {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) return null

  return (
    <footer className="bg-white pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-100" />
      
      {/* Red Accent Glow */}
      <div className="absolute -bottom-40 -left-40 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:p-20 mb-32 relative z-10">
          <div className="md:col-span-5 space-y-12">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center group-hover:bg-black transition-all duration-500 shadow-[0_10px_30px_rgba(255,0,51,0.3)]">
                <Landmark className="w-7 h-7 text-white" />
              </div>
              <span className="font-bold text-3xl tracking-tighter uppercase italic text-black">TR <span className="text-primary not-italic">Grads.</span></span>
            </Link>
            <p className="text-muted text-xl max-w-sm leading-relaxed font-medium">
              The elite intelligence network for Turkish program graduates. Designing the future of global excellence.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <Magnetic key={i}>
                  <Link href="#" className="w-14 h-14 border-2 border-border rounded-2xl flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all shadow-sm group">
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-10 uppercase tracking-[0.2em]">
            <h4 className="font-black text-xs text-black border-b-2 border-primary w-fit pb-2">Explore</h4>
            <ul className="space-y-6 text-[10px] font-bold">
              <li><Link href="/about" className="text-muted hover:text-primary transition-colors flex items-center gap-2">History <ArrowUpRight className="w-2.5 h-2.5 text-primary" /></Link></li>
              <li><Link href="/vision" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Our Vision <ArrowUpRight className="w-2.5 h-2.5 text-primary" /></Link></li>
              <li><Link href="/network" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Community <ArrowUpRight className="w-2.5 h-2.5 text-primary" /></Link></li>
              <li><Link href="/news" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Latest News <ArrowUpRight className="w-2.5 h-2.5 text-primary" /></Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-10 uppercase tracking-[0.2em]">
            <h4 className="font-black text-xs text-black border-b-2 border-primary w-fit pb-2">Services</h4>
            <ul className="space-y-6 text-[10px] font-bold">
              <li><Link href="/programs" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Scholarships <ArrowUpRight className="w-2.5 h-2.5 text-primary" /></Link></li>
              <li><Link href="/opportunities" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Jobs <ArrowUpRight className="w-2.5 h-2.5 text-primary" /></Link></li>
              <li><Link href="/resources" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Library <ArrowUpRight className="w-2.5 h-2.5 text-primary" /></Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-10 group">
            <h4 className="font-black text-xs text-black uppercase tracking-[0.2em] border-b-2 border-primary w-fit pb-2">Contact</h4>
            <div className="space-y-4">
              <div className="flex flex-col gap-1 p-6 bg-zinc-50 rounded-3xl border-2 border-border group-hover:border-primary transition-all shadow-sm">
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Ankara HQ</span>
                 <p className="font-bold text-lg text-black">Headquarters</p>
                 <p className="text-[11px] font-bold text-muted uppercase tracking-widest">Kizilay Blvd</p>
              </div>
              <Link href="/contact" className="flex items-center justify-between w-full p-6 border-2 border-primary bg-primary text-white rounded-3xl hover:bg-black transition-all group/btn shadow-[0_15px_30px_rgba(255,0,51,0.2)]">
                <span className="text-[10px] font-black uppercase tracking-widest">Contact Us</span>
                <Zap className="w-4 h-4 text-white animate-pulse" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-zinc-100 pt-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted">
            <span className="text-black">© {new Date().getFullYear()} turkishgraduates.com</span>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span>Project Alpha 2.0</span>
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-muted">
            <Link href="#" className="hover:text-primary transition-colors">Privacy [Encrypted]</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Op</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

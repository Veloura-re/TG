import Link from 'next/link'
import { Landmark, Youtube, Twitter, Linkedin, Instagram, Mail, Zap, Shield, ArrowUpRight } from 'lucide-react'
import { Magnetic } from '@/components/shared/animations'

export function Footer() {
  return (
    <footer className="bg-white pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-100" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
          <div className="md:col-span-5 space-y-12">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-xl">
                <Landmark className="w-7 h-7 text-white" />
              </div>
              <span className="font-bold text-3xl tracking-tighter uppercase italic">TR Graduates</span>
            </Link>
            <p className="text-muted text-xl max-w-sm leading-relaxed font-medium">
              The elite intelligence network for Turkish program graduates. Designing the future of global collaboration and research excellence.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <Magnetic key={i}>
                  <Link href="#" className="w-14 h-14 border border-border rounded-2xl flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
                    <Icon className="w-6 h-6" />
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-10 uppercase tracking-[0.2em]">
            <h4 className="font-bold text-xs text-black border-b border-primary w-fit pb-2">Network</h4>
            <ul className="space-y-6 text-[10px] font-bold">
              <li><Link href="/about" className="text-muted hover:text-primary transition-colors flex items-center gap-2">History <ArrowUpRight className="w-2.5 h-2.5" /></Link></li>
              <li><Link href="/news" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Intelligence <ArrowUpRight className="w-2.5 h-2.5" /></Link></li>
              <li><Link href="/events" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Summits <ArrowUpRight className="w-2.5 h-2.5" /></Link></li>
              <li><Link href="/contact" className="text-muted hover:text-primary transition-colors flex items-center gap-2">HQ Contact <ArrowUpRight className="w-2.5 h-2.5" /></Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-10 uppercase tracking-[0.2em]">
            <h4 className="font-bold text-xs text-black border-b border-primary w-fit pb-2">Protocols</h4>
            <ul className="space-y-6 text-[10px] font-bold">
              <li><Link href="/programs" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Scholarships <ArrowUpRight className="w-2.5 h-2.5" /></Link></li>
              <li><Link href="/opportunities" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Access Board <ArrowUpRight className="w-2.5 h-2.5" /></Link></li>
              <li><Link href="/resources" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Asset Center <ArrowUpRight className="w-2.5 h-2.5" /></Link></li>
              <li><Link href="/gallery" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Visual Feed <ArrowUpRight className="w-2.5 h-2.5" /></Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-10 group">
            <h4 className="font-bold text-xs text-black uppercase tracking-[0.2em] border-b border-primary w-fit pb-2">Station</h4>
            <div className="space-y-4">
              <div className="flex flex-col gap-1 p-6 bg-zinc-50 rounded-3xl border border-border group-hover:border-primary transition-colors">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Core Node</span>
                 <p className="font-bold text-lg">Ankara Headquarters</p>
                 <p className="text-sm text-muted">Kizilay Blvd, No: 123</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest p-6 border border-border rounded-3xl group-hover:bg-black group-hover:text-white transition-all cursor-pointer">
                <Shield className="w-4 h-4 text-primary" />
                <span>Encrypted Connection Secure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
            <span>© {new Date().getFullYear()} TR Graduates</span>
            <div className="w-1 h-1 bg-primary rounded-full" />
            <span>Project Alpha 2.0</span>
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Protocol</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Operations</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

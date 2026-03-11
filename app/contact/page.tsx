'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic } from '@/components/shared/animations'
import { Mail, Phone, MapPin, Youtube, Twitter, Linkedin, Instagram, Send, Zap, Globe, Shield } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <div className="max-w-6xl mb-32">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Operations // Headquarters</span>
          </FadeIn>
          <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black">
            <TextReveal text="ESTABLISH" className="mb-2" />
            <span className="text-primary italic"><TextReveal text="CONTACT." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-3xl">
            Protocol for direct communication with the core network. Stationed across global nodes for extreme accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Contact Methods */}
          <div className="space-y-16">
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: 'Transmission', value: 'hq@trgraduates.org', icon: Mail, type: 'Encrypted' },
                  { label: 'Secure Line', value: '+90 312 000 00 00', icon: Phone, type: 'Node TR' },
                  { label: 'Station', value: 'Kizilay Blvd, No: 123, Ankara', icon: MapPin, type: 'Core HQ' },
                  { label: 'Global Node', value: 'London / Istanbul / NY', icon: Globe, type: 'Nodes' },
                ].map((item, i) => (
                  <div key={i} className="p-10 border border-border rounded-[40px] hover:border-primary transition-all group overflow-hidden relative shadow-sm hover:shadow-2xl duration-700">
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-[0.05] group-hover:scale-150 transition-all duration-1000">
                      <item.icon className="w-40 h-40" />
                    </div>
                    <div className="w-16 h-16 bg-zinc-50 border border-border rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 mb-8 shadow-xl">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Zap className="w-3 h-3 animate-pulse" /> {item.type} Protocol
                    </p>
                    <p className="font-bold text-2xl tracking-tighter group-hover:text-black transition-colors">{item.value}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="p-10 bg-black text-white rounded-[40px] flex items-center justify-between group overflow-hidden relative">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
               <div className="relative z-10">
                  <h4 className="text-xs font-bold uppercase tracking-[0.4em] mb-4 text-primary">Social Nodes</h4>
                  <div className="flex gap-6">
                    {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                      <Magnetic key={i}>
                        <button className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-primary transition-all">
                          <Icon className="w-6 h-6" />
                        </button>
                      </Magnetic>
                    ))}
                  </div>
               </div>
               <div className="relative z-10 opacity-10 group-hover:opacity-100 transition-opacity">
                  <Shield className="w-20 h-20 text-primary animate-pulse" />
               </div>
            </FadeIn>
          </div>

          {/* Futuristic Form */}
          <FadeIn delay={0.3} className="bg-zinc-50 border border-border p-12 md:p-16 rounded-[60px] relative shadow-2xl">
            <div className="mb-12">
               <h3 className="text-4xl font-bold tracking-tighter mb-4">Transmission Interface</h3>
               <p className="text-muted font-medium">Send an encrypted message to the core mission control.</p>
            </div>
            <form className="space-y-8">
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="IDENTITY (NAME)" 
                  className="w-full bg-white border border-border p-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold tracking-widest text-[10px] uppercase"
                />
                <input 
                  type="email" 
                  placeholder="TRANSMISSION CHANNEL (EMAIL)" 
                  className="w-full bg-white border border-border p-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold tracking-widest text-[10px] uppercase"
                />
                <textarea 
                  rows={4} 
                  placeholder="MESSAGE PROTOCOL" 
                  className="w-full bg-white border border-border p-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold tracking-widest text-[10px] uppercase resize-none"
                />
              </div>
              <Magnetic>
                <button className="w-full bg-black text-white py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-xs hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-4 group">
                  Initiate Transmission <Send className="w-4 h-4 group-hover:translate-x-2' transition-transform" />
                </button>
              </Magnetic>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

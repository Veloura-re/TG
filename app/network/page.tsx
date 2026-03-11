'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic } from '@/components/shared/animations'
import { GlobalMap, InteractiveGrid } from '@/components/shared/visuals'
import { NetworkPulse } from '@/components/shared/pulse'
import { Globe, Users, Zap, Shield, Laptop, Share2, MessageSquare, ArrowUpRight } from 'lucide-react'

export default function NetworkPage() {
  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      <InteractiveGrid />
      
      {/* Header */}
      <section className="section-padding pt-48 pb-24">
        <div className="max-w-6xl">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Global Network</span>
          </FadeIn>
          <h1 className="text-7xl md:text-[160px] font-bold tracking-tighter mb-12 leading-[0.8] text-black">
            <TextReveal text="STAY" className="mb-4" />
            <span className="italic-bold text-primary"><TextReveal text="CONNECTED." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-4xl">
            The central platform for the Turkish graduate community. Connect with peers, find local groups, and share your journey with thousands of alumni worldwide.
          </p>
        </div>
      </section>

      {/* Live Feed & Map Row */}
      <section className="mx-6 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
           <div className="lg:col-span-4 flex flex-col h-full">
              <NetworkPulse />
           </div>
           <div className="lg:col-span-8 flex flex-col">
              <GlobalMap />
           </div>
        </div>
      </section>

      {/* Network Tools */}
      <section className="section-padding pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {[
             { title: 'Member Chat', icon: MessageSquare, desc: 'Live messaging and discussion groups for all alumni members.' },
             { title: 'Library', icon: Share2, desc: 'Download documents, guides, and career resources from our network.' },
             { title: 'Online Groups', icon: Laptop, desc: 'Join digital meetups and interest-based alumni circles.' },
             { title: 'Profile Security', icon: Shield, desc: 'Your data is protected with the highest level of encryption.' },
           ].map((tool, i) => (
             <FadeIn key={i} delay={i * 0.1}>
                 <div className="p-10 border border-border rounded-[40px] hover:border-black transition-all group relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-150 transition-all duration-1000">
                       <tool.icon className="w-40 h-40 text-black" />
                    </div>
                    <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center border border-border group-hover:bg-primary group-hover:text-white transition-all duration-700 mb-8 shadow-xl">
                       <tool.icon className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold tracking-tighter mb-4">{tool.title}</h4>
                    <p className="text-muted font-medium text-base mb-8">{tool.desc}</p>
                    <Magnetic>
                       <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-black transition-colors">
                          Access Protocol <ArrowUpRight className="w-4 h-4" />
                       </button>
                    </Magnetic>
                 </div>
             </FadeIn>
           ))}
        </div>
      </section>

      {/* Join the Network CTA */}
      <section className="section-padding py-40 border-t border-zinc-100 bg-black text-white rounded-t-[100px] relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
         <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
            <h2 className="text-5xl md:text-9xl font-bold tracking-tighter italic-bold uppercase">JOIN THE <br/><span className="text-primary not-italic">NETWORK.</span></h2>
            <p className="text-xl md:text-3xl text-white/60 font-medium leading-relaxed">
              Are you a graduate of a TR program? Create your profile today and join our success-driven community.
            </p>
            <div className="flex flex-col sm:row justify-center gap-8 pt-8">
               <Magnetic>
                  <button className="bg-primary text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl uppercase">Sign Up Now</button>
               </Magnetic>
               <Magnetic>
                  <button className="border border-white/20 text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all uppercase">Help Center</button>
               </Magnetic>
            </div>
         </div>
      </section>
    </div>
  )
}

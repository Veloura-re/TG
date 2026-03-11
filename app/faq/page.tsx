'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, AnimatedSection, TextReveal, Magnetic } from '@/components/shared/animations'
import { ChevronDown, HelpCircle, Zap, Shield, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: "How do I initiate network authentication?",
    a: "Authentication requests are processed through the official portal. Graduates from recognized Turkish programs are eligible for Node Access after verification of their graduation credentials."
  },
  {
    q: "What protocols govern the scholarship programs?",
    a: "Our excellence scholarships are governed by the Merit Protocol 2026. Applicants must undergo a multi-stage intelligence review focusing on research impact and strategic alignment."
  },
  {
    q: "Can I host a local node summit?",
    a: "Yes. Strategic nodes can propose summits via the Operations Center. Approved summits receive full logistics and intelligence support from the core network."
  },
  {
    q: "Is the network connection secure?",
    a: "All network traffic is encrypted using global-standard security protocols. We maintain a zero-trust architecture for all graduate portals to ensure data integrity."
  },
  {
    q: "How are opportunities curated?",
    a: "The Access Board features high-value positions from our global partners. Each opportunity is vetted for quality and alignment with the excellence standards of our alumni."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40 pb-32">
        <div className="max-w-6xl mb-32">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Operations // Intelligence FAQ</span>
          </FadeIn>
          <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black italic">
            <TextReveal text="FREQUENT" className="mb-2" />
            <span className="text-primary"><TextReveal text="QUERIES." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-3xl">
            Protocol clarifications and network intelligence regarding the TR Graduates system.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div 
                className={cn(
                  "border border-border rounded-[32px] overflow-hidden transition-all duration-700",
                  openIndex === i ? "border-primary bg-zinc-50 shadow-2xl" : "bg-white hover:border-black shadow-sm"
                )}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-10 py-8 text-left flex items-center justify-between gap-8 group"
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700",
                      openIndex === i ? "bg-primary text-white" : "bg-zinc-100 text-black group-hover:bg-black group-hover:text-white"
                    )}>
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold tracking-tight">{faq.q}</span>
                  </div>
                  <ChevronDown className={cn("w-6 h-6 transition-transform duration-700", openIndex === i ? "rotate-180 text-primary" : "text-muted group-hover:text-black")} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-10 pb-10 pt-2 border-t border-zinc-100 ml-18 text-muted text-lg leading-relaxed font-medium max-w-2xl">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  )
}

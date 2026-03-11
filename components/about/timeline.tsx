'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Target, Globe } from 'lucide-react'

const MILESTONES = [
  { year: '2018', title: 'Network Genesis', desc: 'Initial protocol established for high-performance alumni tracking.', node: 'Alpha' },
  { year: '2020', title: 'Global Node Expansion', desc: 'Connectivity deployed across 15+ international hubs.', node: 'Beta' },
  { year: '2022', title: 'Excellence Tier-1', desc: 'Strategic grant funding exceeds \$2M for research nodes.', node: 'Gamma' },
  { year: '2024', title: 'Intelligence v2.0', desc: 'Deployment of real-time intelligence feeds and automated matching.', node: 'Delta' },
  { year: '2026', title: 'Sovereign Network', desc: 'Total sovereign talents exceed 15k active graduates.', node: 'Epsilon' },
]

export function Timeline() {
  return (
    <div className="relative py-20">
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-100 -translate-x-1/2 hidden md:block" />

      <div className="space-y-32 relative z-10">
        {MILESTONES.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`flex flex-col md:flex-row items-center gap-12 md:gap-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Year / Info Side */}
            <div className="flex-1 w-full md:px-20 text-center md:text-left">
              <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start'}`}>
                <span className="text-primary font-bold text-6xl md:text-8xl tracking-tighter mb-4 italic italic-bold">{item.year}</span>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{item.title}</h3>
                <p className="text-muted text-lg font-medium max-w-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>

            {/* Center Node */}
            <div className="relative z-20">
              <div className="w-16 h-16 bg-white border border-border rounded-2xl flex items-center justify-center shadow-xl group hover:border-primary transition-all duration-500">
                <div className="w-3 h-3 bg-black rounded-full group-hover:bg-primary transition-colors animate-pulse" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>

            {/* Label Side */}
            <div className="flex-1 w-full md:px-20 hidden md:block">
               <div className={`p-6 bg-zinc-50 border border-border rounded-3xl w-fit ${i % 2 === 0 ? '' : 'ml-auto'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted flex items-center gap-3">
                     <Shield className="w-3 h-3 text-primary" /> Phase {item.node} Deployment
                  </span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

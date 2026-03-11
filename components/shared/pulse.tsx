'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Cpu, Globe, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const PULSE_DATA = [
  { node: 'TR-ANK-001', activity: 'Intelligence Hash Generated', protocol: 'Alpha', time: 'LIVE' },
  { node: 'UK-LDN-012', activity: 'Node Synced with Core', protocol: 'Beta', time: '2s ago' },
  { node: 'JP-TKY-005', activity: 'Grant Protocol Deployed', protocol: 'Gamma', time: '5s ago' },
  { node: 'US-NYC-008', activity: 'Summit 2026 Packet Send', protocol: 'Delta', time: '12s ago' },
]

export function NetworkPulse() {
  const [items, setItems] = useState(PULSE_DATA)

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const next = [...prev]
        const last = next.pop()!
        return [last, ...next]
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black text-white p-8 md:p-12 rounded-[48px] border border-white/10 relative overflow-hidden group shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
              <Zap className="w-5 h-5 text-primary animate-pulse" />
           </div>
           <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Network Pulse</p>
              <p className="text-xs text-white/40 font-bold uppercase">Real-time Intelligence</p>
           </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
           <span className="text-[8px] font-bold uppercase text-green-500 tracking-widest font-mono">Synced</span>
        </div>
      </div>

      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div 
            key={item.node}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1 - i * 0.2, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between group/line border-b border-white/5 pb-6 last:border-0"
          >
            <div className="flex items-center gap-6">
               <span className="text-[10px] font-bold text-primary font-mono">{item.node}</span>
               <div className="h-4 w-[1px] bg-white/10" />
               <p className="text-sm font-medium tracking-tight text-white/80 group-hover/line:text-white transition-colors">{item.activity}</p>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">{item.protocol}</span>
               <span className="text-[10px] font-bold text-white/40 font-mono">{item.time}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-10 py-5 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-700 border border-white/10 hover:border-white">
        ACCESS CORE FEED
      </button>
    </div>
  )
}

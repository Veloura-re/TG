'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ReactNode, useRef, useEffect, useState } from 'react'

export function InteractiveGrid() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e4e4e7 1px, transparent 1px),
            linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`
          ),
          WebkitMaskImage: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`
          ),
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f4f4f5 1px, transparent 1px),
            linear-gradient(to bottom, #f4f4f5 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

export function GlobalMap() {
  const nodes = [
    { name: 'London Node', x: 45, y: 35, delay: 0 },
    { name: 'Ankara HQ', x: 55, y: 45, delay: 0.2, isHQ: true },
    { name: 'NY Node', x: 25, y: 40, delay: 0.4 },
    { name: 'Tokyo Node', x: 80, y: 45, delay: 0.6 },
    { name: 'Berlin Node', x: 48, y: 38, delay: 0.8 },
    { name: 'Dubai Node', x: 62, y: 55, delay: 1.0 },
  ]

  return (
    <div className="relative w-full aspect-[2/1] bg-white border border-border rounded-[60px] overflow-hidden group shadow-2xl">
      <div className="absolute inset-0 bg-[#fcfcfc] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      
      {/* Simplified World Map SVG Path (Abstract) */}
      <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full text-zinc-100 fill-current opacity-50 transition-colors duration-1000 group-hover:text-zinc-200">
        <path d="M15,20 Q25,15 35,25 T55,20 T75,25 T85,15 V45 Q75,50 65,40 T45,45 T25,40 T15,45 Z" />
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: node.delay, ease: "backOut" }}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="relative group/node">
             {/* Pulse Effect */}
             <div className={`absolute -inset-4 rounded-full ${node.isHQ ? 'bg-primary/20' : 'bg-black/10'} animate-ping duration-[3s]`} />
             
             {/* Main Point */}
             <div className={cn(
               "w-3 h-3 rounded-full border-2 border-white shadow-xl transition-all duration-500",
               node.isHQ ? "bg-primary w-5 h-5" : "bg-black hover:bg-primary"
             )} />

             {/* Label */}
             <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-2xl">
                   {node.name}
                </div>
             </div>
          </div>
        </motion.div>
      ))}

      {/* Lines (connecting HQ to nodes) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) => {
          if (node.isHQ) return null
          const hq = nodes.find(n => n.isHQ)!
          return (
            <motion.path
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.15 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: node.delay + 0.5, ease: "easeInOut" }}
              d={`M ${hq.x} ${hq.y} Q ${(hq.x + node.x) / 2} ${(hq.y + node.y) / 2 - 10} ${node.x} ${node.y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="1 1"
              pathLength="1"
            />
          )
        })}
      </svg>
    </div>
  )
}

import { cn } from '@/lib/utils'

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
import { usePathname } from 'next/navigation'

export function TurkishDecorativeElements() {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Top Right Crescent - Enhanced */}
      <motion.div 
        initial={{ opacity: 0, rotate: -20, x: 20 }}
        whileInView={{ opacity: 0.15, rotate: 0, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-10 -right-10 w-[500px] h-[500px] text-primary/40"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="drop-shadow-[0_0_50px_rgba(255,0,51,0.2)]">
          <path d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C34.8 90 22.5 77.7 22.5 62.5 C22.5 47.3 34.8 35 50 35 C55.5 35 60.6 36.6 64.9 39.4 C60.6 22.2 45 10 50 10 Z" />
        </svg>
      </motion.div>

      {/* Bottom Left Star - Enhanced */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, x: -20 }}
        whileInView={{ opacity: 0.12, scale: 1, x: 0 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        className="absolute -bottom-20 -left-20 w-[600px] h-[600px] text-primary/30"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="drop-shadow-[0_0_50px_rgba(255,0,51,0.2)]">
          <path d="M50 5 L61 35 L95 35 L68 55 L78 85 L50 65 L22 85 L32 55 L5 35 L39 35 Z" />
        </svg>
      </motion.div>

      {/* Flag Ribbon / Corner Accent */}
      <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden z-[60]">
        <div className="absolute top-0 left-0 w-[150%] h-[20px] bg-primary rotate-[-45deg] -translate-x-1/2 translate-y-4 shadow-lg flex items-center justify-center">
            <div className="flex items-center gap-1 scale-75">
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                <span className="text-[6px] text-white font-bold uppercase tracking-[0.3em]">Official</span>
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
            </div>
        </div>
      </div>

      {/* Subtle floating red glows - slightly more intense */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-primary/15 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/3 -left-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[180px] animate-pulse " style={{ animationDelay: '3s' }} />
    </div>
  )
}

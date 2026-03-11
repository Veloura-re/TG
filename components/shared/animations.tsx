'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ReactNode, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function AnimatedSection({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export function FadeIn({ children, delay = 0, className }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Futuristic Text Reveal */
export function TextReveal({ text, className }: { text: string, className?: string }) {
  const letters = text.split("")
  
  return (
    <div className={cn("overflow-hidden py-1", className)}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.8,
            delay: i * 0.02,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}

/* High-Impact Grid reveal */
export function RevealBox({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("relative overflow-hidden group", className)}>
      <motion.div
        initial={{ y: 0 }}
        whileInView={{ y: "-100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-primary z-10"
      />
      {children}
    </div>
  )
}

/* Magnetic Effect for Buttons */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const mouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current!.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position
  return (
    <motion.div
      ref={ref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

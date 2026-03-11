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

/* Scroll-triggered FadeIn — only appears when scrolled into view */
export function ScrollFadeIn({ children, delay = 0, className, direction = 'up' }: { children: ReactNode, delay?: number, className?: string, direction?: 'up' | 'down' | 'left' | 'right' }) {
  const directionMap = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 80, y: 0 },
    right: { x: -80, y: 0 },
  }
  const { x, y } = directionMap[direction]

  return (
    <motion.div
      initial={{ opacity: 0, x, y, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Staggered container — staggers children entrance */
export function StaggerContainer({ children, className, staggerDelay = 0.08 }: { children: ReactNode, className?: string, staggerDelay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
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

/* Counter animation for stats */
export function CountUp({ target, duration = 2, suffix = '', className }: { target: number, duration?: number, className?: string, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (hasAnimated || !ref.current) return
        setHasAnimated(true)
        let start = 0
        const end = target
        const step = end / (duration * 60)
        const animate = () => {
          start += step
          if (start >= end) {
            if (ref.current) ref.current.textContent = `${end}${suffix}`
            return
          }
          if (ref.current) ref.current.textContent = `${Math.floor(start)}${suffix}`
          requestAnimationFrame(animate)
        }
        animate()
      }}
    >
      0{suffix}
    </motion.span>
  )
}

/* Floating animation for decorative elements */
export function FloatingElement({ children, className, amplitude = 20, duration = 4 }: { children: ReactNode, className?: string, amplitude?: number, duration?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Parallax scroll effect */
export function ParallaxSection({ children, className, speed = 0.3 }: { children: ReactNode, className?: string, speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
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

/* Glowing pulse line — decorative divider */
export function GlowLine({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent", className)}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    />
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

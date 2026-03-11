'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Landmark, Search, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/shared/animations'

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news' },
  { name: 'Events', href: '/events' },
  { name: 'Programs', href: '/programs' },
  { name: 'Opportunities', href: '/opportunities' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { scrollY } = useScroll()
  
  const width = useTransform(scrollY, [0, 100], ['100%', '90%'])
  const top = useTransform(scrollY, [0, 100], ['0px', '24px'])
  const borderRadius = useTransform(scrollY, [0, 100], ['0px', '24px'])
  const border = useTransform(scrollY, [0, 100], ['none', '1px solid rgba(228, 228, 231, 1)'])
  const boxShadow = useTransform(scrollY, [0, 100], ['none', '0 20px 40px -20px rgba(0, 0, 0, 0.1)'])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        style={{ 
          width, 
          top, 
          borderRadius, 
          border,
          boxShadow,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}
        className="h-20 flex items-center justify-between px-8 md:px-12 pointer-events-auto transition-colors"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase">TR Graduates</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors relative group py-2"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          ))}
          
          <Magnetic>
            <button className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors shadow-xl active:scale-95">
              Portal
            </button>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 bg-zinc-100 rounded-xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            className="fixed inset-0 bg-white z-40 p-8 flex flex-col justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-5xl font-bold tracking-tighter hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full bg-black text-white py-6 rounded-3xl text-2xl font-bold uppercase tracking-widest">
              Admin Portal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { AnimatePresence } from 'framer-motion'

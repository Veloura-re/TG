'use client'

import React from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  Newspaper, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Files, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Landmark,
  Zap,
  Shield
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FadeIn, Magnetic } from '@/components/shared/animations'

const sidebarItems = [
  { name: 'Overview', href: '/admin', icon: BarChart3 },
  { name: 'News', href: '/admin/news', icon: Newspaper },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Programs', href: '/admin/programs', icon: GraduationCap },
  { name: 'Opportunities', href: '/admin/opportunities', icon: Briefcase },
  { name: 'Resources', href: '/admin/resources', icon: Files },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-border sticky top-0 h-screen flex flex-col p-8 z-30">
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-xl">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase italic">HQ Portal</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-4 px-4 flex items-center gap-2">
             <Zap className="w-3 h-3 text-primary animate-pulse" /> Mission Control
          </div>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all group",
                  isActive 
                    ? "bg-black text-white shadow-xl translate-x-1" 
                    : "text-muted hover:bg-zinc-100 hover:text-black"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted group-hover:text-black")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="pt-8 border-t border-zinc-100 space-y-4">
          <div className="p-6 bg-zinc-50 border border-border rounded-2xl flex items-center gap-4 group hover:border-primary transition-colors cursor-pointer">
             <div className="w-10 h-10 bg-white border border-border rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <Shield className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Operator 01</p>
                <p className="text-xs text-muted font-medium">Secured Node</p>
             </div>
          </div>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 transition-all">
            <LogOut className="w-5 h-5" />
            De-authenticate
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 bg-white relative overflow-hidden">
        {/* Futuristic Background Blur */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] z-0 pointer-events-none" />
        <div className="relative z-10">
          <FadeIn>
            {children}
          </FadeIn>
        </div>
      </main>
    </div>
  )
}

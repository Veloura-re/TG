'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FadeIn, ScrollFadeIn, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { User, Settings, LogOut, MessageSquare, Calendar, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase-browser'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    setProfile(profileData)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <InteractiveGrid />

      <div className="section-padding relative z-10">
        {/* Welcome Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-20">
            <div className="flex items-center gap-8">
              <motion.div 
                className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <User className="w-12 h-12 text-primary" />
              </motion.div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">
                  Welcome, <span className="text-primary italic">{profile?.full_name || 'Member'}.</span>
                </h1>
                <p className="text-muted font-bold text-xs uppercase tracking-widest mt-3">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors border-2 border-zinc-100 px-8 py-4 rounded-full hover:border-primary"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </FadeIn>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'My Comments', icon: MessageSquare, desc: 'Review and manage your discussions across the platform.', href: '#', color: 'bg-primary/10' },
            { title: 'Upcoming Events', icon: Calendar, desc: 'See events you are registered for and discover new ones.', href: '/events', color: 'bg-blue-50' },
            { title: 'Career Board', icon: Briefcase, desc: 'Browse the latest job opportunities posted by our network.', href: '/opportunities', color: 'bg-emerald-50' },
            { title: 'My Profile', icon: User, desc: 'Update your personal information and preferences.', href: '#', color: 'bg-amber-50' },
            { title: 'Resources', icon: Settings, desc: 'Access guides, templates, and professional resources.', href: '/resources', color: 'bg-purple-50' },
          ].map((card, i) => (
            <ScrollFadeIn key={i} delay={i * 0.08}>
              <Link href={card.href} className="block">
                <div className="group bg-white border-2 border-zinc-100 p-6 md:p-10 rounded-[40px] hover:border-primary transition-all duration-500 hover:shadow-2xl h-full">
                  <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors uppercase">{card.title}</h3>
                  <p className="text-muted font-medium leading-relaxed">{card.desc}</p>
                </div>
              </Link>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FadeIn, ScrollFadeIn, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { 
  User, 
  Settings, 
  LogOut, 
  MessageSquare, 
  Calendar, 
  Briefcase,
  Globe,
  Shield,
  Newspaper,
  BookOpen,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase-browser'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
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

      // Check admin status with fail-safe
      const { data: adminData } = await supabase
        .from('admins')
        .select('role')
        .eq('id', user.id)
      
      const isSystemAdmin = !!adminData?.length || 
                           user.email === 'admin@turkishgraduates.org' || 
                           profileData?.full_name?.toLowerCase().includes('admin')

      setIsAdmin(isSystemAdmin)
    } catch (error) {
      console.error('Error in fetchUser:', error)
    } finally {
      setLoading(false)
    }
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

  const standardCards = [
    { title: 'My Account', icon: User, desc: 'Update your profile and manage account security.', href: '/dashboard/settings', color: 'bg-primary/10', dark: false },
    { title: 'Communication Hub', icon: Globe, desc: 'Connect with other global graduates in real-time.', href: '/dashboard/chat', color: 'bg-zinc-100', dark: false },
    { title: 'Upcoming Events', icon: Calendar, desc: 'See events you are registered for and discover new ones.', href: '/events', color: 'bg-blue-50', dark: false },
    { title: 'Career Board', icon: Briefcase, desc: 'Browse the latest job opportunities posted by our network.', href: '/opportunities', color: 'bg-emerald-50', dark: false },
    { title: 'Resources', icon: Settings, desc: 'Access guides, templates, and professional resources.', href: '/resources', color: 'bg-purple-50', dark: false },
  ]

  const adminCards = [
    { title: 'Command Center', icon: Shield, desc: 'Access global analytics and system protocols.', href: '/admin', color: 'bg-primary ring-4 ring-primary/20', dark: true },
    { title: 'Knowledge Archive', icon: Newspaper, desc: 'Publish news and intelligence feeds.', href: '/admin/news/new', color: 'bg-black text-white', dark: true },
    { title: 'Manuscript Vault', icon: BookOpen, desc: 'Archive new books and research papers.', href: '/admin/library/new', color: 'bg-zinc-900 text-white', dark: true },
  ]

  const displayCards = isAdmin ? [...adminCards, ...standardCards] : standardCards

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <InteractiveGrid />

      <div className="section-padding relative z-10">
        {/* Welcome Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-20">
            <div className="flex items-center gap-8">
              <motion.div 
                className={`w-24 h-24 ${isAdmin ? 'bg-primary' : 'bg-primary/10'} rounded-[32px] flex items-center justify-center shadow-2xl`}
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                {isAdmin ? <Shield className="w-12 h-12 text-white" /> : <User className="w-12 h-12 text-primary" />}
              </motion.div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                  Welcome, <br/><span className="text-primary italic">{profile?.full_name || 'Member'}.</span>
                </h1>
                <div className="flex items-center gap-3 mt-4">
                  <p className="text-muted font-bold text-xs uppercase tracking-widest">{user?.email}</p>
                  {isAdmin && <span className="bg-primary text-white text-[8px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">System Auth Level 01</span>}
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors border-2 border-zinc-100 px-8 py-4 rounded-3xl hover:border-primary"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </FadeIn>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCards.map((card, i) => (
            <ScrollFadeIn key={i} delay={i * 0.08}>
              <Link href={card.href} className="block group h-full">
                <div className={`bg-white border-2 border-zinc-100 p-8 md:p-12 rounded-[50px] transition-all duration-500 hover:shadow-2xl h-full flex flex-col justify-between ${isAdmin && i < 3 ? 'hover:border-primary border-primary/20' : 'hover:border-primary'}`}>
                  <div>
                    <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                      <card.icon className={`w-8 h-8 ${card.dark ? 'text-white' : 'text-primary'}`} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors uppercase tracking-tight italic">{card.title}.</h3>
                    <p className="text-muted font-medium leading-relaxed mb-8">{card.desc}</p>
                  </div>
                  <div className="flex items-center gap-3 text-primary font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                    Initialize Protocol <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}

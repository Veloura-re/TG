'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn, AnimatedSection, Magnetic } from '@/components/shared/animations'
import { 
  Users, 
  Newspaper, 
  Calendar, 
  TrendingUp, 
  Zap, 
  Shield, 
  Globe,
  Plus,
  Briefcase,
  BookOpen,
  ArrowRight,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase-browser'

// Simple SVG Line Chart for User Growth
function UserGrowthChart({ data }: { data: { date: string, count: number }[] }) {
  if (data.length === 0) return (
    <div className="h-48 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-3xl">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Awaiting Data Streams...</p>
    </div>
  )

  const max = Math.max(...data.map(d => d.count))
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d.count / max) * 100}`).join(' ')

  return (
    <div className="relative h-48 w-full group">
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF0033" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF0033" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M 0 100 L ${points} L 100 100 Z`}
          fill="url(#gradient)"
          className="transition-all duration-1000"
        />
        <motion.polyline
          fill="none"
          stroke="#FF0033"
          strokeWidth="2"
          points={points}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {data.map((d, i) => (
          <circle
            key={i}
            cx={(i / (data.length - 1)) * 100}
            cy={100 - (d.count / max) * 100}
            r="1"
            className="fill-primary group-hover:r-2 transition-all"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex justify-between pointer-events-none mt-4">
        {data.map((d, i) => (
          <span key={i} className="text-[8px] font-bold text-muted rotate-45 h-fit">{d.date}</span>
        ))}
      </div>
    </div>
  )
}

// SVG Bar Chart for Network Traffic (Crowd)
function NetworkTrafficChart({ data }: { data: { hour: string, value: number }[] }) {
  if (data.length === 0) return (
    <div className="h-48 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-3xl">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Scanning Network Traffic...</p>
    </div>
  )

  const max = Math.max(...data.map(d => d.value))
  
  return (
    <div className="relative h-48 w-full flex items-end justify-between gap-1 group">
      {data.map((d, i) => (
        <motion.div
           key={i}
           initial={{ height: 0 }}
           animate={{ height: `${(d.value / max) * 100}%` }}
           transition={{ delay: i * 0.05, duration: 1, ease: "easeOut" }}
           className="flex-1 bg-zinc-100 rounded-t-lg hover:bg-black transition-colors relative group/bar"
        >
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
              {d.value}
           </div>
        </motion.div>
      ))}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-between pointer-events-none">
        {data.filter((_, i) => i % 4 === 0).map((d, i) => (
          <span key={i} className="text-[8px] font-bold text-muted uppercase tracking-widest">{d.hour}</span>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([
    { name: 'Intelligence Feed', value: '...', change: '+0%', icon: Newspaper },
    { name: 'Global Summits', value: '...', change: '+0%', icon: Calendar },
    { name: 'Program Protocols', value: '...', change: '+0%', icon: Zap },
    { name: 'Active Talent', value: '...', change: '+0%', icon: Users },
  ])
  const [userGrowth, setUserGrowth] = useState<{ date: string, count: number }[]>([])
  const [trafficData, setTrafficData] = useState<{ hour: string, value: number }[]>([])
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      const supabase = createClient()
      
      try {
        setLoading(true)
        // Fetch counts for entities
        const [
          { count: newsCount },
          { count: eventsCount },
          { count: programsCount },
          { data: profiles, count: profileCount }
        ] = await Promise.all([
          supabase.from('news').select('*', { count: 'exact', head: true }),
          supabase.from('events').select('*', { count: 'exact', head: true }),
          supabase.from('programs').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5)
        ])

        setStats([
          { name: 'Intelligence Feed', value: (newsCount || 0).toString(), change: 'Live', icon: Newspaper },
          { name: 'Global Summits', value: (eventsCount || 0).toString(), change: 'Scheduled', icon: Calendar },
          { name: 'Program Protocols', value: (programsCount || 0).toString(), change: 'Active', icon: Zap },
          { name: 'Active Talent', value: (profileCount || 0).toString(), change: '+Growth', icon: Users },
        ])

        setRecentUsers(profiles || [])

        // Mock growth data
        const growthMock = [
          { date: 'MON', count: 120 },
          { date: 'TUE', count: 145 },
          { date: 'WED', count: 132 },
          { date: 'THU', count: 168 },
          { date: 'FRI', count: 184 },
          { date: 'SAT', count: 195 },
          { date: 'SUN', count: 210 },
        ]
        setUserGrowth(growthMock)

        // Mock Traffic/Crowd data
        const trafficMock = Array.from({ length: 24 }, (_, i) => ({
           hour: `${i}h`,
           value: Math.floor(Math.random() * 500) + 100
        }))
        setTrafficData(trafficMock)

      } catch (err) {
        console.error('Error fetching dashboard stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-16 pb-24 text-black">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
         <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-[0.4em]">
               <Shield className="w-4 h-4 animate-pulse" /> Secure Operations Center
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter italic leading-none">COMMAND<br/><span className="text-primary not-italic">CENTER.</span></h1>
         </div>
         <div className="flex flex-wrap gap-4">
            <Magnetic>
               <Link href="/admin/news/new">
                  <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-primary transition-all shadow-2xl active:scale-95">
                     <Plus className="w-5 h-5" /> Deploy Intelligence
                  </button>
               </Link>
            </Magnetic>
            <Magnetic>
               <Link href="/admin/events/new">
                  <button className="bg-zinc-100 text-black border border-border px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-black hover:text-white transition-all active:scale-95">
                     <Calendar className="w-5 h-5" /> Deploy Summit
                  </button>
               </Link>
            </Magnetic>
            <Magnetic>
               <Link href="/admin/programs/new">
                  <button className="bg-zinc-100 text-black border border-border px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-black hover:text-white transition-all active:scale-95">
                     <Zap className="w-5 h-5" /> Deploy Pathway
                  </button>
               </Link>
            </Magnetic>
            <Magnetic>
               <Link href="/admin/opportunities/new">
                  <button className="bg-zinc-100 text-black border border-border px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-black hover:text-white transition-all active:scale-95">
                     <Briefcase className="w-5 h-5" /> Deploy Initiative
                  </button>
               </Link>
            </Magnetic>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Protocol (Graph Section) */}
        <FadeIn>
          <div className="bg-white border border-border p-8 md:p-12 rounded-[50px] shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col justify-between">
             <div className="flex items-center justify-between mb-12">
                <div>
                   <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> User Growth Protocol
                   </p>
                   <h2 className="text-3xl font-bold tracking-tight uppercase italic">Registration <span className="text-muted not-italic opacity-40">Trajectory</span></h2>
                </div>
                <div className="text-right">
                   <p className="text-4xl font-bold tracking-tighter">+{stats[3].value}</p>
                   <p className="text-[8px] font-bold text-green-600 uppercase tracking-widest">Total Personnel</p>
                </div>
             </div>
             <UserGrowthChart data={userGrowth} />
          </div>
        </FadeIn>

        {/* Crowd Activity / Network Traffic Section */}
        <FadeIn delay={0.1}>
          <div className="bg-white border border-border p-8 md:p-12 rounded-[50px] shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col justify-between min-h-[400px]">
             <div className="flex items-center justify-between mb-12">
                <div>
                   <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Network Crowd Protocol
                   </p>
                   <h2 className="text-3xl font-bold tracking-tight uppercase italic">Live <span className="text-muted not-italic opacity-40">Activity Map</span></h2>
                </div>
                <div className="text-right">
                   <p className="text-4xl font-bold tracking-tighter">1,280</p>
                   <p className="text-[8px] font-bold text-primary uppercase tracking-widest animate-pulse">Live Nodes Detected</p>
                </div>
             </div>
             <NetworkTrafficChart data={trafficData} />
          </div>
        </FadeIn>
        
        {/* Intelligence Distribution Chart */}
        <FadeIn delay={0.2}>
          <div className="bg-white border border-border p-8 md:p-12 rounded-[50px] shadow-sm hover:shadow-2xl transition-all duration-700 h-full flex flex-col justify-between">
             <div className="flex items-center justify-between mb-12">
                <div>
                   <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Intelligence Distribution
                   </p>
                   <h2 className="text-3xl font-bold tracking-tight uppercase italic">Global <span className="text-muted not-italic opacity-40">Feed Ratio</span></h2>
                </div>
                <div className="text-right">
                   <p className="text-4xl font-bold tracking-tighter">84%</p>
                   <p className="text-[8px] font-bold text-blue-600 uppercase tracking-widest">Efficiency Rating</p>
                </div>
             </div>
             <div className="flex items-end justify-between gap-4 h-48">
                {[
                  { label: 'News', val: 75, color: 'bg-primary' },
                  { label: 'Events', val: 45, color: 'bg-zinc-800' },
                  { label: 'Pathways', val: 90, color: 'bg-primary/40' },
                  { label: 'Assets', val: 60, color: 'bg-black' }
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4">
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${item.val}%` }}
                      className={`w-full rounded-2xl ${item.color} relative group`}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.val}%
                      </div>
                    </motion.div>
                    <span className="text-[8px] font-bold text-muted uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </FadeIn>

        {/* User Intelligence Protocol (Table Section) */}
        <FadeIn delay={0.2}>
          <div className="bg-white border border-border p-8 md:p-12 rounded-[50px] shadow-sm hover:shadow-2xl transition-all duration-700 h-full">
             <div className="flex items-center justify-between mb-12">
                <div>
                   <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Personnel Log
                   </p>
                   <h2 className="text-3xl font-bold tracking-tight uppercase italic">Recent <span className="text-muted not-italic opacity-40">Signals</span></h2>
                </div>
                <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-primary transition-all">Export Roster</Link>
             </div>
             <div className="space-y-4">
                {recentUsers.length > 0 ? recentUsers.map((user, idx) => (
                   <div key={user.id || idx} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-transparent hover:border-primary transition-all group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white border border-border rounded-xl flex items-center justify-center font-bold text-xs group-hover:bg-black group-hover:text-white transition-all uppercase">
                            {user.full_name?.charAt(0) || 'U'}
                         </div>
                         <div>
                            <p className="font-bold text-sm tracking-tight">{user.full_name || 'Anonymous Node'}</p>
                            <p className="text-[10px] font-medium text-muted">{user.email || 'Encrypted'}</p>
                         </div>
                      </div>
                      <div className="text-[8px] font-bold uppercase tracking-widest text-muted">
                         Active
                      </div>
                   </div>
                )) : (
                   <div className="h-48 flex items-center justify-center border-2 border-dashed border-zinc-100 rounded-3xl">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Awaiting incoming signals...</p>
                   </div>
                )}
             </div>
          </div>
        </FadeIn>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <FadeIn key={stat.name} delay={i * 0.1}>
            <div className="bg-zinc-50 border border-border p-6 md:p-10 rounded-[40px] hover:border-primary hover:shadow-2xl transition-all duration-700 group cursor-default shadow-sm h-full">
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 bg-white border border-border rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-sm">
                  <stat.icon className="w-7 h-7" />
                 </div>
                 <div className="flex items-center gap-1 text-green-600 font-bold text-[10px] tracking-widest uppercase bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    {stat.change}
                 </div>
              </div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-2">{stat.name}</p>
              <h3 className="text-4xl font-bold tracking-tighter group-hover:text-primary transition-colors">{stat.value}</h3>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:p-12 pt-8">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <h2 className="text-2xl font-bold tracking-tight italic uppercase tracking-[0.1em]">Recent System <span className="text-primary not-italic">Logs</span></h2>
            <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary flex items-center gap-2">Live Trace <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-4">
            {[
              { text: 'Auth Protocol 01: Deployment Successful', time: '2 minutes ago', type: 'System' },
              { text: 'Visual Asset Protocol: Gallery sync complete', time: '1 hour ago', type: 'Gallery' },
              { text: 'Admin Tier Elevation: Super Admin Logged In', time: 'Just Now', type: 'Security' },
            ].map((activity, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.05}>
                <div className="flex items-center justify-between p-8 bg-white border border-border rounded-[32px] hover:border-primary transition-all group shadow-sm hover:shadow-xl duration-700">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                       <div className="w-12 h-12 bg-zinc-50 border border-border rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                         <Zap className="w-5 h-5" />
                       </div>
                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse border-2 border-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg tracking-tight group-hover:text-black transition-colors">{activity.text}</p>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">{activity.time}</p>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-zinc-50 border border-border rounded-full text-[9px] font-bold uppercase tracking-widest group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                    {activity.type}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="space-y-8">
           <h2 className="text-2xl font-bold tracking-tight italic uppercase tracking-[0.1em]">Network <span className="text-primary not-italic">Health</span></h2>
           <div className="p-6 md:p-10 bg-black text-white rounded-[40px] relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <Shield className="w-10 h-10 text-primary animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse">Node Sync: 100%</span>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest opacity-60">
                          <span>Bandwidth</span>
                          <span>Stable</span>
                       </div>
                       <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest opacity-60">
                          <span>Security Tier</span>
                          <span>Maximum</span>
                       </div>
                       <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-primary" />
                       </div>
                    </div>
                 </div>
                 <button className="w-full py-5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                    Run Diagnostics
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}


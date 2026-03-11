'use client'

import { motion } from 'framer-motion'
import { FadeIn, AnimatedSection, Magnetic } from '@/components/shared/animations'
import { 
  Users, 
  Newspaper, 
  Calendar, 
  ArrowUpRight, 
  TrendingUp, 
  Zap, 
  Shield, 
  Globe,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const stats = [
    { name: 'Active Nodes', value: '15,240', change: '+12%', icon: Users },
    { name: 'Intelligence Feed', value: '842', change: '+5%', icon: Newspaper },
    { name: 'Global Summits', value: '124', change: '+2', icon: Calendar },
    { name: 'Protocol Reach', value: '2.4M', change: '+18%', icon: Globe },
  ]

  return (
    <div className="space-y-16 pb-24">
      <header className="flex items-center justify-between">
         <div>
            <div className="flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4">
               <Shield className="w-4 h-4 animate-pulse" /> Secure Operations Dashboard
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter italic">COMMAND<br/><span className="text-primary not-italic">CENTER.</span></h1>
         </div>
         <div className="flex gap-4">
            <Magnetic>
               <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-primary transition-all shadow-2xl active:scale-95">
                  <Plus className="w-4 h-4" /> Deploy News
               </button>
            </Magnetic>
         </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <FadeIn key={stat.name} delay={i * 0.1}>
            <div className="bg-zinc-50 border border-border p-10 rounded-[40px] hover:border-primary hover:shadow-2xl transition-all duration-700 group cursor-default shadow-sm">
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 bg-white border border-border rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-sm">
                  <stat.icon className="w-7 h-7" />
                 </div>
                 <div className="flex items-center gap-1 text-green-600 font-bold text-[10px] tracking-widest uppercase bg-green-50 px-3 py-1 rounded-full border border-green-100">
                   <TrendingUp className="w-3 h-3" /> {stat.change}
                 </div>
              </div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-2">{stat.name}</p>
              <h3 className="text-4xl font-bold tracking-tighter group-hover:text-primary transition-colors">{stat.value}</h3>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <h2 className="text-2xl font-bold tracking-tight italic uppercase tracking-[0.1em]">Recent Log <span className="text-primary not-italic">Activity</span></h2>
            <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary">View All Node Logs</Link>
          </div>
          <div className="space-y-4">
            {[
              { text: 'Global Intelligence Feed updated via Node TR-01', time: '2 minutes ago', type: 'News' },
              { text: 'New Alumni Summit: London Protocol initiated', time: '1 hour ago', type: 'Event' },
              { text: 'Scholarship Protocol Alpha Phase deployed', time: '3 hours ago', type: 'Program' },
              { text: 'Access Board: 12 new high-value opportunities added', time: '5 hours ago', type: 'Opportunities' },
            ].map((activity, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.05}>
                <div className="flex items-center justify-between p-8 bg-white border border-border rounded-[32px] hover:border-primary transition-all group shadow-sm hover:shadow-xl duration-700">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                       <div className="w-12 h-12 bg-zinc-50 border border-border rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
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
           <div className="p-10 bg-black text-white rounded-[40px] relative overflow-hidden group shadow-2xl">
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
                          <span>Security Ops</span>
                          <span>Active</span>
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

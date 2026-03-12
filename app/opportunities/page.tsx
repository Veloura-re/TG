'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic } from '@/components/shared/animations'
import { Briefcase, Building, ExternalLink, ArrowUpRight, Zap, Target, Globe, Loader2, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase-browser'

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchOpportunities()
  }, [])

  async function fetchOpportunities() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('published', true)
        .order('id', { ascending: false })

      if (error) throw error
      setOpportunities(data || [])

      // Check admin status
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: admin } = await supabase
          .from('admins')
          .select('role')
          .eq('id', user.id)
          .single()
        setIsAdmin(!!admin)
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error)
    } finally {
      setLoading(false)
    }
  }

  // Helper to get node number (mocked from ID)
  const getNodeNumber = (id: string | number) => {
    const num = typeof id === 'number' ? id : (id.toString().charCodeAt(0) % 99) + 1
    return `Node ${num.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <div className="max-w-6xl mb-32">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Operations // Access Board</span>
          </FadeIn>
          <h1 className="text-4xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black italic">
            <TextReveal text="STRATEGIC" className="mb-2" />
            <span className="text-primary"><TextReveal text="ACCESS." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-3xl">
            Direct gateways to high-value positions and research opportunities curated exclusively for Turkish program graduates.
          </p>
          
          {isAdmin && (
            <div className="mt-12">
              <Magnetic>
                <Link href="/admin/opportunities/new" className="group bg-black text-white px-10 py-6 rounded-3xl font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-4 hover:bg-primary transition-all shadow-2xl active:scale-95 border border-white/10 w-fit">
                  <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                    <Plus className="w-5 h-5" />
                  </div>
                  Deploy Initiative
                </Link>
              </Magnetic>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted">Acessing Access Board...</span>
          </div>
        ) : opportunities.length > 0 ? (
          <div className="space-y-6">
            {opportunities.map((opt, i) => (
              <FadeIn key={opt.id} delay={i * 0.1}>
                <Link href={opt.link?.startsWith('http') ? opt.link : `/opportunities/${opt.id}`}>
                <div className="group bg-white border border-border rounded-[40px] p-6 md:p-14 hover:border-primary hover:shadow-2xl transition-all duration-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-150 group-hover:text-primary transition-all duration-1000">
                    <Briefcase className="w-32 h-32 md:w-60 md:h-60" />
                  </div>
                  
                  <div className="flex-1 space-y-8 relative z-10 w-full">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-zinc-50 border border-border rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl flex-shrink-0">
                        <Target className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-primary font-bold text-[10px] tracking-widest uppercase mb-2">
                          <span className="px-3 py-1 bg-primary/10 rounded-full">{opt.type} Protocol</span>
                          <span>{getNodeNumber(opt.id)}</span>
                          {opt.deadline && (
                            <span className="text-zinc-400">Deadline: {new Date(opt.deadline).toLocaleDateString()}</span>
                          )}
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold tracking-tighter group-hover:text-black transition-colors">{opt.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 text-muted font-medium text-lg pt-4 border-t border-zinc-50">
                      <div className="flex items-center gap-4 group-hover:text-black transition-colors">
                        <Building className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" /> {opt.organization}
                      </div>
                      <div className="flex items-center gap-4 group-hover:text-black transition-colors text-zinc-400">
                        <Globe className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" /> {opt.location}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <Magnetic>
                      <button className="bg-black text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl group-hover:bg-primary transition-all flex items-center gap-3 group-active:scale-95 whitespace-nowrap">
                        View Details <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <h3 className="text-2xl font-bold text-muted uppercase tracking-widest">No Opportunities Found</h3>
            <p className="text-muted mt-4">New high-value positions added weekly.</p>
          </div>
        )}
      </section>
    </div>
  )
}


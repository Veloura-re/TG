'use client'

import React, { useState, useEffect } from 'react'
import { FadeIn, AnimatedSection, TextReveal, Magnetic, ScrollFadeIn, StaggerContainer, StaggerItem, GlowLine } from '@/components/shared/animations'
import { GraduationCap, Award, Globe, Zap, ArrowRight, Shield, Cpu, ChevronDown, CheckCircle2, Loader2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Comments } from '@/components/shared/comments'
import Link from 'next/link'
import { createClient } from '@/utils/supabase-browser'

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [expandedId, setExpandedId] = useState<number | string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchPrograms()
  }, [])

  async function fetchPrograms() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('published', true)

      if (error) throw error
      setPrograms(data || [])

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
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <div className="max-w-6xl mb-32">
          <FadeIn>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block font-mono">Available Programs</span>
          </FadeIn>
          <h1 className="text-4xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black">
            <TextReveal text="CAREER" className="mb-2" />
            <span className="text-primary italic"><TextReveal text="PATHWAYS." /></span>
          </h1>
          <p className="text-2xl text-muted leading-relaxed font-medium max-w-3xl">
            Professional development and career support for our global community of graduates.
          </p>
          
          {isAdmin && (
            <div className="mt-12">
              <Magnetic>
                <Link href="/admin/programs/new" className="group bg-black text-white px-10 py-6 rounded-3xl font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-4 hover:bg-primary transition-all shadow-2xl active:scale-95 border border-white/10 w-fit">
                  <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                    <Plus className="w-5 h-5" />
                  </div>
                  Deploy Pathway
                </Link>
              </Magnetic>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted">Scanning Pathways...</span>
          </div>
        ) : programs.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-10">
            {programs.map((prog) => (
              <StaggerItem key={prog.id}>
                <Link href={`/programs/${prog.id}`}>
                <div className="group bg-white border border-border rounded-[60px] overflow-hidden hover:border-primary hover:shadow-2xl transition-all duration-700 flex flex-col h-full shadow-sm">
                  <div className="aspect-[16/11] bg-zinc-100 relative overflow-hidden">
                    {prog.image_url ? (
                      <img src={prog.image_url} alt={prog.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    ) : (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-primary/10 transition-colors duration-700" />
                    )}
                    <div className="absolute top-8 left-8">
                      <div className="w-16 h-16 bg-white border border-border rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl">
                        <Cpu className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 p-8">
                       <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45 duration-700">
                          <ArrowRight className="w-6 h-6" />
                       </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-12 flex-1 flex flex-col space-y-10">
                    <div className="space-y-6">
                      <h3 className="text-4xl font-bold tracking-tighter leading-none group-hover:text-primary transition-colors">{prog.name}</h3>
                      <p className="text-muted leading-relaxed font-medium text-lg line-clamp-3">{prog.description}</p>
                    </div>

                    <div className="pt-10 border-t border-zinc-50 space-y-4 font-bold text-[10px] tracking-widest uppercase mt-auto">
                      <div className="flex justify-between items-center group-hover:text-black transition-colors">
                        <span className="text-muted flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Eligibility</span>
                        <span className="max-w-[70%] text-right">{prog.eligibility}</span>
                      </div>
                      <div className="flex justify-between items-center group-hover:text-black transition-colors">
                        <span className="text-primary flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> Deadline</span>
                        <span>{prog.deadline ? new Date(prog.deadline).toLocaleDateString() : 'Rolling'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-40">
            <h3 className="text-2xl font-bold text-muted uppercase tracking-widest">No Programs Found</h3>
          </div>
        )}
      </section>

      {/* Comments */}
      <section className="section-padding py-20">
        <GlowLine className="mb-16" />
        <ScrollFadeIn>
          <Comments targetType="programs" targetId="programs-page" />
        </ScrollFadeIn>
      </section>
    </div>
  )
}


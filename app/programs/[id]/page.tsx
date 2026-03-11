'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FadeIn, ScrollFadeIn, GlowLine, StaggerContainer, StaggerItem, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Comments } from '@/components/shared/comments'
import { ArrowLeft, CheckCircle2, Shield, Zap, Calendar, Users, Award, ArrowRight } from 'lucide-react'

const PROGRAMS_DATA: Record<string, {
  name: string; description: string; eligibility: string; deadline: string;
  overview: string[]; curriculum: string[]; benefits: string[]
}> = {
  '1': {
    name: 'Excellence Scholarships',
    description: 'Special funding for academic research in technology and sustainable energy.',
    eligibility: 'GPA 3.8+ / Research Proposal',
    deadline: 'Sep 30, 2026',
    overview: [
      'The Excellence Scholarships program provides up to €25,000 in funding for outstanding graduates pursuing cutting-edge research in technology and sustainable energy.',
      'Recipients are selected based on academic merit, the quality of their research proposal, and the potential impact of their work on society.',
      'The program includes access to a network of mentors, research facilities, and annual conferences where scholars present their findings.',
    ],
    curriculum: ['Advanced Technology Algorithms', 'Artificial Intelligence Design', 'Professional Ethics', 'Global Research Network'],
    benefits: ['Up to €25,000 in research funding', 'Access to partner university labs', 'Annual conference participation', 'Publication support and mentoring', '1-year alumni network premium access'],
  },
  '2': {
    name: 'Leadership Training',
    description: 'Strategic management and communication training for our global members.',
    eligibility: '3+ Years Professional Experience',
    deadline: 'Oct 15, 2026',
    overview: [
      'Our Leadership Training program is designed for mid-career professionals who want to advance into senior management and executive roles.',
      'The program combines intensive workshops with real-world case studies from leading global organizations.',
      'Participants work in diverse teams, building cross-cultural leadership skills that are essential in today\'s globalized business environment.',
    ],
    curriculum: ['Strategic Negotiation', 'Global Communication', 'Community Leadership', 'Professional Etiquette'],
    benefits: ['Executive coaching sessions', 'Global leadership certificate', 'Access to C-suite networking events', 'Case study publications', 'Career advancement support'],
  },
  '3': {
    name: 'Global Exchange Program',
    description: 'Placement in international organizations and professional research labs.',
    eligibility: 'Current Program Graduate Only',
    deadline: 'Jan 10, 2027',
    overview: [
      'The Global Exchange Program offers fully-funded placements at international organizations, research labs, and leading companies worldwide.',
      'Participants spend 3-6 months at a host institution, gaining hands-on experience and building professional relationships that last a lifetime.',
      'Past placements include CERN, the World Bank, Google DeepMind, and various European and Asian research institutions.',
    ],
    curriculum: ['Global Work Culture', 'Professional Standards', 'Alumni Networking', 'Career Placement'],
    benefits: ['Fully-funded international placement', 'Round-trip travel and accommodation', 'Monthly living stipend', 'Professional certification', 'Post-placement career support'],
  },
}

export default function ProgramDetailPage() {
  const params = useParams()
  const id = params.id as string
  const program = PROGRAMS_DATA[id]

  if (!program) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">404</h1>
          <p className="text-muted text-xl">Program not found.</p>
          <Link href="/programs" className="text-primary font-bold hover:underline">← Back to Programs</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <InteractiveGrid />
      <div className="section-padding relative z-10">
        <FadeIn>
          <Link href="/programs" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors mb-16">
            <ArrowLeft className="w-4 h-4" /> Back to Programs
          </Link>
        </FadeIn>

        {/* Hero */}
        <FadeIn className="max-w-4xl mb-20">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 inline-block">Program Details</span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-black uppercase mb-8">{program.name}</h1>
          <p className="text-2xl text-muted leading-relaxed font-medium">{program.description}</p>
        </FadeIn>

        {/* Key Info Bar */}
        <ScrollFadeIn className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, label: 'Eligibility', value: program.eligibility },
              { icon: Calendar, label: 'Deadline', value: program.deadline },
              { icon: Users, label: 'Cohort Size', value: '25 Participants' },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-50 border border-zinc-100 p-8 rounded-[30px] flex items-center gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{item.label}</p>
                  <p className="font-bold text-lg">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollFadeIn>

        {/* Overview */}
        <div className="max-w-4xl mb-20 space-y-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold uppercase mb-8">Program <span className="text-primary">Overview</span></h2>
          </ScrollFadeIn>
          {program.overview.map((para, i) => (
            <ScrollFadeIn key={i} delay={i * 0.05}>
              <p className="text-xl text-muted leading-relaxed font-medium">{para}</p>
            </ScrollFadeIn>
          ))}
        </div>

        {/* Curriculum & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:p-12 mb-20">
          <ScrollFadeIn direction="left">
            <div className="bg-zinc-50 border border-zinc-100 p-6 md:p-12 rounded-[40px]">
              <h3 className="text-2xl font-bold uppercase mb-8">Curriculum</h3>
              <div className="space-y-5">
                {program.curriculum.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-medium text-muted">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </ScrollFadeIn>
          <ScrollFadeIn direction="right" delay={0.1}>
            <div className="bg-black text-white p-6 md:p-12 rounded-[40px]">
              <h3 className="text-2xl font-bold uppercase mb-8">Benefits</h3>
              <div className="space-y-5">
                {program.benefits.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-medium text-white/70">
                    <Award className="w-5 h-5 text-primary flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </ScrollFadeIn>
        </div>

        {/* CTA */}
        <ScrollFadeIn className="mb-32">
          <div className="bg-primary text-white p-6 md:p-16 md:p-6 md:p-20 rounded-[50px] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.15),transparent_50%)]" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 relative z-10">Ready to Apply?</h2>
            <p className="text-xl text-white/80 mb-12 relative z-10 max-w-2xl mx-auto">Applications are reviewed on a rolling basis. Start your journey today.</p>
            <Magnetic>
              <button className="bg-black text-white px-14 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl flex items-center gap-3 mx-auto relative z-10">
                Apply Now <ArrowRight className="w-5 h-5" />
              </button>
            </Magnetic>
          </div>
        </ScrollFadeIn>

        {/* Comments */}
        <GlowLine className="mb-16" />
        <ScrollFadeIn>
          <Comments targetType="programs" targetId={`program-${id}`} />
        </ScrollFadeIn>
      </div>
    </div>
  )
}

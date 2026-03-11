'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FadeIn, ScrollFadeIn, GlowLine, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Comments } from '@/components/shared/comments'
import { ArrowLeft, Building, Globe, Briefcase, Clock, ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react'

const OPPORTUNITIES_DATA: Record<string, {
  title: string; org: string; type: string; location: string;
  description: string[]; requirements: string[]; perks: string[]
}> = {
  '1': {
    title: 'Senior Software Engineer (AI Operations)',
    org: 'Velo Solutions',
    type: 'Full-Time Job',
    location: 'London, UK / Remote',
    description: [
      'Velo Solutions is seeking a Senior Software Engineer to join our AI Operations team. You will work on building and scaling AI-powered systems that serve millions of users worldwide.',
      'The ideal candidate has 5+ years of experience in backend development, a strong understanding of machine learning pipelines, and experience with cloud platforms like AWS or GCP.',
      'This is a unique opportunity to work at the intersection of software engineering and artificial intelligence in a fast-paced, innovative environment.',
    ],
    requirements: ['5+ years backend experience (Python, Go, or Java)', 'Experience with ML pipelines and MLOps', 'Cloud platform expertise (AWS/GCP)', 'Strong communication and team collaboration skills'],
    perks: ['Competitive salary (£90-130k)', 'Remote-first culture', 'Annual learning budget (£5,000)', 'Stock options', 'Health and wellness benefits'],
  },
  '2': {
    title: 'Quantum Research Fellowship',
    org: 'UN Mission Alpha',
    type: 'Fellowship',
    location: 'Geneva, Switzerland',
    description: [
      'The UN Mission Alpha Quantum Research Fellowship offers a unique opportunity to conduct cutting-edge research in quantum computing applications for sustainable development.',
      'Fellows work alongside leading researchers and UN policy makers to explore how quantum technologies can address global challenges.',
      'This 12-month fellowship includes full research funding, access to quantum computing resources, and opportunities to present findings at UN conferences.',
    ],
    requirements: ['PhD or equivalent in Physics, CS, or related field', 'Published research in quantum computing', 'Strong analytical and problem-solving skills', 'Interest in sustainable development applications'],
    perks: ['Full research funding', 'CHF 6,000/month stipend', 'Access to quantum computing labs', 'UN conference participation', 'Publication support'],
  },
  '3': {
    title: 'Strategic Logistics Intern',
    org: 'Global Core Inc.',
    type: 'Internship',
    location: 'Ankara, Turkey',
    description: [
      'Global Core Inc. is looking for a Strategic Logistics Intern to support our supply chain operations across the Middle East and Europe.',
      'You will gain hands-on experience in logistics planning, inventory management, and cross-border trade operations.',
      'This is an excellent opportunity for graduates looking to build a career in international trade and logistics.',
    ],
    requirements: ['Recent graduate (BA/BS)', 'Strong analytical skills', 'Proficiency in Excel and data analysis', 'English and Turkish fluency'],
    perks: ['Monthly stipend', 'Mentorship program', 'Potential full-time offer', 'Travel opportunities', 'Professional development workshops'],
  },
  '4': {
    title: 'Lead Architect (Sustainability)',
    org: 'Future Works',
    type: 'Full-Time Job',
    location: 'New York, USA',
    description: [
      'Future Works is hiring a Lead Architect to design sustainable building projects across North America.',
      'You will lead a team of architects and engineers, working on LEED-certified commercial and residential projects.',
      'We are looking for someone with a passion for sustainable design and experience leading complex architectural projects.',
    ],
    requirements: ['Licensed Architect (NCARB or equivalent)', '8+ years of experience', 'LEED AP certification preferred', 'Team leadership experience'],
    perks: ['Salary $150-200k', 'Comprehensive benefits package', 'Project leadership opportunities', 'Sustainability impact', 'Professional development budget'],
  },
}

export default function OpportunityDetailPage() {
  const params = useParams()
  const id = params.id as string
  const opportunity = OPPORTUNITIES_DATA[id]

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">404</h1>
          <p className="text-muted text-xl">Opportunity not found.</p>
          <Link href="/opportunities" className="text-primary font-bold hover:underline">← Back to Opportunities</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <InteractiveGrid />
      <div className="section-padding relative z-10 max-w-4xl mx-auto">
        <FadeIn>
          <Link href="/opportunities" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors mb-16">
            <ArrowLeft className="w-4 h-4" /> Back to Opportunities
          </Link>
        </FadeIn>

        <FadeIn className="mb-16">
          <div className="flex items-center gap-4 flex-wrap mb-8">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">{opportunity.type}</span>
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Building className="w-3 h-3" /> {opportunity.org}</span>
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> {opportunity.location}</span>
          </div>
          <h1 className="text-5xl md:text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-black">{opportunity.title}</h1>
        </FadeIn>

        {/* Description */}
        <div className="space-y-8 mb-20">
          {opportunity.description.map((para, i) => (
            <ScrollFadeIn key={i} delay={i * 0.05}>
              <p className="text-xl text-muted leading-relaxed font-medium">{para}</p>
            </ScrollFadeIn>
          ))}
        </div>

        {/* Requirements & Perks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:p-12 mb-20">
          <ScrollFadeIn direction="left">
            <div className="bg-zinc-50 border border-zinc-100 p-6 md:p-10 rounded-[30px]">
              <h3 className="text-xl font-bold uppercase mb-6">Requirements</h3>
              <div className="space-y-4">
                {opportunity.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 text-muted font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {req}
                  </div>
                ))}
              </div>
            </div>
          </ScrollFadeIn>
          <ScrollFadeIn direction="right" delay={0.1}>
            <div className="bg-black text-white p-6 md:p-10 rounded-[30px]">
              <h3 className="text-xl font-bold uppercase mb-6">What We Offer</h3>
              <div className="space-y-4">
                {opportunity.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-3 text-white/70 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {perk}
                  </div>
                ))}
              </div>
            </div>
          </ScrollFadeIn>
        </div>

        {/* Apply CTA */}
        <ScrollFadeIn className="mb-32">
          <div className="bg-primary text-white p-6 md:p-16 rounded-[40px] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.15),transparent_50%)]" />
            <h2 className="text-4xl font-bold tracking-tighter mb-4 relative z-10">Interested?</h2>
            <p className="text-white/80 text-lg mb-10 relative z-10">Apply now or save this opportunity for later.</p>
            <Magnetic>
              <button className="bg-black text-white px-14 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl flex items-center gap-3 mx-auto relative z-10">
                Apply Now <ArrowUpRight className="w-5 h-5" />
              </button>
            </Magnetic>
          </div>
        </ScrollFadeIn>

        <GlowLine className="mb-16" />
        <ScrollFadeIn>
          <Comments targetType="programs" targetId={`opportunity-${id}`} />
        </ScrollFadeIn>
      </div>
    </div>
  )
}

'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FadeIn, ScrollFadeIn, GlowLine, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { ArrowLeft, Download, FileText, Calendar, Shield, HardDrive } from 'lucide-react'

const RESOURCES_DATA: Record<string, {
  title: string; type: string; size: string; date: string;
  description: string[]; contents: string[]
}> = {
  '1': {
    title: 'Network Handbook 2026',
    type: 'PDF',
    size: '2.4 MB',
    date: 'January 15, 2026',
    description: [
      'The official handbook for all members of the Turkish Graduate Network. This comprehensive guide covers everything from membership benefits to event participation guidelines.',
      'Updated annually, the 2026 edition includes new sections on digital networking tools, career development resources, and international exchange opportunities.',
    ],
    contents: ['Membership Overview', 'Network Benefits Guide', 'Event Calendar 2026', 'Career Resources Directory', 'International Exchange Programs', 'Contact Information'],
  },
  '2': {
    title: 'Strategic Collaboration Guidelines',
    type: 'DOCX',
    size: '1.1 MB',
    date: 'December 20, 2025',
    description: [
      'Official guidelines for establishing and maintaining collaborative partnerships between the network and external organizations.',
      'This document outlines the approval process, partnership tiers, and reporting requirements for all collaborative initiatives.',
    ],
    contents: ['Partnership Framework', 'Approval Process', 'Partnership Tiers', 'Reporting Requirements', 'Legal Guidelines', 'Case Studies'],
  },
  '3': {
    title: 'Global Mission Report',
    type: 'PDF',
    size: '5.8 MB',
    date: 'November 30, 2025',
    description: [
      'A comprehensive annual report detailing the network\'s progress toward its global mission goals, including sustainability initiatives, education programs, and community impact.',
      'Features data visualizations, member testimonials, and strategic recommendations for the coming year.',
    ],
    contents: ['Executive Summary', 'Education Initiatives', 'Sustainability Programs', 'Community Impact Metrics', 'Financial Overview', 'Future Roadmap'],
  },
  '4': {
    title: 'Security & Authentication Guide',
    type: 'PDF',
    size: '0.9 MB',
    date: 'October 15, 2025',
    description: [
      'A technical guide for members on keeping their accounts and data secure while using the network\'s digital platforms.',
      'Covers best practices for password management, two-factor authentication, and recognizing phishing attempts.',
    ],
    contents: ['Account Security Basics', 'Two-Factor Authentication Setup', 'Password Best Practices', 'Phishing Awareness', 'Data Privacy Guidelines', 'Support Contact'],
  },
  '5': {
    title: 'Alumni Operations Manual',
    type: 'DOCX',
    size: '3.2 MB',
    date: 'September 1, 2025',
    description: [
      'The operational manual for regional alumni chapter leaders and coordinators. Covers event planning, member outreach, and reporting procedures.',
      'Essential reading for anyone leading a local chapter or organizing events on behalf of the network.',
    ],
    contents: ['Chapter Setup Guide', 'Event Planning Checklist', 'Member Outreach Strategies', 'Budget Templates', 'Reporting Procedures', 'Brand Guidelines'],
  },
}

export default function ResourceDetailPage() {
  const params = useParams()
  const id = params.id as string
  const resource = RESOURCES_DATA[id]

  if (!resource) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">404</h1>
          <p className="text-muted text-xl">Resource not found.</p>
          <Link href="/resources" className="text-primary font-bold hover:underline">← Back to Resources</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <InteractiveGrid />
      <div className="section-padding relative z-10 max-w-4xl mx-auto">
        <FadeIn>
          <Link href="/resources" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors mb-16">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
        </FadeIn>

        <FadeIn className="mb-16">
          <div className="flex items-center gap-4 flex-wrap mb-8">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-3 h-3" /> {resource.type}
            </span>
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <HardDrive className="w-3 h-3" /> {resource.size}
            </span>
            <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> {resource.date}
            </span>
          </div>
          <h1 className="text-5xl md:text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-black">{resource.title}</h1>
        </FadeIn>

        {/* Document Preview */}
        <ScrollFadeIn className="mb-20">
          <div className="aspect-[3/2] bg-zinc-50 rounded-[40px] border border-zinc-200 flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto">
                <FileText className="w-12 h-12 text-primary" />
              </div>
              <p className="text-muted font-bold text-xs uppercase tracking-widest">{resource.type} • {resource.size}</p>
            </div>
          </div>
        </ScrollFadeIn>

        {/* Description */}
        <div className="space-y-8 mb-20">
          {resource.description.map((para, i) => (
            <ScrollFadeIn key={i} delay={i * 0.05}>
              <p className="text-xl text-muted leading-relaxed font-medium">{para}</p>
            </ScrollFadeIn>
          ))}
        </div>

        {/* Table of Contents */}
        <ScrollFadeIn className="mb-20">
          <div className="bg-zinc-50 border border-zinc-100 p-6 md:p-12 rounded-[40px]">
            <h3 className="text-2xl font-bold uppercase mb-8">Contents</h3>
            <div className="space-y-4">
              {resource.contents.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-zinc-200 last:border-0">
                  <span className="font-medium text-lg">{item}</span>
                  <span className="text-muted text-xs font-bold uppercase tracking-widest">Section {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>

        {/* Download CTA */}
        <ScrollFadeIn className="mb-20">
          <div className="bg-black text-white p-6 md:p-16 rounded-[40px] text-center">
            <h2 className="text-3xl font-bold mb-4">Download This Resource</h2>
            <p className="text-white/60 mb-10">Free for all registered members of the network.</p>
            <Magnetic>
              <button className="bg-primary text-white px-14 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl flex items-center gap-3 mx-auto">
                <Download className="w-5 h-5" /> Download {resource.type}
              </button>
            </Magnetic>
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  )
}

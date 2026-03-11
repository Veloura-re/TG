'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FadeIn, ScrollFadeIn, GlowLine, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Comments } from '@/components/shared/comments'
import { ArrowLeft, Calendar, Tag, Share2, Bookmark, Clock } from 'lucide-react'

const NEWS_DATA: Record<string, { title: string; category: string; date: string; readTime: string; content: string[] }> = {
  'alumni-summit-2026': {
    title: 'Annual Global Alumni Summit 2026: Registration Open',
    category: 'Events',
    date: 'March 15, 2026',
    readTime: '4 min read',
    content: [
      'We are thrilled to announce that registration for the 2026 Global Alumni Summit is now open. This year\'s event promises to be our biggest and most impactful gathering yet.',
      'The summit will take place over three days in Istanbul, featuring keynote speakers from leading global companies, interactive workshops on career development, and an exclusive networking gala.',
      'Early-bird registration is available until May 1, 2026, with discounted rates for current students and recent graduates. We expect over 500 attendees from more than 30 countries.',
      'Key highlights include a career fair with 50+ employers, a startup pitch competition with $50,000 in prizes, and cultural excursions showcasing Istanbul\'s rich heritage.',
    ]
  },
  'research-grants-2026': {
    title: 'Research Grants for High-Performance Graduates',
    category: 'Scholarships',
    date: 'March 10, 2026',
    readTime: '3 min read',
    content: [
      'Our organization is proud to announce a new round of research grants specifically designed for Turkish program graduates pursuing advanced studies in STEM fields.',
      'Grants of up to €25,000 are available for research projects in artificial intelligence, sustainable energy, biotechnology, and materials science. Applications are reviewed on a rolling basis.',
      'To be eligible, applicants must hold a degree from a recognized Turkish program and demonstrate a clear research plan with measurable outcomes.',
      'Previous grant recipients have gone on to publish in top-tier journals, file patents, and launch successful startups based on their research.',
    ]
  },
  'arda-yilmaz-spotlight': {
    title: 'Spotlight: Dr. Arda Yilmaz on the Future of AI',
    category: 'Spotlight',
    date: 'March 5, 2026',
    readTime: '5 min read',
    content: [
      'In this exclusive interview, Dr. Arda Yilmaz, a 2019 program graduate and now a leading AI researcher at DeepMind, shares his journey and vision for the future of artificial intelligence.',
      '"The Turkish graduate network gave me the connections I needed early in my career," says Dr. Yilmaz. "The mentorship program, in particular, was instrumental in shaping my research direction."',
      'Dr. Yilmaz currently leads a team working on next-generation language models and believes that responsible AI development is the most important challenge of our generation.',
      'He encourages current students to take advantage of every networking opportunity and to think globally about the impact of their work.',
    ]
  },
  'erc-partnership': {
    title: 'Strategic Partnership with the European Research Council',
    category: 'Partnerships',
    date: 'February 28, 2026',
    readTime: '3 min read',
    content: [
      'We are excited to announce a landmark partnership with the European Research Council (ERC) that will create new pathways for our graduates in European research institutions.',
      'Under this agreement, Turkish program graduates will have streamlined access to ERC fellowship applications and priority consideration for collaborative research projects.',
      'The partnership also includes an annual exchange program, allowing up to 20 graduates to spend three months at leading European research labs.',
      'This collaboration represents a significant step forward in our mission to connect our alumni with the best opportunities worldwide.',
    ]
  },
  'digital-skills-2026': {
    title: 'Digital Skills Training Program for 2026',
    category: 'Training',
    date: 'February 20, 2026',
    readTime: '3 min read',
    content: [
      'Our new Digital Skills Training Program is designed to help graduates stay competitive in the rapidly evolving tech landscape.',
      'The program covers cloud computing, cybersecurity, data analytics, and full-stack development, with courses delivered by industry professionals from companies like Google, Microsoft, and AWS.',
      'Participants will receive official certifications upon completion, which can be added to their professional profiles and resumes.',
      'The first cohort begins in April 2026, with rolling admissions throughout the year. Scholarships are available for financial need.',
    ]
  },
  'sdg-commitments': {
    title: 'Global Mission Goals: Our Commitments for 2026',
    category: 'Reports',
    date: 'February 15, 2026',
    readTime: '6 min read',
    content: [
      'As part of our commitment to global sustainability, we have aligned our organizational goals with the United Nations Sustainable Development Goals (SDGs).',
      'For 2026, we are focusing on Quality Education (SDG 4), Decent Work and Economic Growth (SDG 8), and Partnerships for the Goals (SDG 17).',
      'Our initiatives include providing scholarships to 100 underrepresented graduates, creating 500 new job connections through our career platform, and establishing 10 new international partnerships.',
      'We publish quarterly progress reports and invite all members to contribute to these goals through volunteer opportunities and project participation.',
    ]
  },
}

export default function NewsDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const article = NEWS_DATA[slug]
  const [isSaved, setIsSaved] = React.useState(false)
  const [toast, setToast] = React.useState('')

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedArticles') || '[]') as string[]
    setIsSaved(saved.includes(slug))
  }, [slug])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: article?.title, url })
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url)
      showToast('Link copied to clipboard!')
    }
  }

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('savedArticles') || '[]') as string[]
    if (saved.includes(slug)) {
      localStorage.setItem('savedArticles', JSON.stringify(saved.filter((s: string) => s !== slug)))
      setIsSaved(false)
      showToast('Article removed from saved')
    } else {
      saved.push(slug)
      localStorage.setItem('savedArticles', JSON.stringify(saved))
      setIsSaved(true)
      showToast('Article saved!')
    }
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">404</h1>
          <p className="text-muted text-xl">Article not found.</p>
          <Link href="/news" className="text-primary font-bold hover:underline">← Back to News</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <InteractiveGrid />

      {/* Toast notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-8 py-4 rounded-full text-sm font-bold shadow-2xl"
        >
          {toast}
        </motion.div>
      )}

      <div className="section-padding relative z-10 max-w-4xl mx-auto">
        {/* Back */}
        <FadeIn>
          <Link href="/news" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors mb-16">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn>
          <div className="space-y-8 mb-20">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Tag className="w-3 h-3" /> {article.category}
              </span>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-3 h-3" /> {article.date}
              </span>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3 h-3" /> {article.readTime}
              </span>
            </div>
            <h1 className="text-5xl md:text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-black">
              {article.title}
            </h1>
          </div>
        </FadeIn>

        {/* Cover Image */}
        <ScrollFadeIn className="mb-20">
          <div className="aspect-video bg-zinc-100 rounded-[40px] overflow-hidden border border-zinc-200">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-zinc-100 to-black/5" />
          </div>
        </ScrollFadeIn>

        {/* Content */}
        <div className="space-y-10 mb-32">
          {article.content.map((paragraph, i) => (
            <ScrollFadeIn key={i} delay={i * 0.05}>
              <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">{paragraph}</p>
            </ScrollFadeIn>
          ))}
        </div>

        {/* Share Actions */}
        <ScrollFadeIn className="flex items-center gap-6 mb-32 pt-12 border-t border-zinc-100">
          <button
            onClick={handleShare}
            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors border-2 border-zinc-100 px-6 py-3 rounded-full hover:border-primary active:scale-95"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest transition-colors border-2 px-6 py-3 rounded-full active:scale-95 ${
              isSaved ? 'text-primary border-primary bg-primary/5' : 'text-muted border-zinc-100 hover:text-primary hover:border-primary'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary' : ''}`} /> {isSaved ? 'Saved' : 'Save'}
          </button>
        </ScrollFadeIn>

        {/* Comments */}
        <GlowLine className="mb-16" />
        <ScrollFadeIn>
          <Comments targetType="news" targetId={slug} />
        </ScrollFadeIn>
      </div>
    </div>
  )
}

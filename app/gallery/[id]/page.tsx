'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FadeIn, ScrollFadeIn, GlowLine } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Comments } from '@/components/shared/comments'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react'

const GALLERY_DATA: Record<string, {
  caption: string; event: string; date: string; location: string; description: string
}> = {
  '1': { caption: 'Opening Ceremony', event: 'Summit Alpha 2025', date: 'August 15, 2025', location: 'Istanbul, Turkey', description: 'The grand opening ceremony of our annual summit, featuring keynote addresses from leading industry figures and government officials.' },
  '2': { caption: 'Networking Gala', event: 'Summit Alpha 2025', date: 'August 16, 2025', location: 'Istanbul, Turkey', description: 'An evening of professional networking, cultural performances, and award presentations celebrating exceptional graduate achievements.' },
  '3': { caption: 'Workshop Session', event: 'Tech Connect 2024', date: 'June 10, 2024', location: 'London, UK', description: 'Interactive workshop on emerging technologies and their applications in sustainable development.' },
  '4': { caption: 'Career Fair', event: 'Summit Alpha 2025', date: 'August 17, 2025', location: 'Istanbul, Turkey', description: 'Our annual career fair connecting graduates with top employers from around the world.' },
  '5': { caption: 'Panel Discussion', event: 'Regional Meetup 2025', date: 'March 20, 2025', location: 'Berlin, Germany', description: 'A panel discussion on the future of work, featuring alumni who have successfully transitioned into leadership roles.' },
  '6': { caption: 'Award Ceremony', event: 'Summit Alpha 2025', date: 'August 16, 2025', location: 'Istanbul, Turkey', description: 'Annual awards recognizing outstanding contributions to the network and professional accomplishments.' },
  '7': { caption: 'Startup Showcase', event: 'Innovation Day 2024', date: 'November 5, 2024', location: 'San Francisco, USA', description: 'Our annual startup showcase where graduate entrepreneurs pitch their ventures to investors and industry leaders.' },
  '8': { caption: 'Cultural Exchange', event: 'Heritage Day 2025', date: 'May 12, 2025', location: 'Ankara, Turkey', description: 'A celebration of cultural heritage, featuring traditional performances, cuisine, and exhibitions from across our global network.' },
}

export default function GalleryDetailPage() {
  const params = useParams()
  const id = params.id as string
  const item = GALLERY_DATA[id]
  const numId = parseInt(id)
  const prevId = numId > 1 ? numId - 1 : 8
  const nextId = numId < 8 ? numId + 1 : 1

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">404</h1>
          <p className="text-muted text-xl">Image not found.</p>
          <Link href="/gallery" className="text-primary font-bold hover:underline">← Back to Gallery</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="section-padding relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Link href="/gallery" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Link>
        </motion.div>

        {/* Image Display */}
        <motion.div 
          className="aspect-video bg-zinc-900 rounded-[40px] mb-12 overflow-hidden border border-white/10 relative"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-${1500000000000 + numId}?auto=format&fit=crop&q=80&w=1200')` }}
          />
          {/* Navigation arrows */}
          <Link href={`/gallery/${prevId}`} className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 backdrop-blur rounded-2xl flex items-center justify-center hover:bg-primary transition-all">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <Link href={`/gallery/${nextId}`} className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 backdrop-blur rounded-2xl flex items-center justify-center hover:bg-primary transition-all">
            <ChevronRight className="w-6 h-6" />
          </Link>
        </motion.div>

        {/* Info */}
        <motion.div 
          className="space-y-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-4 flex-wrap">
            <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">{item.event}</span>
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> {item.date}
            </span>
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3" /> {item.location}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">{item.caption}</h1>
          <p className="text-xl text-white/60 leading-relaxed font-medium max-w-3xl">{item.description}</p>
        </motion.div>

        {/* Photo Navigation */}
        <motion.div 
          className="flex items-center justify-between py-8 border-t border-white/10 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href={`/gallery/${prevId}`} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4" /> Previous Photo
          </Link>
          <span className="text-white/30 text-xs font-bold">{id} / 8</span>
          <Link href={`/gallery/${nextId}`} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors">
            Next Photo <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Comments */}
        <div className="bg-white text-black p-6 md:p-12 md:p-6 md:p-16 rounded-[40px]">
          <Comments targetType="events" targetId={`gallery-${id}`} />
        </div>
      </div>
    </div>
  )
}

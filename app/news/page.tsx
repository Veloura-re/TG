'use client'

import { FadeIn, AnimatedSection, TextReveal, Magnetic, RevealBox } from '@/components/shared/animations'
import Link from 'next/link'
import { ArrowRight, Search, Filter, Cpu, Globe, Zap, Radio, Loader2, Plus, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase-browser'

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setNews(data || [])

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
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !activeCategory || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Helper to format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Helper to get node number (mocked from ID)
  const getNodeNumber = (id: string | number) => {
    const num = typeof id === 'number' ? id : (id.toString().charCodeAt(0) % 99) + 1
    return num.toString().padStart(2, '0')
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding pt-40">
        <FadeIn>
          <div className="flex flex-col md:flex-grow md:items-end justify-between gap-8 mb-24">
            <div className="max-w-4xl">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-8 block flex items-center gap-4">
                 <Radio className="w-4 h-4 animate-pulse" /> Live Intelligence Feed
              </span>
              <h1 className="text-4xl md:text-[140px] font-bold tracking-tighter mb-8 leading-[0.85] text-black">
                <TextReveal text="GLOBAL" className="mb-2" />
                <span className="text-primary italic"><TextReveal text="INTELLIGENCE." /></span>
              </h1>
              <p className="text-2xl text-muted leading-relaxed font-medium max-w-2xl">
                Real-time updates and strategic reporting from the global Turkish graduate network. Stay ahead of the curve.
              </p>
            </div>
            
            {isAdmin && (
              <FadeIn delay={0.1}>
                <Magnetic>
                  <Link href="/admin/news/new" className="group bg-black text-white px-10 py-6 rounded-3xl font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-4 hover:bg-primary transition-all shadow-2xl active:scale-95 border border-white/10">
                    <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                      <Plus className="w-5 h-5" />
                    </div>
                    Deploy Intelligence
                  </Link>
                </Magnetic>
              </FadeIn>
            )}
          </div>
        </FadeIn>

        {/* Futuristic Search/Filter */}
        <FadeIn delay={0.2} className="mb-24">
          <div className="flex flex-col md:flex-row gap-4 p-4 bg-zinc-50 border border-border rounded-[32px] shadow-sm">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-hover:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search Intelligence Protocol..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-6 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <Magnetic>
              <button 
                onClick={() => setActiveCategory(activeCategory ? null : 'Events')} // Simple toggle for demo, could be a dropdown
                className="flex items-center justify-center gap-3 px-12 py-6 bg-black text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-primary transition-all"
              >
                <Filter className="w-5 h-5" />
                {activeCategory ? `Category: ${activeCategory}` : 'Filter Feed'}
              </button>
            </Magnetic>
          </div>
        </FadeIn>

        {/* Intelligence Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted">Syncing Intelligence...</span>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-12">
            {filteredNews.map((item, i) => (
              <FadeIn key={item.id} delay={0.1 * (i % 3)} className="group">
                <Link href={`/news/${item.slug}`}>
                  <div className="bg-white border border-transparent border-b-border pb-12 group-hover:border-primary transition-all duration-700 h-full flex flex-col">
                    <div className="aspect-[16/10] bg-zinc-50 rounded-[40px] mb-10 overflow-hidden relative border border-border group-hover:border-primary/50 group-hover:shadow-2xl transition-all duration-700">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      )}
                      <div className="absolute top-6 left-6">
                        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-xl">
                          Node {getNodeNumber(item.id)}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-primary tracking-widest uppercase">
                        <span>{item.category} Protocol</span>
                        <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                        <span className="text-muted">{formatDate(item.created_at)}</span>
                      </div>
                      <h3 className="text-3xl font-bold group-hover:text-primary transition-colors leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      <div className="pt-4 flex items-center justify-between mt-auto">
                         <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-black transition-all">Download Briefing</span>
                         <div className="w-12 h-12 bg-zinc-50 border border-border rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                            <ArrowRight className="w-6 h-6" />
                         </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <h3 className="text-2xl font-bold text-muted uppercase tracking-widest">No Intelligence Found</h3>
            <p className="text-muted mt-4">Adjust your search or check back later.</p>
          </div>
        )}
      </section>
    </div>
  )
}


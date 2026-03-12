'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, GraduationCap, Users, Calendar, Award, Sparkles, Zap, Shield, Globe, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FadeIn, AnimatedSection, TextReveal, Magnetic, RevealBox, ScrollFadeIn, StaggerContainer, StaggerItem, FloatingElement, ParallaxSection, GlowLine } from '@/components/shared/animations'
import { InteractiveGrid, GlobalMap } from '@/components/shared/visuals'
import { NetworkPulse } from '@/components/shared/pulse'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase-browser'

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  const [stats, setStats] = useState({
    talent: '15K',
    programs: '120',
    nodes: '45',
    events: '850'
  })
  const [latestNews, setLatestNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchHomeData()
  }, [])

  async function fetchHomeData() {
    try {
      setLoading(true)
      
      // Fetch latest 3 news
      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3)

      if (newsData) setLatestNews(newsData)

      // Fetch counts for stats
      const { count: profileCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      const { count: progCount } = await supabase.from('programs').select('*', { count: 'exact', head: true })
      const { count: eventCount } = await supabase.from('events').select('*', { count: 'exact', head: true })

      setStats({
        talent: profileCount ? `${(profileCount / 1000).toFixed(0)}K+` : '15K+',
        programs: progCount ? progCount.toString() : '120',
        nodes: '45', // Hardcoded for now unless nodes table exists
        events: eventCount ? eventCount.toString() : '850'
      })

    } catch (error) {
      console.error('Error fetching home data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col bg-white overflow-hidden relative">
      <InteractiveGrid />
      
      {/* High-Impact Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-32">
        <div className="absolute inset-0 z-0 bg-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,51,0.1),transparent_70%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="section-padding relative z-10 w-full">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="inline-flex items-center gap-2 py-2 px-4 mb-10 bg-zinc-50 border border-border rounded-full group cursor-pointer hover:bg-zinc-100 transition-all">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted group-hover:text-black">Official Alumni Network</span>
                <ArrowRight className="w-3 h-3 text-muted group-hover:translate-x-1 transition-all" />
              </div>
            </FadeIn>
            
            <h1 className="text-4xl md:text-[140px] font-bold tracking-tighter mb-12 leading-[0.9] text-black italic-bold">
              <TextReveal text="UNITING" className="mb-2" />
              <TextReveal text="OUR" className="mb-2 opacity-30" />
              <span className="text-primary italic">
                <TextReveal text="GRADUATES." />
              </span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:p-12 items-end">
              <FadeIn delay={0.4}>
                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                  Empowering graduates with a high-performance network of elite opportunities and global resources.
                </p>
              </FadeIn>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-end mt-8">
                <div className="flex items-center p-1 bg-zinc-50 border border-border rounded-full shadow-sm">
                  <Magnetic>
                    <Link href="/programs" className="group bg-primary text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl">
                      Explore
                      <Zap className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
                    </Link>
                  </Magnetic>
                  <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest px-8 py-5 hover:text-primary transition-all">
                    Member Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div 
          style={{ scale, opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-muted"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-muted to-transparent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
        </motion.div>
      </section>

      {/* Futuristic Stats & Pulse Section */}
      <AnimatedSection className="mx-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 bg-black text-white py-32 p-6 md:p-12 md:p-8 md:p-24 rounded-[60px] relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            <div className="section-padding py-0 relative z-10 mx-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:p-16 md:gap-x-12 md:gap-y-24">
                {[
                  { label: 'Active Talent', value: stats.talent, icon: Users, prefix: '+' },
                  { label: 'Strategic Programs', value: stats.programs, icon: Award, prefix: '' },
                  { label: 'Global Nodes', value: stats.nodes, icon: Shield, prefix: '' },
                  { label: 'Core Events', value: stats.events, icon: Sparkles, prefix: '+' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center md:items-start group">
                    <div className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 flex items-start text-primary group-hover:scale-105 transition-transform duration-700">
                      <span className="text-3xl opacity-40 mt-4 mr-2">{stat.prefix}</span>
                      {stat.value}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-[2px] bg-primary group-hover:w-16 transition-all duration-700" />
                      <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 h-full">
            <FadeIn delay={0.2} className="h-full">
              <NetworkPulse />
            </FadeIn>
          </div>
        </div>
      </AnimatedSection>

      {/* Global Node Network Section */}
      <ParallaxSection className="section-padding py-40 bg-zinc-50/50">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl z-[-1]" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:p-20 items-center">
          <ScrollFadeIn direction="left" className="lg:col-span-5 space-y-12">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] block">Our Network</span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-black italic-bold">
              GLOBAL<br />PRESENCE.
            </h2>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
              We are active in over 45 cities worldwide. Our network helps graduates stay connected, share knowledge, and find career opportunities no matter where they are.
            </p>
            <div className="pt-8">
              <Magnetic>
                <Link href="/about" className="group bg-primary text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-[0_15px_40px_rgba(255,0,51,0.3)]">
                  View Branches <Globe className="w-4 h-4" />
                </Link>
              </Magnetic>
            </div>
          </ScrollFadeIn>
          <ScrollFadeIn direction="right" delay={0.2} className="lg:col-span-7">
            <GlobalMap />
          </ScrollFadeIn>
        </div>
      </ParallaxSection>

      {/* News Section */}
      <section className="section-padding py-40">
        <GlowLine className="mb-24" />
        <ScrollFadeIn className="flex flex-col md:row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Updates</span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-black leading-none uppercase">
              LATEST<br />NEWS.
            </h2>
          </div>
          <Magnetic>
            <Link href="/news" className="flex items-center gap-3 px-8 py-4 bg-zinc-50 border border-border rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all">
              View All Intelligence <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </ScrollFadeIn>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Syncing Intelligence...</span>
          </div>
        ) : latestNews.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-10">
            {latestNews.map((item, i) => (
              <StaggerItem key={item.id}>
                <RevealBox className="rounded-[40px] h-full">
                  <Link href={`/news/${item.slug}`} className="group cursor-pointer bg-white border border-border p-8 rounded-[40px] hover:border-primary shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    <div className="aspect-video bg-zinc-100 rounded-3xl mb-10 overflow-hidden relative">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-0 transition-opacity" />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-border group-hover:bg-primary group-hover:text-white transition-all">Node 0{i + 1}</span>
                      </div>
                    </div>
                    <div className="space-y-6 flex-1 flex flex-col">
                      <h3 className="text-3xl font-bold group-hover:text-primary transition-colors leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      <div className="pt-4 flex items-center gap-4 mt-auto">
                        <div className="w-10 h-10 border border-border rounded-full flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Read briefing</span>
                      </div>
                    </div>
                  </Link>
                </RevealBox>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-zinc-100 rounded-[40px]">
            <p className="text-muted font-bold uppercase tracking-widest">No Intelligence Feed Active</p>
          </div>
        )}
      </section>

      {/* Alumni Stories Section */}
      <section className="section-padding py-40 bg-zinc-50/50">
        <ScrollFadeIn className="mb-24 text-center max-w-3xl mx-auto">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Success Stories</span>
          <h2 className="text-5xl md:text-4xl md:text-7xl font-bold tracking-tighter text-black uppercase">
            MEET OUR <span className="text-primary italic">GRADUATES.</span>
          </h2>
        </ScrollFadeIn>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:p-12">
          {[
            { name: "Dr. Selin Yilmaz", role: "Software Architect in Berlin", story: "The TR network helped me find my current position and connect with other Turkish engineers in Germany." },
            { name: "Mehmet Demir", role: "Data Scientist in London", story: "Access to the alumni portal gave me the resources I needed to pivot my career into finance." }
          ].map((alumnus, i) => (
            <StaggerItem key={i}>
              <div className="bg-white p-6 md:p-12 rounded-[50px] border-2 border-zinc-100 hover:border-primary transition-all group shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                  <FloatingElement amplitude={5} duration={6}>
                    <div className="w-20 h-20 bg-zinc-100 rounded-3xl overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${i}`} alt={alumnus.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                  </FloatingElement>
                  <div>
                    <h4 className="text-2xl font-bold">{alumnus.name}</h4>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{alumnus.role}</p>
                  </div>
                </div>
                <p className="text-muted text-xl leading-relaxed italic">"{alumnus.story}"</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Extreme CTA */}
      <AnimatedSection className="px-6 pb-24">
        <div className="max-w-[1400px] mx-auto bg-primary text-white rounded-[80px] p-6 md:p-20 md:p-8 md:p-32 text-center relative overflow-hidden group shadow-[0_50px_100px_-30px_rgba(225,29,72,0.4)]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-black/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 group-hover:bg-white/10 transition-colors duration-1000" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-9xl font-bold mb-12 tracking-tighter italic leading-none">
              BEYOND<br />GRADUATION.
            </h2>
            <p className="text-xl md:text-3xl text-white/80 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              The network is live. Join our global community and take the next step in your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center p-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                <Magnetic>
                  <Link href="/signup" className="bg-white text-primary px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3">
                    Join The Mission <Zap className="w-4 h-4 fill-primary animate-pulse" />
                  </Link>
                </Magnetic>
                <Link href="/login" className="text-[10px] font-bold uppercase tracking-[0.2em] px-10 py-6 hover:text-black transition-all">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}


'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn, TextReveal, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Lock, Mail, Shield, Zap, ArrowRight, Landmark, Loader2, Key } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase-browser'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      <InteractiveGrid />
      
      {/* Red Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[180px] z-0 animate-pulse" />

      <FadeIn className="w-full max-w-xl relative z-10">
        <div className="bg-white border-2 border-zinc-100 p-12 md:p-20 rounded-[80px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
           
           <div className="mb-16 text-center">
              <Link href="/" className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-[32px] mb-8 hover:rotate-3 transition-all duration-700 shadow-[0_15px_40px_rgba(255,0,51,0.2)] group active:scale-95">
                 <Landmark className="w-12 h-12 text-white" />
              </Link>
              <h1 className="text-5xl font-bold tracking-tighter mb-4 italic text-black uppercase">
                 <span className="text-primary not-italic block text-xs tracking-[0.4em] mb-4 font-mono">SECURE ACCESS</span>
                 MEMBER <span className="text-primary not-italic">LOGIN.</span>
              </h1>
              <p className="text-muted font-bold tracking-[0.1em] text-xs uppercase opacity-70">Official Site for Turkish Program Graduates</p>
           </div>

           {error && (
              <FadeIn className="mb-8 p-6 bg-primary/5 border border-primary/10 rounded-[24px]">
                 <p className="text-primary text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
              </FadeIn>
           )}

           <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-4">
                 <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-primary transition-colors">
                       <Mail className="w-5 h-5" />
                    </div>
                    <input 
                       type="email" 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="EMAIL ADDRESS" 
                       required
                       className="w-full bg-zinc-50 border-2 border-zinc-100 p-6 pl-16 rounded-[24px] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:bg-white focus:border-primary transition-all font-bold tracking-widest text-[10px] uppercase text-black"
                    />
                 </div>
                 <div className="relative group/input">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-primary transition-colors">
                       <Lock className="w-5 h-5" />
                    </div>
                    <input 
                       type="password" 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="PASSWORD" 
                       required
                       className="w-full bg-zinc-50 border-2 border-zinc-100 p-6 pl-16 rounded-[24px] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:bg-white focus:border-primary transition-all font-bold tracking-widest text-[10px] uppercase text-black"
                    />
                 </div>
              </div>

              <div className="flex items-center justify-between px-4">
                 <label className="flex items-center gap-3 cursor-pointer group/check">
                    <div className="w-6 h-6 border-2 border-zinc-200 rounded-xl flex items-center justify-center group-hover/check:border-primary transition-all bg-white">
                       <div className="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover/check:opacity-40 transition-opacity" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Remember Me</span>
                 </label>
                 <Link href="/login/reset" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4 decoration-primary/30">Reset Password</Link>
              </div>

              <Magnetic>
                 <button 
                  disabled={loading}
                  className="w-full bg-black text-white py-8 rounded-[36px] font-bold uppercase tracking-[0.4em] text-xs hover:bg-primary transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center gap-6 group disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {loading ? (
                       <Loader2 className="w-6 h-6 animate-spin text-white" />
                    ) : (
                       <>SIGN IN <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>
                    )}
                 </button>
              </Magnetic>
           </form>

           <div className="mt-16 pt-12 border-t border-zinc-100 flex items-center justify-center gap-10 text-muted">
              <div className="flex items-center gap-2">
                 <Shield className="w-4 h-4 text-primary" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Secure Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                 <Zap className="w-4 h-4 text-primary" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Fast Delivery</span>
              </div>
           </div>
        </div>
      </FadeIn>

      {/* Bottom Info */}
      <div className="absolute bottom-12 left-12 hidden lg:block">
         <div className="text-[10px] font-bold text-zinc-400 font-mono space-y-2 uppercase tracking-[0.3em]">
            <p>DOMAIN: turkishgraduates.com</p>
            <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> NETWORK STATUS: OPERATIONAL</p>
         </div>
      </div>
    </div>
  )
}

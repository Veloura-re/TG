'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Mail, ArrowRight, Landmark, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase-browser'

export default function ResetPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login/update-password`,
      })

      if (resetError) {
        setError(resetError.message)
      } else {
        setMessage('Reset link sent! Please check your email inbox.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      <InteractiveGrid />
      
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] z-0 animate-pulse" />

      <FadeIn className="w-full max-w-xl relative z-10">
        <div className="bg-white border-2 border-zinc-100 p-12 md:p-20 rounded-[80px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
           
           <div className="mb-12 text-center">
              <Link href="/login" className="inline-flex items-center justify-center w-16 h-16 bg-zinc-50 border border-zinc-100 rounded-2xl mb-8 hover:bg-zinc-100 transition-all active:scale-95 group">
                 <ArrowLeft className="w-6 h-6 text-muted group-hover:text-black transition-colors" />
              </Link>
              <h1 className="text-4xl font-bold tracking-tighter mb-4 italic uppercase text-black">
                 RESET <span className="text-primary not-italic">PASSWORD.</span>
              </h1>
              <p className="text-muted font-bold tracking-[0.1em] text-xs uppercase opacity-70">Enter your email to receive a recovery link</p>
           </div>

           {error && (
              <FadeIn className="mb-8 p-6 bg-primary/5 border border-primary/10 rounded-[24px]">
                 <p className="text-primary text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
              </FadeIn>
           )}

           {message && (
              <FadeIn className="mb-8 p-6 bg-green-50 border border-green-100 rounded-[24px]">
                 <p className="text-green-600 text-[10px] font-bold uppercase tracking-widest text-center">{message}</p>
              </FadeIn>
           )}

           <form onSubmit={handleReset} className="space-y-8">
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

              <Magnetic>
                 <button 
                  disabled={loading || !!message}
                  className="w-full bg-black text-white py-8 rounded-[36px] font-bold uppercase tracking-[0.4em] text-xs hover:bg-primary transition-all shadow-2xl flex items-center justify-center gap-6 group disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {loading ? (
                       <Loader2 className="w-6 h-6 animate-spin text-white" />
                    ) : (
                       <>SEND LINK <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>
                    )}
                 </button>
              </Magnetic>
           </form>

           <div className="mt-12 text-center">
              <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-black transition-colors">Back to Login</Link>
           </div>
        </div>
      </FadeIn>
    </div>
  )
}

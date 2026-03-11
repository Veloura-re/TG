'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { Lock, Mail, Shield, Zap, ArrowRight, Landmark, Loader2 } from 'lucide-react'
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
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      // Check if user is an admin
      const { data: admin } = await supabase
        .from('admins')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (admin) {
        // Admin user → redirect to admin dashboard
        router.push('/admin')
      } else {
        // Regular user → redirect to member dashboard
        router.push('/dashboard')
      }
      router.refresh()
    } catch {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
      }
    } catch {
      setError('An unexpected error occurred with Google Sign In.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      <InteractiveGrid />
      
      {/* Red Background Aura */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[1000px] md:h-[1000px] bg-primary/5 rounded-full blur-[180px] z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <FadeIn className="w-full max-w-xl relative z-10">
        <div className="bg-white border-2 border-zinc-100 p-6 md:p-12 md:p-6 md:p-20 rounded-[80px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
           
           <motion.div 
             className="mb-16 text-center"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
              <Link href="/" className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-[32px] mb-8 hover:rotate-3 transition-all duration-700 shadow-[0_15px_40px_rgba(255,0,51,0.2)] group active:scale-95">
                 <Landmark className="w-12 h-12 text-white" />
              </Link>
              <h1 className="text-5xl font-bold tracking-tighter mb-4 italic text-black uppercase">
                 <span className="text-primary not-italic block text-xs tracking-[0.4em] mb-4 font-mono">SECURE ACCESS</span>
                 MEMBER <span className="text-primary not-italic">LOGIN.</span>
              </h1>
              <p className="text-muted font-bold tracking-[0.1em] text-xs uppercase opacity-70">For alumni members and administrators</p>
           </motion.div>

           {error && (
              <FadeIn className="mb-8 p-6 bg-primary/5 border border-primary/10 rounded-[24px]">
                 <p className="text-primary text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
              </FadeIn>
           )}

           <div className="mb-8 space-y-4">
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-white border-2 border-zinc-100 text-black py-4 rounded-[24px] font-bold uppercase tracking-widest text-[10px] hover:border-black hover:bg-black hover:text-white transition-all shadow-sm flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                   <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                   <>
                     <svg className="w-5 h-5 group-hover:invert transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                       <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                       <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                       <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                     </svg>
                     CONTINUE WITH GOOGLE
                   </>
                )}
              </button>
              
              <div className="relative flex items-center py-2">
                 <div className="flex-grow border-t border-zinc-100"></div>
                 <span className="flex-shrink-0 mx-4 text-muted text-[10px] font-bold tracking-widest uppercase">Or</span>
                 <div className="flex-grow border-t border-zinc-100"></div>
              </div>
           </div>

           <form onSubmit={handleLogin} className="space-y-8">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
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
              </motion.div>

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

           <div className="mt-12 text-center">
              <p className="text-muted text-[10px] font-bold uppercase tracking-widest">
                Don&apos;t have an account? <Link href="/signup" className="text-primary hover:underline underline-offset-4">Sign Up</Link>
              </p>
           </div>

           <div className="mt-16 pt-12 border-t border-zinc-100 flex items-center justify-center gap-6 md:p-10 text-muted">
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
         <motion.div 
           className="text-[10px] font-bold text-zinc-400 font-mono space-y-2 uppercase tracking-[0.3em]"
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 1, duration: 0.8 }}
         >
            <p>DOMAIN: turkishgraduates.com</p>
            <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> NETWORK STATUS: OPERATIONAL</p>
         </motion.div>
      </div>
    </div>
  )
}

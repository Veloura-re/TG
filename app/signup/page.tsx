'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn, Magnetic, ScrollFadeIn } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { User, Mail, Lock, ArrowRight, Landmark, Loader2, Shield, Zap, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase-browser'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
      } else {
        setSuccess(true)
        setLoading(false)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
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
      setError('An unexpected error occurred with Google Sign Up.')
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
        <div className="bg-white border-2 border-zinc-100 p-6 md:p-12 md:p-6 md:p-20 rounded-[80px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
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
                 <span className="text-primary not-italic block text-xs tracking-[0.4em] mb-4 font-mono">JOIN THE NETWORK</span>
                 CREATE <span className="text-primary not-italic">ACCOUNT.</span>
              </h1>
              <p className="text-muted font-bold tracking-[0.1em] text-xs uppercase opacity-70">Begin your alumni journey today</p>
           </motion.div>

           {success ? (
             <motion.div 
               className="text-center space-y-8 py-12"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
             >
               <motion.div 
                 className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
               >
                 <CheckCircle2 className="w-12 h-12 text-primary" />
               </motion.div>
               <h2 className="text-3xl font-bold uppercase">Account Created!</h2>
               <p className="text-muted font-medium text-lg">Check your email to confirm your account. Then come back and log in.</p>
               <Link href="/login" className="inline-block bg-black text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all">
                 Go to Login
               </Link>
             </motion.div>
           ) : (
             <>
               {error && (
                 <FadeIn className="mb-8 p-6 bg-primary/5 border border-primary/10 rounded-[24px]">
                   <p className="text-primary text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
                 </FadeIn>
               )}

               <div className="mb-8 space-y-4">
                  <button 
                    onClick={handleGoogleSignup}
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
                         SIGN UP WITH GOOGLE
                       </>
                    )}
                  </button>
                  
                  <div className="relative flex items-center py-2">
                     <div className="flex-grow border-t border-zinc-100"></div>
                     <span className="flex-shrink-0 mx-4 text-muted text-[10px] font-bold tracking-widest uppercase">Or</span>
                     <div className="flex-grow border-t border-zinc-100"></div>
                  </div>
               </div>

               <form onSubmit={handleSignup} className="space-y-6">
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                     {/* Full Name */}
                     <div className="relative group/input">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-primary transition-colors">
                           <User className="w-5 h-5" />
                        </div>
                        <input 
                           type="text" 
                           value={fullName}
                           onChange={(e) => setFullName(e.target.value)}
                           placeholder="FULL NAME" 
                           required
                           className="w-full bg-zinc-50 border-2 border-zinc-100 p-6 pl-16 rounded-[24px] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:bg-white focus:border-primary transition-all font-bold tracking-widest text-[10px] uppercase text-black"
                        />
                     </div>
                     {/* Email */}
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
                     {/* Password */}
                     <div className="relative group/input">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-primary transition-colors">
                           <Lock className="w-5 h-5" />
                        </div>
                        <input 
                           type="password" 
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="PASSWORD (MIN 8 CHARS)" 
                           required
                           className="w-full bg-zinc-50 border-2 border-zinc-100 p-6 pl-16 rounded-[24px] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:bg-white focus:border-primary transition-all font-bold tracking-widest text-[10px] uppercase text-black"
                        />
                     </div>
                     {/* Confirm Password */}
                     <div className="relative group/input">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-primary transition-colors">
                           <Lock className="w-5 h-5" />
                        </div>
                        <input 
                           type="password" 
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           placeholder="CONFIRM PASSWORD" 
                           required
                           className="w-full bg-zinc-50 border-2 border-zinc-100 p-6 pl-16 rounded-[24px] focus:outline-none focus:ring-8 focus:ring-primary/5 focus:bg-white focus:border-primary transition-all font-bold tracking-widest text-[10px] uppercase text-black"
                        />
                     </div>
                  </motion.div>

                  <Magnetic>
                     <button 
                      disabled={loading}
                      className="w-full bg-primary text-white py-8 rounded-[36px] font-bold uppercase tracking-[0.4em] text-xs hover:bg-black transition-all shadow-[0_20px_50px_rgba(255,0,51,0.2)] flex items-center justify-center gap-6 group disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {loading ? (
                           <Loader2 className="w-6 h-6 animate-spin text-white" />
                        ) : (
                           <>CREATE ACCOUNT <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>
                        )}
                     </button>
                  </Magnetic>
               </form>

               <div className="mt-12 text-center">
                 <p className="text-muted text-[10px] font-bold uppercase tracking-widest">
                   Already have an account? <Link href="/login" className="text-primary hover:underline underline-offset-4">Sign In</Link>
                 </p>
               </div>
             </>
           )}

           <div className="mt-16 pt-12 border-t border-zinc-100 flex items-center justify-center gap-6 md:p-10 text-muted">
              <div className="flex items-center gap-2">
                 <Shield className="w-4 h-4 text-primary" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Secure Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                 <Zap className="w-4 h-4 text-primary" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Instant Setup</span>
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

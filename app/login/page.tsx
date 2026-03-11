'use client'

import React from 'react'
import { Landmark, ArrowRight, ShieldCheck } from 'lucide-react'
import { FadeIn } from '@/components/shared/animations'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <FadeIn className="w-full max-w-md">
        <div className="text-center mb-12">
           <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:scale-105 transition-transform">
              <Landmark className="w-10 h-10 text-black" />
              <span className="font-bold text-2xl tracking-tighter">TR GRADUATES</span>
           </Link>
           <h1 className="text-4xl font-bold tracking-tighter mb-4">Admin Portal.</h1>
           <p className="text-muted text-lg">Secure access for organization staff only.</p>
        </div>

        <div className="bg-zinc-50 border border-border p-10 rounded-[40px] shadow-sm">
           <form className="space-y-6">
              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-muted">Official Email</label>
                 <input 
                    type="email" 
                    placeholder="name@organization.org" 
                    className="w-full bg-white border border-border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black/5"
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-muted">Password</label>
                 <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-white border border-border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black/5"
                 />
              </div>
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                 Sign In <ArrowRight className="w-5 h-5" />
              </button>
           </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-muted text-sm font-medium">
           <ShieldCheck className="w-4 h-4" />
           Encrypted secure access
        </div>
      </FadeIn>
    </div>
  )
}

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, AnimatedSection, Magnetic } from '@/components/shared/animations'
import { InteractiveGrid } from '@/components/shared/visuals'
import { MessageSquare, Send, Users, Shield, Zap, Globe, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase-browser'
import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchMessages()
    checkUser()

    // Subscribe to new messages
    const channel = supabase
      .channel('public_chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        setMessages(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)
  }

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50)
    
    setMessages(data || [])
    setLoading(false)
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    const { error } = await supabase.from('messages').insert({
      content: newMessage,
      user_id: user.id,
      user_email: user.email,
    })

    if (!error) {
      setNewMessage('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-10 flex flex-col">
      <InteractiveGrid />
      
      <div className="section-padding flex-grow flex flex-col relative z-10 max-w-6xl mx-auto w-full">
         {/* Header */}
         <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
               <Link href="/dashboard" className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <ArrowLeft className="w-5 h-5" />
               </Link>
               <div>
                  <div className="flex items-center gap-3 text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-1">
                     <Shield className="w-3 h-3 animate-pulse" /> Secure Channel Alpha
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter uppercase italic">Comm <span className="text-primary not-italic">Hub.</span></h1>
               </div>
            </div>
            <div className="hidden md:flex items-center gap-4 bg-zinc-50 border border-border px-6 py-3 rounded-2xl">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Node Synchronized</span>
            </div>
         </div>

         {/* Chat Interface */}
         <div className="flex-grow bg-white border-2 border-zinc-100 rounded-[50px] shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px]">
            {/* Sidebar (Nodes List Mock) */}
            <div className="w-full md:w-80 border-r-2 border-zinc-100 p-8 flex flex-col gap-8 bg-zinc-50/50">
               <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-6 flex items-center gap-2">
                     <Users className="w-4 h-4" /> Active Nodes
                  </h2>
                  <div className="space-y-4">
                     {[
                        { name: 'System Admin', status: 'Online', color: 'bg-primary' },
                        { name: 'Node Operator 04', status: 'Standby', color: 'bg-zinc-400' },
                        { name: 'Field Agent 22', status: 'Online', color: 'bg-green-500' },
                     ].map((node, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm">
                           <div className={`w-3 h-3 ${node.color} rounded-full`} />
                           <span className="text-xs font-bold uppercase tracking-widest">{node.name}</span>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="mt-auto p-6 bg-black text-white rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-primary">
                     <Shield className="w-3 h-3" /> Encryption Layer
                  </div>
                  <p className="text-[10px] font-medium opacity-60 leading-relaxed">
                     Protocol X-9 enabled. End-to-end signal tunneling active.
                  </p>
               </div>
            </div>

            {/* Message Stream */}
            <div className="flex-grow flex flex-col">
               <div 
                 ref={scrollRef}
                 className="flex-grow p-8 md:p-12 space-y-8 overflow-y-auto max-h-[500px]"
               >
                  {messages.length > 0 ? messages.map((msg, i) => {
                     const isOwn = msg.user_id === user?.id
                     return (
                        <motion.div 
                           key={i}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
                        >
                           <div className="flex items-center gap-3 mb-2 px-2">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-muted">
                                 {msg.user_email === user?.email ? 'YOU' : msg.user_email?.split('@')[0]}
                              </span>
                              <span className="text-[8px] font-medium text-zinc-300">
                                 {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                           </div>
                           <div className={`max-w-[80%] p-6 rounded-[32px] text-sm font-medium shadow-sm leading-relaxed ${
                              isOwn 
                                 ? 'bg-black text-white rounded-tr-none' 
                                 : 'bg-zinc-50 border border-border rounded-tl-none'
                           }`}>
                              {msg.content}
                           </div>
                        </motion.div>
                     )
                  }) : (
                     <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                        <MessageSquare className="w-12 h-12 mb-4" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Initialize Communication Stream</p>
                     </div>
                  )}
               </div>

               {/* Input Area */}
               <form onSubmit={sendMessage} className="p-8 border-t-2 border-zinc-100 flex gap-4">
                  <input 
                     type="text"
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                     placeholder="SIGNAL TRANSMISSION..."
                     className="flex-grow bg-zinc-50 border-2 border-zinc-100 px-8 py-5 rounded-[24px] focus:outline-none focus:border-primary transition-all font-bold tracking-widest text-[10px] placeholder:text-zinc-300"
                  />
                  <Magnetic>
                     <button 
                        type="submit"
                        className="bg-primary text-white p-5 rounded-2xl flex items-center justify-center hover:bg-black transition-all shadow-xl"
                     >
                        <Send className="w-6 h-6" />
                     </button>
                  </Magnetic>
               </form>
            </div>
         </div>
      </div>
    </div>
  )
}

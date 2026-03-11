'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/utils/supabase-browser'
import { MessageSquare, Send, Trash2, User as UserIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  profiles: {
    full_name: string | null
    avatar_url: string | null
  } | null
}

interface CommentsProps {
  targetType: 'news' | 'events' | 'programs'
  targetId: string
  className?: string
}

export function Comments({ targetType, targetId, className }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchComments()
    checkUser()
  }, [targetId])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user?.id ?? null)
  }

  const fetchComments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('comments')
      .select('id, content, created_at, user_id, profiles(full_name, avatar_url)')
      .eq('target_type', targetType)
      .eq('target_id', targetId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setComments(data as unknown as Comment[])
    }
    setLoading(false)
  }

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !userId) return

    setPosting(true)
    const { error } = await supabase.from('comments').insert({
      content: newComment.trim(),
      user_id: userId,
      target_type: targetType,
      target_id: targetId,
    })

    if (!error) {
      setNewComment('')
      fetchComments()
    }
    setPosting(false)
  }

  const handleDelete = async (commentId: string) => {
    await supabase.from('comments').delete().eq('id', commentId)
    fetchComments()
  }

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className={cn("space-y-10", className)}>
      {/* Header */}
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
          <MessageSquare className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold uppercase">Comments</h3>
          <p className="text-muted text-xs font-bold uppercase tracking-widest">{comments.length} {comments.length === 1 ? 'Response' : 'Responses'}</p>
        </div>
      </motion.div>

      {/* Post Comment Form */}
      {userId ? (
        <motion.form 
          onSubmit={handlePost}
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1 bg-zinc-50 border-2 border-zinc-100 px-8 py-5 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary transition-all font-medium text-sm text-black placeholder:text-muted/50"
          />
          <button
            type="submit"
            disabled={posting || !newComment.trim()}
            className="bg-primary text-white px-8 py-5 rounded-[20px] font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-[0_10px_30px_rgba(255,0,51,0.2)]"
          >
            {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Post</>}
          </button>
        </motion.form>
      ) : (
        <motion.div 
          className="bg-zinc-50 border-2 border-zinc-100 p-8 rounded-[20px] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-muted font-bold text-xs uppercase tracking-widest">
            <a href="/login" className="text-primary hover:underline">Sign in</a> or <a href="/signup" className="text-primary hover:underline">create an account</a> to join the discussion.
          </p>
        </motion.div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : comments.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-muted font-medium text-lg">No comments yet. Be the first to share your thoughts!</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {comments.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white border-2 border-zinc-100 p-8 rounded-[30px] hover:border-zinc-200 transition-all group"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-6 h-6 text-muted" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-sm">{comment.profiles?.full_name || 'Anonymous'}</span>
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{timeAgo(comment.created_at)}</span>
                      </div>
                      <p className="text-muted text-base leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                  {userId === comment.user_id && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-3 hover:bg-primary/5 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4 text-primary" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

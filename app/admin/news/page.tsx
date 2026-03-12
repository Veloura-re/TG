'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase-browser'
import { AdminDataTable } from '@/components/shared/admin-data-table'
import { toast } from 'sonner'

export default function AdminNewsPage() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchNews = async () => {
    setIsLoading(true)
    const { data: news, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to load news articles')
    } else {
      setData(news || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete article')
    } else {
      toast.success('Article deleted successfully')
      fetchNews()
    }
  }

  const columns = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Category', accessorKey: 'category' },
    { 
      header: 'Published', 
      accessorKey: 'publish_date',
      cell: (item: any) => new Date(item.publish_date).toLocaleDateString()
    },
  ]

  return (
    <AdminDataTable
      title="News Management."
      description="Create, edit, and manage all articles and announcements."
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRefresh={fetchNews}
      onDelete={handleDelete}
      createHref="/admin/news/new"
      createText="Create News"
      searchKey="title"
    />
  )
}

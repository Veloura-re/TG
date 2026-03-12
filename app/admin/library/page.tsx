'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase-browser'
import { AdminDataTable } from '@/components/shared/admin-data-table'
import { toast } from 'sonner'
import { Download } from 'lucide-react'

export default function AdminResourcesPage() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchResources = async () => {
    setIsLoading(true)
    const { data: resources, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to load resources')
    } else {
      setData(resources || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this resource?')) return
    
    // In a full implementation, you'd also want to delete the file from Supabase Storage
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete resource')
    } else {
      toast.success('Resource deleted successfully')
      fetchResources()
    }
  }

  const columns = [
    { header: 'Title', accessorKey: 'title' },
    { 
      header: 'File Output', 
      accessorKey: 'file_url',
      cell: (item: any) => (
        <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline font-bold text-sm">
          <Download className="w-4 h-4" /> Download
        </a>
      )
    },
    { 
      header: 'Created', 
      accessorKey: 'created_at',
      cell: (item: any) => new Date(item.created_at).toLocaleDateString()
    },
  ]

  return (
    <AdminDataTable
      title="Library Archive."
      description="Catalogue and manage the collective intelligence: Books, papers, and manuscripts."
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRefresh={fetchResources}
      onDelete={handleDelete}
      createHref="/admin/library/new"
      createText="Archive New Book"
      searchKey="title"
    />
  )
}

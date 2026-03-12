'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase-browser'
import { AdminDataTable } from '@/components/shared/admin-data-table'
import { toast } from 'sonner'

export default function AdminOpportunitiesPage() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchOpportunities = async () => {
    setIsLoading(true)
    const { data: opportunities, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to load opportunities')
    } else {
      setData(opportunities || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return
    
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete opportunity')
    } else {
      toast.success('Opportunity deleted successfully')
      fetchOpportunities()
    }
  }

  const columns = [
    { header: 'Opportunity', accessorKey: 'title' },
    { header: 'Organization', accessorKey: 'organization' },
    { 
      header: 'Deadline', 
      accessorKey: 'deadline',
      cell: (item: any) => item.deadline ? new Date(item.deadline).toLocaleDateString() : 'No Deadline'
    },
  ]

  return (
    <AdminDataTable
      title="Opportunities Board."
      description="Post and manage jobs, internships, and research opportunities."
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRefresh={fetchOpportunities}
      onDelete={handleDelete}
      createHref="/admin/opportunities/new"
      createText="Post Opportunity"
      searchKey="title"
    />
  )
}

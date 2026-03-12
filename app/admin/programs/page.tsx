'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase-browser'
import { AdminDataTable } from '@/components/shared/admin-data-table'
import { toast } from 'sonner'

export default function AdminProgramsPage() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchPrograms = async () => {
    setIsLoading(true)
    const { data: programs, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to load programs')
    } else {
      setData(programs || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this program?')) return
    
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete program')
    } else {
      toast.success('Program deleted successfully')
      fetchPrograms()
    }
  }

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Eligibility', accessorKey: 'eligibility' },
    { 
      header: 'Deadline', 
      accessorKey: 'deadline',
      cell: (item: any) => item.deadline ? new Date(item.deadline).toLocaleDateString() : 'No Deadline'
    },
  ]

  return (
    <AdminDataTable
      title="Programs Management."
      description="Manage scholarships, exchange programs, and training initiatives."
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRefresh={fetchPrograms}
      onDelete={handleDelete}
      createHref="/admin/programs/new"
      createText="Add Program"
      searchKey="name"
    />
  )
}

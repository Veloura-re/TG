'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase-browser'
import { AdminDataTable } from '@/components/shared/admin-data-table'
import { toast } from 'sonner'

export default function AdminEventsPage() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchEvents = async () => {
    setIsLoading(true)
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })

    if (error) {
      toast.error('Failed to load events')
    } else {
      setData(events || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete event')
    } else {
      toast.success('Event deleted successfully')
      fetchEvents()
    }
  }

  const columns = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Location', accessorKey: 'location' },
    { 
      header: 'Event Date', 
      accessorKey: 'event_date',
      cell: (item: any) => new Date(item.event_date).toLocaleString()
    },
  ]

  return (
    <AdminDataTable
      title="Events Management."
      description="Schedule and manage upcoming and past events."
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRefresh={fetchEvents}
      onDelete={handleDelete}
      createHref="/admin/events/new"
      createText="Add Event"
      searchKey="title"
    />
  )
}

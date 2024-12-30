import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      console.error('ID is required')
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { name, description, status } = await request.json()

    if (!name) {
      console.error('Name is required')
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const updates = {
      name,
      description,
      status: status || 0,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating category:', error.message)
      return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('categories')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', parseInt(id, 10))

    if (error) {
      console.error('Error soft deleting category:', error.message)
      return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Category soft deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
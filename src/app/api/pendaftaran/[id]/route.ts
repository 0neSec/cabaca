import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'



// Update registration
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const {
      student_name,
      parent_name,
      email,
      phone,
      selected_program,
      grade,
      school_name,
      address,
      district,
      city
    } = await request.json()

    const updates = {
      student_name,
      parent_name,
      email,
      phone,
      selected_program,
      grade,
      school_name,
      address,
      district,
      city,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('registrations')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating registration:', error.message)
      return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Soft delete registration
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('registrations')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', parseInt(id, 10))

    if (error) {
      console.error('Error soft deleting registration:', error.message)
      return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Registration soft deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
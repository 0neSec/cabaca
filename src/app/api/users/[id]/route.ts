import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { name, email, password, role, status } = await request.json()

    const updates = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password }), // Note: Should hash password before storing
      ...(role && { role }),
      ...(status && { status }),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', parseInt(id, 10))
      .select()

    if (error) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Soft delete user
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('users')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', parseInt(id, 10))

    if (error) {
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }

    return NextResponse.json({ message: 'User soft deleted successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface Category {
  id: number
  name: string
  description: string
  status: number
  created_at: string
  updated_at: string
}

export async function GET() {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    console.error('Error fetching categories:', error.message);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }

  if (!data || data.length === 0) {
    console.warn('No categories found');
    return NextResponse.json([], { status: 200 });
  }

  return NextResponse.json(data, { status: 200 });
}


export async function POST(request: Request) {
  try {
    const { name, description, status } = await request.json()

    if (!name) {
      console.error('Name is required')
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const newCategory = {
      name,
      description,
      status: status || 0,
      created_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('categories')
      .insert([newCategory])
      .select()

    if (error) {
      console.error('Error creating category:', error.message)
      return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

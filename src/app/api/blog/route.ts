import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface Post {
  id: number
  title: string
  content: string
  image?: string
  status: number
  user_id: number
  category_id: number
}

export async function GET(request: Request) {
  // Get URL parameters
  const url = new URL(request.url)
  const limit = url.searchParams.get('limit')
  const status = url.searchParams.get('status')

  let query = supabase
    .from('posts')
    .select(`
      *,
      users (id, name, email),
      categories (id, name)
    `)

  // Add filters if provided
  if (status) {
    query = query.eq('status', parseInt(status, 10))
  }
  
  if (limit) {
    query = query.limit(parseInt(limit, 10))
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error.message)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }

  // Return in the format expected by the component
  return NextResponse.json({ posts: data }, { status: 200 })
}

export async function POST(request: Request) {
  try {
    const { title, content, image, status, user_id, category_id } = await request.json()

    if (!title || !content || !user_id || !category_id) {
      console.error('Missing required fields')
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newPost = {
      title,
      content,
      image,
      status: status || 0,
      user_id: parseInt(user_id, 10),
      category_id: parseInt(category_id, 10),
      created_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([newPost])
      .select()

    if (error) {
      console.error('Error creating post:', error.message)
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }

    return NextResponse.json({ post: data[0] }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
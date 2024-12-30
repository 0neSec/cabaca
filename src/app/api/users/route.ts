import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { User } from '@/types/database'

export async function GET(request: Request) {
  // Get URL parameters
  const url = new URL(request.url)
  const limit = url.searchParams.get('limit')
  const role = url.searchParams.get('role')
  const status = url.searchParams.get('status')

  let query = supabase
    .from('users')
    .select('*')

  // Add filters if provided
  if (role) {
    query = query.eq('role', parseInt(role, 10))
  }

  if (status) {
    query = query.eq('status', parseInt(status, 10))
  }

  if (limit) {
    query = query.limit(parseInt(limit, 10))
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching users:', error.message)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }

  // Remove sensitive information before sending response
  const sanitizedUsers = data.map(({ password, ...user }) => user)

  return NextResponse.json({ users: sanitizedUsers }, { status: 200 })
}

export async function POST(request: Request) {
  try {
    const { name, email, password, role, status } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      console.error('Missing required fields')
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const newUser: Partial<User> = {
      name,
      email,
      password, // Note: In a real application, you should hash the password before storing
      role: role || 1, // Default to regular user
      status: status || 1, // Default to active
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
    }

    const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select()

    if (error) {
      console.error('Error creating user:', error.message)
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = data[0]

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
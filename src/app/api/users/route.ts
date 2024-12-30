// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, role, status, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user, error } = await createUser(
      body.name,
      body.email,
      body.password,
      body.role
    );
    
    if (error) throw error;
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}


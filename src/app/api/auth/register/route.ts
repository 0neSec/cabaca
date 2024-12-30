import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
    
    const { user, error } = await createUser(name, email, password, role);
    
    if (error) throw error;
    
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 400 }
    );
  }
}
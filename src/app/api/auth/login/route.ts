import { NextResponse } from 'next/server';
import { signIn } from '@/lib/auth';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    const { user, error } = await signIn(email, password);
    
    if (error) throw error;

    // Generate JWT token
    const token = sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Add token to user object
    const userWithToken = {
      ...user,
      token
    };
    
    return NextResponse.json({ 
      user: userWithToken 
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Login failed' },
      { status: 401 }
    );
  }
}

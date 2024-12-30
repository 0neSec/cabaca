import { hash, compare } from 'bcryptjs';
import { supabase } from './supabase';
import { User } from '../types/database';

export async function createUser(
  name: string, 
  email: string, 
  password: string, 
  role: User['role'] = 1
) {
  try {
    // Input validation
    if (!name || !email || !password) {
      throw new Error('Missing required fields');
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password with appropriate cost factor
    const hashedPassword = await hash(password, 12);
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name: name.trim(),
          email: email.toLowerCase(),
          password: hashedPassword,
          role,
          status: 1,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    // Don't return password hash
    const { password: _, ...userWithoutPassword } = data;
    return { user: userWithoutPassword, error: null };

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create user';
    return { user: null, error: { message } };
  }
}

export async function signIn(email: string, password: string) {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Get user with password for comparison
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error) throw error;
    if (!user) throw new Error('Invalid email or password');

    const validPassword = await compare(password, user.password);
    if (!validPassword) throw new Error('Invalid email or password');

    if (user.status === 0) throw new Error('Account is inactive');

    // Don't return password hash to client
    const { password: _, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, error: null };
    
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return { user: null, error: { message } };
  }
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

export function clearStoredUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}


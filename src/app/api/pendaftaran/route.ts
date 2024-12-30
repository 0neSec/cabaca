// src/app/api/pendaftaran/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createPendaftaran } from '@/lib/pendaftaran';

export async function GET(request: Request) {
  try {
    // Get search params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    // Calculate offset
    const offset = (page - 1) * limit;

    let query = supabase
      .from('pendaftaran')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Add search if provided
    if (search) {
      query = query.or(`
        student_name.ilike.%${search}%,
        email.ilike.%${search}%,
        phone.ilike.%${search}%,
        school_name.ilike.%${search}%
      `);
    }

    // Add pagination
    query = query.range(offset, offset + limit - 1);

    const { data: registrations, error, count } = await query;

    if (error) throw error;
    
    return NextResponse.json({
      registrations,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: count ? Math.ceil(count / limit) : 0
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { registration, error } = await createPendaftaran(body);
    
    if (error) throw error;
    return NextResponse.json({ registration });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create registration' },
      { status: 500 }
    );
  }
}

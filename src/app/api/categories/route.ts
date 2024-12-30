// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createCategory } from '@/lib/categories';

export async function GET() {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, error } = await createCategory(
      body.name,
      body.description
    );
    
    if (error) throw error;
    return NextResponse.json({ category });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}



// src/app/api/pendaftaran/[id]/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: registration, error } = await supabase
      .from('pendaftaran')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) throw error;
    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ registration });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registration' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { data: registration, error } = await supabase
      .from('pendaftaran')
      .update({
        student_name: body.student_name,
        parent_name: body.parent_name,
        email: body.email,
        phone: body.phone,
        selected_program: body.selected_program,
        grade: body.grade,
        school_name: body.school_name,
        address: body.address,
        district: body.district,
        city: body.city
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ registration });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('pendaftaran')
      .delete()
      .eq('id', params.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete registration' },
      { status: 500 }
    );
  }
}
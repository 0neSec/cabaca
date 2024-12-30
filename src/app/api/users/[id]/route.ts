import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const body = await request.json();
      const { data, error } = await supabase
        .from('users')
        .update({
          name: body.name,
          role: body.role,
          status: body.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)
        .select()
        .single();
  
      if (error) throw error;
      return NextResponse.json({ user: data });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to update user' },
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
        .from('users')
        .delete()
        .eq('id', params.id);
  
      if (error) throw error;
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to delete user' },
        { status: 500 }
      );
    }
  }
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    // Get all users
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Calculate statistics
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 1).length,
      guestUsers: users.filter(u => u.role === 2).length,
      newUsersToday: users.filter(u => 
        new Date(u.created_at) >= today
      ).length
    };

    return NextResponse.json({
      users,
      stats
    });
    
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
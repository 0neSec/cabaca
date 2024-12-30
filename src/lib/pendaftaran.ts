import { supabase } from './supabase';

  interface Pendaftaran {
    id: number;
    student_name: string;
    parent_name: string;
    email: string;
    phone: string;
    selected_program: string;
    grade: string;
    school_name: string;
    address: string;
    district: string;
    city: string;
    created_at?: string;
  }

export async function createPendaftaran(data: Omit<Pendaftaran, 'id' | 'created_at'>) {
  try {
    // Validate required fields
    const requiredFields = [
      'student_name',
      'parent_name',
      'email',
      'phone',
      'selected_program',
      'grade',
      'school_name',
      'address',
      'district',
      'city'
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof typeof data]) {
        throw new Error(`${field} is required`);
      }
    }

    // Check for existing registration with same email
    const { data: existing } = await supabase
      .from('pendaftaran')
      .select('id')
      .eq('email', data.email)
      .single();

    if (existing) {
      throw new Error('Email already registered');
    }

    const { data: registration, error } = await supabase
      .from('pendaftaran')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return { registration, error: null };

  } catch (error) {
    return { 
      registration: null, 
      error: { 
        message: error instanceof Error ? error.message : 'Failed to create registration'
      }
    };
  }
}

export async function updatePendaftaran(
  id: number, 
  data: Partial<Omit<Pendaftaran, 'id' | 'created_at'>>
) {
  try {
    const { data: registration, error } = await supabase
      .from('pendaftaran')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { registration, error: null };

  } catch (error) {
    return { 
      registration: null, 
      error: { 
        message: error instanceof Error ? error.message : 'Failed to update registration'
      }
    };
  }
}

export async function getPendaftaran(id: number) {
  try {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { registration: data, error: null };

  } catch (error) {
    return { 
      registration: null, 
      error: { 
        message: error instanceof Error ? error.message : 'Failed to fetch registration'
      }
    };
  }
}

export async function getAllPendaftaran(
  page: number = 1,
  limit: number = 10,
  searchTerm?: string
) {
  try {
    let query = supabase
      .from('pendaftaran')
      .select('*', { count: 'exact' });

    // Add search functionality
    if (searchTerm) {
      query = query.or(`
        student_name.ilike.%${searchTerm}%,
        email.ilike.%${searchTerm}%,
        phone.ilike.%${searchTerm}%,
        school_name.ilike.%${searchTerm}%
      `);
    }

    // Add pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;
    return { 
      registrations: data, 
      total: count, 
      error: null 
    };

  } catch (error) {
    return { 
      registrations: null, 
      total: 0,
      error: { 
        message: error instanceof Error ? error.message : 'Failed to fetch registrations'
      }
    };
  }
}

export async function deletePendaftaran(id: number) {
  try {
    const { error } = await supabase
      .from('pendaftaran')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };

  } catch (error) {
    return { 
      error: { 
        message: error instanceof Error ? error.message : 'Failed to delete registration'
      }
    };
  }
}
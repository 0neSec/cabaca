import { Category } from '@/types/database';
import { supabase } from './supabase';



export async function createCategory(name: string, description?: string) {
  try {
    if (!name) throw new Error('Name is required');

    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('name', name)
      .single();

    if (existing) throw new Error('Category already exists');

    const { data, error } = await supabase
      .from('categories')
      .insert([{
        name: name.trim(),
        description,
        status: 1
      }])
      .select()
      .single();

    if (error) throw error;
    return { category: data, error: null };

  } catch (error) {
    return { category: null, error: { message: error instanceof Error ? error.message : 'Failed to create category' }};
  }
}

export async function updateCategory(id: number, data: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data: category, error } = await supabase
      .from('categories')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { category, error: null };

  } catch (error) {
    return { category: null, error: { message: error instanceof Error ? error.message : 'Failed to update category' }};
  }
}

export async function getCategories(active?: boolean) {
  try {
    let query = supabase.from('categories').select('*');
    if (typeof active === 'boolean') {
      query = query.eq('status', active ? 1 : 0);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { categories: data, error: null };

  } catch (error) {
    return { categories: null, error: { message: error instanceof Error ? error.message : 'Failed to fetch categories' }};
  }
}

export async function deleteCategory(id: number) {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };

  } catch (error) {
    return { error: { message: error instanceof Error ? error.message : 'Failed to delete category' }};
  }
}
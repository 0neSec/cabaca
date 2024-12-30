import { Post } from '@/types/database';
import { supabase } from './supabase';

export async function createPost(
  title: string,
  content: string,
  userId: number,
  categoryId: number,
  image?: string,
  status: number = 1
) {
  try {
    if (!title || !content || !userId || !categoryId) {
      throw new Error('Missing required fields');
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: title.trim(),
          content: content.trim(),
          user_id: userId,
          category_id: categoryId,
          image,
          status,
          created_at: new Date().toISOString()
        }
      ])
      .select(`
        *,
        users (
          id,
          name,
          email
        ),
        categories (
          id,
          name
        )
      `)
      .single();

    if (error) throw error;
    return { post: data, error: null };

  } catch (error) {
    return { 
      post: null, 
      error: { 
        message: error instanceof Error ? error.message : 'Failed to create post' 
      }
    };
  }
}

export async function updatePost(
  id: number, 
  data: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>
) {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        users (
          id,
          name,
          email
        ),
        categories (
          id,
          name
        )
      `)
      .single();

    if (error) throw error;
    return { post, error: null };

  } catch (error) {
    return { 
      post: null, 
      error: { 
        message: error instanceof Error ? error.message : 'Failed to update post' 
      }
    };
  }
}

export async function getPosts(options?: {
  userId?: number;
  categoryId?: number;
  status?: number;
  page?: number;
  limit?: number;
}) {
  try {
    let query = supabase
      .from('posts')
      .select(`
        *,
        users (
          id,
          name,
          email
        ),
        categories (
          id,
          name
        )
      `);

    // Apply filters
    if (options?.userId) {
      query = query.eq('user_id', options.userId);
    }
    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }
    if (typeof options?.status === 'number') {
      query = query.eq('status', options.status);
    }

    // Apply pagination
    if (options?.page && options?.limit) {
      const from = (options.page - 1) * options.limit;
      const to = from + options.limit - 1;
      query = query.range(from, to);
    }

    // Order by newest first
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return { posts: data, error: null };

  } catch (error) {
    return { 
      posts: null, 
      error: { 
        message: error instanceof Error ? error.message : 'Failed to fetch posts' 
      }
    };
  }
}

export async function getPostById(id: number) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          id,
          name,
          email
        ),
        categories (
          id,
          name
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Post not found');

    return { post: data, error: null };

  } catch (error) {
    return { 
      post: null, 
      error: { 
        message: error instanceof Error ? error.message : 'Failed to fetch post' 
      }
    };
  }
}

export async function deletePost(id: number) {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };

  } catch (error) {
    return { 
      error: { 
        message: error instanceof Error ? error.message : 'Failed to delete post' 
      }
    };
  }
}
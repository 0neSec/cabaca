// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { createPost, getPosts } from '@/lib/post';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const categoryId = searchParams.get('categoryId');
    const status = searchParams.get('status');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    const options = {
      userId: userId ? parseInt(userId) : undefined,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      status: status ? parseInt(status) : undefined,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    };

    const { posts, error } = await getPosts(options);
    if (error) throw error;

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { post, error } = await createPost(
      body.title,
      body.content,
      body.userId,
      body.categoryId,
      body.image,
      body.status
    );
    
    if (error) throw error;
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

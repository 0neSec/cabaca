
// src/app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { updatePost, deletePost, getPostById } from '@/lib/post';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { post, error } = await getPostById(parseInt(params.id));
    if (error) throw error;

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
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
    const { post, error } = await updatePost(parseInt(params.id), {
      title: body.title,
      content: body.content,
      image: body.image,
      category_id: body.categoryId,
      status: body.status,
    });

    if (error) throw error;
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await deletePost(parseInt(params.id));
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';


interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  category_id: number | null;
  status: number;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  category?: {
    id: number;
    name: string;
  };
}

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  async function fetchPosts(page: number) {
    try {
      setLoading(true);
      const res = await fetch(`/api/blog?page=${page}&limit=6&status=1`);
      const data = await res.json();
      console.log(data);
      
      if (data.error) throw new Error(data.error);
      setPosts(data.posts);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Navbar />
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50 mt-10">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">All Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src="/api/placeholder/400/250"
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {post.category?.name || 'Uncategorized'}
                    </span>
                    <span>•</span>
                    <span>{getReadTime(post.content)}</span>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.content}
                  </p>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center w-full text-sm">
                      <span className="text-gray-600">{post.user?.name || 'Anonymous'}</span>
                      <span className="text-gray-500">{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;

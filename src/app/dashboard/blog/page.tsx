"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Loader2, Upload, ImageIcon } from "lucide-react";
import Sidebar from "@/components/sidebar";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  status: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  category_id: number;
  users: {
    id: number;
    name: string;
    email: string;
  };
  categories: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    categoryId: "",
    status: 1,
  });

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPosts(data.posts);
    } catch (err) {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCategories(data.categories);
    } catch (err) {
      setError("Failed to load categories");
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    try {
      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error(
          "File size too large. Please select an image under 5MB."
        );
      }

      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("posts")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("posts").getPublicUrl(fileName);

      return publicUrl;
    } catch (err: any) {
      throw new Error(err.message || "Failed to upload image");
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      title: "",
      content: "",
      image: "",
      categoryId: "",
      status: 1,
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (post: Post) => {
    setModalMode("edit");
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      image: post.image || "",
      categoryId: String(post.category_id),
      status: post.status,
    });
    setImagePreview(null);
    setImageFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        imageUrl = (await uploadImage()) || "";
      }

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const payload = {
        ...formData,
        image: imageUrl,
        userId: user.id,
        categoryId: Number(formData.categoryId),
      };

      if (modalMode === "add") {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setPosts([data.post, ...posts]);
      } else {
        const res = await fetch(`/api/blog/${editingPost?.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setPosts(
          posts.map((post) => (post.id === editingPost?.id ? data.post : post))
        );
      }

      setShowModal(false);
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      setError(
        err.message ||
          (modalMode === "add" ? "Failed to add post" : "Failed to update post")
      );
    } finally {
      setUploading(false);
    }
  };

  async function handleDeletePost(id: number) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      setError("Failed to delete post");
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 w-full md:ml-64">
        <header className="bg-white shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              className="text-gray-600 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-700">
              Post Management
            </h2>
          </div>
        </header>

        <main className="flex-1 p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-700">Posts</h3>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={openAddModal}
                >
                  Add Post
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {posts.map((post, index) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{post.title}</td>
                        <td className="px-6 py-4">{post.categories.name}</td>
                        <td className="px-6 py-4">{post.users.name}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded ${
                              post.status === 1
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {post.status === 1 ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="text-blue-600 hover:text-blue-800 mr-3"
                            onClick={() => openEditModal(post)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
        {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold">
          {modalMode === "add" ? "Add New Post" : "Edit Post"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
        <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Content
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      rows={6}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Image Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-48 object-contain mb-4"
                          />
                        ) : formData.image ? (
                          <img
                            src={formData.image}
                            alt="Current"
                            className="max-h-48 object-contain mb-4"
                          />
                        ) : (
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-500">
                          {imageFile
                            ? imageFile.name
                            : "Click to select an image"}
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Maximum file size: 5MB
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value={1}>Published</option>
                      <option value={0}>Draft</option>
                    </select>
                  </div>
                </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Uploading...
              </>
            ) : modalMode === "add" ? (
              "Add Post"
            ) : (
              "Update Post"
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

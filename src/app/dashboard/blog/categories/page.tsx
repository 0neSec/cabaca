'use client'
import { useState, useEffect } from 'react';
import Sidebar from "@/components/sidebar";

interface Category {
  id: number;
  name: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 1
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCategories(data.categories);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', description: '', status: 1 });
    setShowModal(true);
  };

  const openEditModal = (category: Category) => {
    setModalMode('edit');
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setCategories([data.category, ...categories]);
      } else {
        const res = await fetch(`/api/categories/${editingCategory?.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setCategories(categories.map(category => 
          category.id === editingCategory?.id ? data.category : category
        ));
      }
      setShowModal(false);
    } catch (err) {
      setError(modalMode === 'add' ? 'Failed to add category' : 'Failed to update category');
    }
  };

  async function handleDeleteCategory(id: number) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setCategories(categories.filter(category => category.id !== id));
    } catch (err) {
      setError('Failed to delete category');
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
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-700">Category Management</h2>
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
                <h3 className="text-xl font-semibold text-gray-700">Categories</h3>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={openAddModal}
                >
                  Add Category
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{category.name}</td>
                      <td className="px-6 py-4">{category.description}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded ${
                          category.status === 1 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {category.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          className="text-blue-600 hover:text-blue-800 mr-3"
                          onClick={() => openEditModal(category)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">
                  {modalMode === 'add' ? 'Add New Category' : 'Edit Category'}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full p-2 border rounded"
                      rows={3}
                      required
                    />
                  </div>

                  {modalMode === 'edit' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: Number(e.target.value)})}
                        className="w-full p-2 border rounded"
                      >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {modalMode === 'add' ? 'Add Category' : 'Save Changes'}
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
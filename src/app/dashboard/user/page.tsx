'use client'
import { useState, useEffect } from 'react';
import Sidebar from "@/components/sidebar";
import { User } from '@/types/database';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 1,
    status: 1
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUsers(data.users);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', email: '', password: '', role: 1, status: 1 });
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setModalMode('edit');
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setUsers([data.user, ...users]);
      } else {
        const res = await fetch(`/api/users/${editingUser?.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setUsers(users.map(user => 
          user.id === editingUser?.id ? data.user : user
        ));
      }
      setShowModal(false);
    } catch (err) {
      setError(modalMode === 'add' ? 'Failed to add user' : 'Failed to update user');
    }
  };

  async function handleDeleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
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
            <h2 className="text-2xl font-semibold text-gray-700">User Management</h2>
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
                <h3 className="text-xl font-semibold text-gray-700">Users</h3>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={openAddModal}
                >
                  Add User
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        {user.role === 0 ? 'Admin' : user.role === 1 ? 'User' : 'Guest'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded ${
                          user.status === 1 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          className="text-blue-600 hover:text-blue-800 mr-3"
                          onClick={() => openEditModal(user)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteUser(user.id)}
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
                  {modalMode === 'add' ? 'Add New User' : 'Edit User'}
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

                  {modalMode === 'add' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                          type="password"
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: Number(e.target.value)})}
                      className="w-full p-2 border rounded"
                    >
                      <option value={0}>Admin</option>
                      <option value={1}>User</option>
                      <option value={2}>Guest</option>
                    </select>
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
                    {modalMode === 'add' ? 'Add User' : 'Save Changes'}
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
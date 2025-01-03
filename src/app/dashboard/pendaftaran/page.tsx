"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/sidebar";

interface Registration {
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

interface FormData {
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
}

export default function RegistrationPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [formData, setFormData] = useState<FormData>({
    student_name: "",
    parent_name: "",
    email: "",
    phone: "",
    selected_program: "",
    grade: "",
    school_name: "",
    address: "",
    district: "",
    city: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const programs: string[] = [
    "PAUD & TK",
    "Sekolah Dasar (SD)",
    "SMP & SMA",
  ];

  const gradeOptions: { [key: string]: string[] } = {
    "PAUD & TK": ["PAUD A", "PAUD B", "TK A", "TK B"],
    "Sekolah Dasar (SD)": ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"],
    "SMP & SMA": ["Kelas 7", "Kelas 8", "Kelas 9", "Kelas 10", "Kelas 11", "Kelas 12"],
  };

  async function fetchRegistrations() {
    try {
      const res = await fetch("/api/pendaftaran");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setRegistrations(data.registrations);
    } catch (err) {
      setError("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      student_name: "",
      parent_name: "",
      email: "",
      phone: "",
      selected_program: "",
      grade: "",
      school_name: "",
      address: "",
      district: "",
      city: ""
    });
    setShowModal(true);
  };

  const openEditModal = (registration: Registration) => {
    setModalMode("edit");
    setEditingRegistration(registration);
    setFormData({
      student_name: registration.student_name,
      parent_name: registration.parent_name,
      email: registration.email,
      phone: registration.phone,
      selected_program: registration.selected_program,
      grade: registration.grade,
      school_name: registration.school_name,
      address: registration.address,
      district: registration.district,
      city: registration.city
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (modalMode === "add") {
        const res = await fetch("/api/pendaftaran", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setRegistrations([data.registration, ...registrations]);
      } else if (editingRegistration) {
        const res = await fetch(`/api/pendaftaran/${editingRegistration.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setRegistrations(
          registrations.map((reg) =>
            reg.id === editingRegistration.id ? data.registration : reg
          )
        );
      }
      setShowModal(false);
    } catch (err: any) {
      setError(err.message || "Failed to process registration");
    } finally {
      setSubmitting(false);
    }
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
        ...(name === 'selected_program' && { grade: '' }),
      });
    };
    
  const handleDeleteRegistration = async (id: number) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const res = await fetch(`/api/pendaftaran/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setRegistrations(registrations.filter((reg) => reg.id !== id));
    } catch (err) {
      setError("Failed to delete registration");
    }
  };

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-700">Manajemen Pendaftaran</h2>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-700">Daftar Pendaftaran</h3>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={openAddModal}
                >
                  Tambah Pendaftaran
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-6 text-center">
                <Loader2 className="animate-spin h-8 w-8 mx-auto text-blue-500" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Siswa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Orang Tua</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kelas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {registrations.map((registration, index) => (
                      <tr key={registration.id}>
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{registration.student_name}</td>
                        <td className="px-6 py-4">{registration.parent_name}</td>
                        <td className="px-6 py-4">{registration.selected_program}</td>
                        <td className="px-6 py-4">{registration.grade}</td>
                        <td className="px-6 py-4">
                          <button
                            className="text-blue-600 hover:text-blue-800 mr-3"
                            onClick={() => openEditModal(registration)}
                          >
                            Ubah
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteRegistration(registration.id)}
                          >
                            Hapus
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
                  {modalMode === "add" ? "Tambah Pendaftaran Baru" : "Ubah Pendaftaran"}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nama Siswa</label>
                    <input
                      type="text"
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Nama Orang Tua</label>
                    <input
                      type="text"
                      value={formData.parent_name}
                      onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Telepon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="selected_program" className="block text-sm font-medium text-gray-700 mb-2">
                      Program
                    </label>
                    <select
                      id="selected_program"
                      name="selected_program"
                      value={formData.selected_program}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Pilih program</option>
                      {programs.map((program, i) => (
                        <option key={i} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>

                  {formData.selected_program && (
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                        Kelas
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Pilih kelas</option>
                        {gradeOptions[formData.selected_program]?.map((grade, i) => (
                          <option key={i} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Nama Sekolah</label>
                    <input
                      type="text"
                      value={formData.school_name}
                      onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Alamat</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Kecamatan</label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Kota</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Memproses...
                      </>
                    ) : modalMode === "add" ? (
                      "Tambah Pendaftaran"
                    ) : (
                      "Perbarui Pendaftaran"
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
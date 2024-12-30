'use client';
import React, { useState } from "react";
import Link from "next/link";
import Navbar from '@/components/navbar';

// Simple Alert Component
const Alert = ({ children, variant = 'success' }: { children: React.ReactNode; variant?: 'success' | 'error' }) => {
  const baseStyles = "p-4 rounded-lg mb-6";
  const variantStyles = {
    success: "bg-green-50 text-green-800 border border-green-200",
    error: "bg-red-50 text-red-800 border border-red-200"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </div>
  );
};

const PendaftaranForm = () => {
  const [formData, setFormData] = useState<{
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
  }>({
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === 'selected_program' && { grade: '' }),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/pendaftaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setSubmitStatus({
        success: true,
        message: 'Pendaftaran berhasil! Kami akan menghubungi Anda segera.',
      });

      // Optional: Send WhatsApp notification
      const message = `Pendaftaran baru:
Nama Siswa: ${formData.student_name}
Nama Orang Tua: ${formData.parent_name}
Email: ${formData.email}
No. Telepon: ${formData.phone}
Program: ${formData.selected_program}
Kelas: ${formData.grade}
Sekolah: ${formData.school_name}
Alamat: ${formData.address}
Kecamatan: ${formData.district}
Kota: ${formData.city}`;
      
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/6289631959567?text=${encodedMessage}`, '_blank');

      // Reset form
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
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit registration',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-600 py-12 sm:py-16 mt-10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Bergabung dengan Bimbel Cabaca
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Langkah pertama menuju kesuksesan akademik Anda bersama tim pengajar profesional kami
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16 bg-gray-50 -mt-8">
        <div className="container mx-auto px-4 sm:px-6">
          {submitStatus && (
            <Alert variant={submitStatus.success ? 'success' : 'error'}>
              {submitStatus.message}
            </Alert>
          )}

          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Form Pendaftaran
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Siswa */}
              <div>
                <label htmlFor="student_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap Siswa
                </label>
                <input
                  type="text"
                  id="student_name"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama lengkap siswa"
                  required
                />
              </div>

              {/* Nama Orang Tua */}
              <div>
                <label htmlFor="parent_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Orang Tua/Wali
                </label>
                <input
                  type="text"
                  id="parent_name"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama orang tua/wali"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan email"
                  required
                />
              </div>

              {/* Nomor Telepon */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon (WhatsApp)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nomor WhatsApp"
                  required
                />
              </div>

              {/* Program */}
              <div>
                <label htmlFor="selected_program" className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Program
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
                    <option key={i} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kelas */}
              {formData.selected_program && (
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Kelas
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
                      <option key={i} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Nama Sekolah */}
              <div>
                <label htmlFor="school_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  id="school_name"
                  name="school_name"
                  value={formData.school_name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama sekolah"
                  required
                />
              </div>

              {/* Alamat Lengkap */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan alamat lengkap (nama jalan, nomor rumah, RT/RW)"
                  required
                />
              </div>

              {/* Kecamatan */}
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                  Kecamatan
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan kecamatan"
                  required
                />
              </div>

              {/* Kota */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  Kota
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan kota"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 mt-4 font-semibold rounded-lg ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white focus:ring-2 focus:ring-blue-500`}
              >
                {isSubmitting ? 'Mendaftarkan...' : 'Daftar Sekarang'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PendaftaranForm;
import React from 'react';
import Navbar from '@/components/navbar';
import Link from 'next/link';

const AboutPage = () => {
  const stats = [
    { label: "Tahun Pengalaman", value: "10+" },
    { label: "Siswa Aktif", value: "500+" },
    { label: "Pengajar Profesional", value: "25+" },
    { label: "Tingkat Kelulusan", value: "95%" }
  ];

  const values = [
    {
      title: "Kualitas",
      description: "Kami berkomitmen memberikan pendidikan berkualitas tinggi dengan pengajar terbaik dan kurikulum terstruktur."
    },
    {
      title: "Inovasi",
      description: "Terus mengembangkan metode pembelajaran yang efektif dan menyenangkan sesuai perkembangan zaman."
    },
    {
      title: "Integritas",
      description: "Mengedepankan kejujuran dan transparansi dalam setiap aspek layanan pendidikan kami."
    },
    {
      title: "Kepedulian",
      description: "Memberikan perhatian personal pada setiap siswa untuk memastikan perkembangan optimal mereka."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Tentang Pendidikan Kami</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Komitmen kami untuk menyediakan pendidikan terbaik bagi putra-putri Anda
            </p>
          </div>
        </div>
      </section>

      {/* About Education Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <img 
                src="/assets/about-education.jpg" 
                alt="Suasana Belajar di Bimbel Cabaca" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pendekatan Pendidikan</h2>
              <p className="text-gray-600 mb-4">
                Pendidikan adalah pondasi masa depan. Di Bimbel Cabaca, kami mengembangkan metode pengajaran yang berpusat pada siswa, 
                memastikan setiap anak mendapatkan perhatian penuh dan materi pembelajaran yang relevan dengan kebutuhan mereka.
              </p>
              <p className="text-gray-600 mb-4">
                Kami percaya bahwa setiap siswa memiliki potensi unik. Dengan kurikulum terstruktur, fasilitas modern, dan tim pengajar profesional, 
                kami mendukung mereka untuk meraih prestasi terbaik.
              </p>
              <p className="text-gray-600">
                Fokus kami adalah menciptakan lingkungan belajar yang inspiratif dan menyenangkan sehingga siswa tidak hanya belajar, 
                tetapi juga mencintai prosesnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Wujudkan Masa Depan Gemilang Bersama Kami
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Daftarkan anak Anda untuk mendapatkan pengalaman belajar yang tak terlupakan dan berkualitas tinggi
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/program"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Lihat Program
            </Link>
            <Link 
              href="/daftar"
              className="px-8 py-3 border border-white text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

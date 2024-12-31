import React from 'react';
import Navbar from '@/components/navbar';
import Link from 'next/link';

const ProgramPage = () => {
  const programs = [
    {
      title: "Program Calistung",
      description: "Program khusus untuk anak usia 4-7 tahun untuk belajar membaca, menulis, dan berhitung dengan metode yang menyenangkan.",
      features: ["Metode belajar sambil bermain", "Rasio guru dan murid 1:5", "Evaluasi berkala", "Laporan perkembangan"],
      level: "TK - SD Kelas 1",
      duration: "3 bulan",
      schedule: "2x seminggu"
    },
    {
      title: "Program Reguler SD",
      description: "Program bimbingan belajar untuk siswa SD dengan fokus pada mata pelajaran utama sesuai kurikulum nasional.",
      features: ["Semua mata pelajaran inti", "Try out berkala", "Bimbingan PR", "Konsultasi belajar"],
      level: "SD Kelas 1-6",
      duration: "6 bulan",
      schedule: "3x seminggu"
    },
    {
      title: "Program Reguler SMP",
      description: "Program bimbingan komprehensif untuk mempersiapkan siswa menghadapi ujian dan meningkatkan prestasi akademik.",
      features: ["Persiapan ujian", "Latihan soal intensif", "Pembahasan detail", "Monitoring progres"],
      level: "SMP Kelas 7-9",
      duration: "6 bulan",
      schedule: "3x seminggu"
    },
    {
      title: "Program Intensif",
      description: "Program persiapan khusus untuk ujian sekolah, ujian nasional, dan persiapan masuk SMP/SMA favorit.",
      features: ["Drilling soal", "Try out mingguan", "Simulasi ujian", "Strategi ujian"],
      level: "SD Kelas 6 & SMP Kelas 9",
      duration: "4 bulan",
      schedule: "4x seminggu"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Program Bimbel Cabaca</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Pilih program yang sesuai dengan kebutuhan belajar Anda
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Fitur Program:</h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <span className="text-blue-600 mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700">Tingkat:</span>
                        <span className="ml-2 text-gray-600">{program.level}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700">Durasi:</span>
                        <span className="ml-2 text-gray-600">{program.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700">Jadwal:</span>
                        <span className="ml-2 text-gray-600">{program.schedule}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link 
                      href="/daftar"
                      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Daftar Program
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Mulai Belajar di Bimbel Cabaca</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut tentang program dan jadwal bimbingan belajar
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/daftar"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Daftar Sekarang
            </Link>
            <Link 
              href="/kontak"
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramPage;
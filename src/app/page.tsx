import React from 'react';
import Link from "next/link";
import Navbar from '@/components/navbar';
import HeroBanner from '@/components/banner';
import BlogPreview from '@/components/blog';
import ProgramPreview from '@/components/program';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner />
      <BlogPreview />
      <ProgramPreview />
      {/* Keunggulan Preview */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-full md:w-1/2">
              <img 
                src="/assets/Calistung.jpg" 
                alt="Suasana Belajar" 
                className="rounded-lg w-full h-auto object-cover shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Mengapa Bimbel Cabaca?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                Bimbel Cabaca hadir dengan metode pembelajaran yang efektif dan menyenangkan. 
                Didukung oleh tim pengajar profesional dan berpengalaman, kami berkomitmen untuk 
                membantu siswa mencapai prestasi akademik terbaiknya. Dengan fasilitas modern dan 
                kurikulum yang terstruktur, kami menciptakan lingkungan belajar yang optimal.
              </p>
              <Link 
                href="/tentang-kami" 
                className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center group"
              >
                <span>Pelajari Lebih Lanjut</span>
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Daftar CTA */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Siap Untuk Bergabung?</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan raih prestasi akademik terbaikmu bersama Bimbel Cabaca!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
            <Link 
              href="/daftar" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
            >
              Daftar Sekarang
            </Link>
            <Link 
              href="/program" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base font-medium"
            >
              Lihat Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

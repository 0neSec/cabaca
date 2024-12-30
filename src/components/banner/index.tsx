'use client'
import { useState } from 'react';
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative pt-16 sm:pt-24 md:pt-24 pb-8 sm:pb-12 mt-4 overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background elements - adjusted for mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-4 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-8 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          <div className="w-full md:w-1/2 animate-fade-in text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 sm:mb-6 text-xs sm:text-sm text-blue-600 hover:bg-white transition-all mx-auto md:mx-0">
              <Sparkles size={14} className="sm:w-4 sm:h-4" />
              <span className="line-clamp-1">Solusi Belajar Terbaik untuk Masa Depan Cerah</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight animate-slide-up">
              Wujudkan Mimpi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Bersama Cabaca Al-Mughni
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 animate-fade-in animation-delay-500 max-w-2xl mx-auto md:mx-0">
              Bimbingan belajar berkualitas dengan pengajar berpengalaman, metode pembelajaran modern, dan komunitas belajar yang mendukung kesuksesan Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start animate-fade-in animation-delay-1000">
              <Link 
                href="/daftar"
                className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg overflow-hidden transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-lg text-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Daftar Sekarang
                  <ArrowRight 
                    size={18} 
                    className={`transition-transform duration-300 ${
                      isHovered ? 'translate-x-1' : ''
                    }`}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link 
                href="/program" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 text-blue-600 hover:text-blue-700 transition text-center"
              >
                Lihat Program
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 animate-fade-in animation-delay-1500 px-4 sm:px-0">
            <div className="relative max-w-lg mx-auto">
              <img 
                src="assets/tk.jpg"
                alt="Suasana Belajar di Bimbel Cabaca"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 hover:shadow-blue-200 w-full h-auto"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
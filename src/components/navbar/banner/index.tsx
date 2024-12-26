'use client'
import { useState } from 'react';
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 text-sm text-blue-600 hover:bg-white transition-all">
              <Sparkles size={16} />
              <span>Solusi Belajar Terbaik untuk Masa Depan Cerah</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
              Wujudkan Mimpi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Bersama Cabaca
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 animate-fade-in animation-delay-500">
              Bimbingan belajar berkualitas dengan pengajar berpengalaman, metode pembelajaran modern, dan komunitas belajar yang mendukung kesuksesan Anda.
            </p>
            
            <div className="flex gap-4 items-center animate-fade-in animation-delay-1000">
              <Link 
                href="/daftar"
                className="group relative px-8 py-3 bg-blue-600 text-white rounded-lg overflow-hidden transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Daftar Sekarang
                  <ArrowRight 
                    size={20}
                    className={`transition-transform duration-300 ${
                      isHovered ? 'translate-x-1' : ''
                    }`}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link 
                href="/program" 
                className="px-8 py-3 text-blue-600 hover:text-blue-700 transition"
              >
                Lihat Program
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 animate-fade-in animation-delay-1500">
            <div className="relative">
              <img 
                src="assets/tk.jpg"
                alt="Suasana Belajar di Bimbel Cabaca"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 hover:shadow-blue-200"
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
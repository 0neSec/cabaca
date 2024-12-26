'use client'
import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-indigo-600 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-xl md:text-2xl font-bold text-white">Bimbel Cabaca</span>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex justify-center flex-1 mx-8">
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                Beranda
              </Link>
              <Link href="/tentang" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                Tentang
              </Link>
              <Link href="/program" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                Program
              </Link>
              <Link href="/kontak" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                Kontak
              </Link>
            </div>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/auth/login" 
              className="px-4 py-2 text-gray-200 hover:text-white transition-colors duration-200 font-medium"
            >
              Masuk
            </Link>
            <Link 
              href="/auth/register" 
              className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold shadow-md"
            >
              Daftar
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isOpen ? "block" : "hidden"
          } pb-4 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="text-gray-200 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
              onClick={toggleMenu}
            >
              Beranda
            </Link>
            <Link
              href="/tentang"
              className="text-gray-200 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
              onClick={toggleMenu}
            >
              Tentang
            </Link>
            <Link
              href="/program"
              className="text-gray-200 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
              onClick={toggleMenu}
            >
              Program
            </Link>
            <Link
              href="/kontak"
              className="text-gray-200 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
              onClick={toggleMenu}
            >
              Kontak
            </Link>
            <div className="pt-2 space-y-2">
              <Link
                href="/auth/login"
                className="block text-gray-200 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
                onClick={toggleMenu}
              >
                Masuk
              </Link>
              <Link
                href="/auth/register"
                className="block bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
                onClick={toggleMenu}
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
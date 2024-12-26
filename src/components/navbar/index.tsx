// components/navbar.tsx
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          <div className="flex items-center gap-2 w-1/4">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="w-auto h-8"
            />
            <span className="text-xl font-bold text-gray-800">Brand</span>
          </div>
          
          <div className="flex justify-center w-2/4">
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
          
          <div className="flex justify-end w-1/4">
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/auth/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
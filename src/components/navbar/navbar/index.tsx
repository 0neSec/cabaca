import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-indigo-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          <div className="flex items-center gap-3 w-1/4">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">Bimbel Cabaca</span>
          </div>
          
          <div className="flex justify-center w-2/4">
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                About
              </Link>
              <Link href="/services" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                Services
              </Link>
              <Link href="/contact" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="flex justify-end w-1/4">
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/login" 
                className="px-4 py-2 text-gray-200 hover:text-white transition-colors duration-200 font-medium"
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold shadow-md"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
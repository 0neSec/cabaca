'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GraduationCap, Menu, X, User, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: 0 | 1 | 2;
  status: 0 | 1;
  token?: string;
}

interface NavigationItem {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login');
    router.refresh();
  };

  // Base navigation items
  const baseNavigationItems: NavigationItem[] = [
    { href: "/", label: "Beranda" },
    { href: "/tentang", label: "Tentang" },
    { href: "/program", label: "Program" },
  ];

  // Get navigation items based on user role
  const getNavigationItems = (): NavigationItem[] => {
    if (user?.role === 0) {
      return [
        ...baseNavigationItems,
      ];
    }
    return baseNavigationItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="fixed top-0 z-50 w-full bg-indigo-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-xl md:text-2xl font-bold text-white">Bimbel Cabaca</span>
          </div>
          
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

          <div className="hidden md:flex justify-center flex-1 mx-8">
            <div className="flex space-x-8">
              {navigationItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="text-gray-200 hover:text-white transition-colors duration-200 font-medium flex items-center gap-2"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-white hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    {user.role === 0 && (
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    )}
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Pengaturan
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <div
          className={`md:hidden ${
            isOpen ? "block" : "hidden"
          } pb-4 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-200 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                onClick={toggleMenu}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-white px-4 py-2">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </div>
                  {user.role === 0 && (
                    <Link
                      href="/dashboard"
                      className="block text-gray-200 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/settings"
                    className="block text-gray-200 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    Pengaturan
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
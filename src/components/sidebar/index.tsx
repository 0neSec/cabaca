'use client'
import { useState } from "react";
import Link from "next/link";
import { Home, User, Settings, FileText, ChevronDown, ChevronUp, FolderOpen, Edit, Menu, X, BookUser } from "lucide-react";

interface MenuItem {
  isOpen?: boolean;
  children?: MenuItem[];
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: { 
  sidebarOpen: boolean, 
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> 
}) => {
  const [blogMenuOpen, setBlogMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        aria-label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl z-50 w-64 h-full fixed top-0 left-0 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 text-center border-b border-blue-500">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            {/* Home */}
            <li>
              <Link
                href="/"
                className="flex items-center space-x-4 px-6 py-2 text-lg hover:bg-blue-500 rounded-md transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Beranda</span>
              </Link>
            </li>

            {/* Dashboard */}
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-4 px-6 py-2 text-lg hover:bg-blue-500 rounded-md transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Blog with Submenu */}
            <li>
              <button
                onClick={() => setBlogMenuOpen(!blogMenuOpen)}
                className="flex items-center justify-between w-full px-6 py-2 text-lg hover:bg-blue-500 rounded-md transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="w-5 h-5" />
                  <span>Blog</span>
                </div>
                {blogMenuOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {/* Blog Submenu */}
              {blogMenuOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link
                      href="/dashboard/blog/"
                      className="flex items-center space-x-4 px-6 py-2 text-sm hover:bg-blue-500 rounded-md transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/blog/categories"
                      className="flex items-center space-x-4 px-6 py-2 text-sm hover:bg-blue-500 rounded-md transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <FolderOpen className="w-4 h-4" />
                      <span>Categories</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* User */}
            <li>
              <Link
                href="/dashboard/user"
                className="flex items-center space-x-4 px-6 py-2 text-lg hover:bg-blue-500 rounded-md transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>User</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/pendaftaran"
                className="flex items-center space-x-4 px-6 py-2 text-lg hover:bg-blue-500 rounded-md transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <BookUser  className="w-5 h-5" />
                <span>pendaftaran</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
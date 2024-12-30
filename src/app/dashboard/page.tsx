// src/app/dashboard/page.tsx
'use client'
import Sidebar from "@/components/sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full md:ml-64 bg-gray-50">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-lg p-6">
          <button
            className="text-gray-600 md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h3>
        </main>
      </div>
    </div>
  );
}

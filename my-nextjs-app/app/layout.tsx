"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/auth/login";
  };

  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="relative min-h-screen flex flex-col bg-blue-400 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans antialiased">
        {/* Header */}
        <header className="z-50 bg-blue-600 dark:bg-gray-800 text-white shadow-md flex justify-center align-middle w-full">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a
              href="/"
              className="text-2xl font-bold hover:underline focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
              Homepage
            </a>
            <ul className="flex items-center space-x-6"> {/* Increased spacing for better aesthetic */}
              {isAuthenticated ? (
                <>
                  <li>
                    <a
                      href="/profile"
                      className="hover:underline hover:text-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200 ease-in-out" // Added transition effect
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:underline hover:text-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200 ease-in-out"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <a
                      href="/admin/tickets"
                      className="hover:underline hover:text-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200 ease-in-out"
                    >
                      Admin Tickets
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      href="/auth/login"
                      className="hover:underline hover:text-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200 ease-in-out"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/auth/register"
                      className="hover:underline hover:text-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200 ease-in-out"
                    >
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
  
        {/* Main Content */}
        <main className="z-10 flex-grow container mx-auto px-6 py-8 relative flex flex-col items-center justify-center"> {/* Centered content */}
          {children}
        </main>
  
        {/* Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-gray-800 opacity-50 z-0"></div>
      </body>
    </html>
  );
}

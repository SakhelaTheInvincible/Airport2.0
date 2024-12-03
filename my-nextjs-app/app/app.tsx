"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import "./globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="bg-blue-600 dark:bg-gray-800 text-white shadow-md z-50 flex justify-center align-middle w-full">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Homepage Link */}
          <a
            href="/"
            className="text-xl font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Homepage
          </a>
          {/* Navigation Links */}
          <ul className="flex space-x-8 justify-center flex-1">
            {isAuthenticated ? (
              <>
                <li>
                  <a
                    href="/profile"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <a
                    href="/admin/tickets"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/auth/register"
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
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
      <main className="container mx-auto px-6 py-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default App;

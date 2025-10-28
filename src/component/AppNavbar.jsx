import React, { useState } from "react";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((s) => !s);

  return (
    <header className="sticky w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/Ticket_Management_System_React"
              className="text-xl font-bold text-cyan-600"
            >
              Ticket management
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <Link
                to="dashboard"
                className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="mobile-menu-button"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {!isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md rounded-b-lg border-t border-gray-100">
            <div className="px-4 pt-3 pb-5 space-y-4">
              <div className="pt-2 space-y-3">
                <Link
                  to="dashboard"
                  className="mobile-get-started-btn block text-center w-full px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-md shadow hover:opacity-90 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="signup"
                  className="mobile-login-btn block text-center w-full px-4 py-2 text-gray-800 font-medium border border-gray-200 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default AppNavbar;

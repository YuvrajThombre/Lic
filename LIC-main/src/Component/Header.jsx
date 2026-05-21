import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPlansDropdownOpen, setIsPlansDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const planCategories = [
    { name: 'Term Insurance Plans', link: '/category/Term%20Insurance%20Plans' },
    { name: 'Pension Schemes', link: '/category/Pension%20Schemes' },
    { name: 'Unit Linked Plans', link: '/category/Unit%20Linked%20Plans' },
    { name: 'Withdrawn Plans', link: '/category/Withdrawn%20Plans' },
    { name: 'Micro Insurance Plans', link: '/category/Micro%20Insurance%20Plans' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo + WhatsApp */}
          <div className="flex items-center gap-4">
            <img
              className="h-10 w-auto"
              src="https://licindia.in/o/lic-theme/images/lic_logo.png"
              alt="LIC Logo"
            />
            <div className="hidden sm:flex flex-col text-sm text-gray-800 font-medium">
              <span className="text-xs text-blue-900 font-semibold">RUSHIKESH</span>
              <div className="flex items-center gap-2">
                <FaWhatsapp className="text-green-500 text-base" />
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10 text-gray-800 font-medium text-sm tracking-wide">
            {['Home', 'Plans', 'Blogs', 'Contact'].map((link) => (
              <div
                key={link}
                className="relative group"
                onMouseEnter={() => link === 'Plans' && setIsPlansDropdownOpen(true)}
                onMouseLeave={() => link === 'Plans' && setIsPlansDropdownOpen(false)}
              >
                <Link to={`/${link.toLowerCase()}`} className="relative group">
                  {link}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                {link === 'Plans' && isPlansDropdownOpen && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                    {planCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-inner px-4 pt-4 pb-6 space-y-4 text-gray-800 font-medium animate-slide-in">
          <div className="text-center text-blue-900 font-bold text-lg tracking-widest animate-fade-in">
            RUSHIKESH AHER
          </div>
          {['Home', 'Plans', 'Blogs', 'Contact'].map((link) => (
            <div key={link}>
              <div className="flex items-center justify-between">
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="block text-base hover:text-black transition py-2"
                  onClick={() => link === 'Plans' && setIsPlansDropdownOpen(!isPlansDropdownOpen)}
                >
                  {link}
                </Link>
                {link === 'Plans' && (
                  <button
                    onClick={() => setIsPlansDropdownOpen(!isPlansDropdownOpen)}
                    className="text-gray-600 hover:text-black focus:outline-none"
                    aria-label="Toggle plans submenu"
                  >
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-200 ${
                        isPlansDropdownOpen ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
              {link === 'Plans' && isPlansDropdownOpen && (
                <div className="pl-6 space-y-2 mt-2 border-l-2 border-gray-200">
                  {planCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.link}
                      className="block text-sm text-gray-700 hover:text-blue-600 transition py-1"
                      onClick={() => {
                        setIsOpen(false); // Close mobile menu on category click
                        setIsPlansDropdownOpen(false); // Close submenu
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2 pt-4 border-t text-sm">
            <FaWhatsapp className="text-green-500" />
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              +91 98765 43210
            </a>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;
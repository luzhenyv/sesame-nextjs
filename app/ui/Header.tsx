'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { UserCircle, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import MobileMenu from './MobileMenu';

// Mock authentication state - replace with your actual auth implementation
const useAuth = () => {
  // This is a placeholder - replace with your actual auth state management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // For demo purposes, toggle auth state on component mount
  useEffect(() => {
    // Simulate checking auth state
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);
  
  return { isAuthenticated };
};

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  // Navigation links based on authentication state
  const navLinks = isAuthenticated 
    ? [
        { href: '/', label: 'Home' },
        { href: '/family', label: 'Family' },
        { href: '/profile', label: 'Profile' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/login', label: 'Login' },
      ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center text-primary font-medium">
                LOGO
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-foreground hover:opacity-80 transition-opacity',
                  pathname === link.href && 'font-medium border-b-2 border-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Profile Picture (Desktop) */}
          {isAuthenticated && (
            <div className="hidden md:block">
              <Link href="/profile" className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-accent">
                  <UserCircle className="w-full h-full text-primary" />
                </div>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-foreground hover:opacity-80 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navLinks={navLinks}
        isAuthenticated={isAuthenticated}
      />
    </header>
  );
} 
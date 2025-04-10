'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircle, X } from 'lucide-react';
import clsx from 'clsx';

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  isAuthenticated: boolean;
}

export default function MobileMenu({ isOpen, onClose, navLinks, isAuthenticated }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/30 md:hidden"
            onClick={onClose}
          />
          
          {/* Slide-out menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-background shadow-lg md:hidden z-50"
          >
            <div className="flex justify-end p-4">
              <button
                type="button"
                className="text-foreground hover:opacity-80 focus:outline-none"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="px-4 py-2 bg-background/95 backdrop-blur-sm border-y border-accent/20">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={clsx(
                        'block py-2 text-lg text-foreground hover:opacity-80 transition-opacity',
                        pathname === link.href && 'font-medium border-l-2 border-primary pl-2'
                      )}
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Profile Picture (Mobile) */}
            {isAuthenticated && (
              <div className="absolute bottom-4 left-0 right-0 px-4">
                <Link href="/profile" className="flex items-center space-x-3" onClick={onClose}>
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-accent">
                    <UserCircle className="w-full h-full text-primary" />
                  </div>
                  <span className="text-foreground">Profile</span>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 
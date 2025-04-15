'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

// Types for navigation items
type NavItem = {
  href: string;
  label: string;
  isExternal?: boolean;
};

// Types for footer sections
type FooterSection = {
  title: string;
  items: NavItem[];
};

// Footer data
const footerSections: FooterSection[] = [
  {
    title: 'Services',
    items: [
      { href: '/', label: 'Home' },
      { href: '/family', label: 'Family' },
      { href: '/profile', label: 'Profile' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/data-usage', label: 'Data Usage Policy' },
    ],
  },
  {
    title: 'Trust',
    items: [
      { href: '/hipaa', label: 'HIPAA Compliance' },
      { href: '/hitrust', label: 'HITRUST CSF Certification' },
    ],
  },
  {
    title: 'Contact',
    items: [
      { href: 'https://twitter.com', label: 'Twitter', isExternal: true },
      { href: 'https://facebook.com', label: 'Facebook', isExternal: true },
      { href: 'https://tiktok.com', label: 'TikTok', isExternal: true },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Hide footer on login page
  if (pathname === '/login') {
    return null;
  }

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] text-[#CCCCCC] z-40">
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-white text-lg font-medium">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                      className={clsx(
                        'text-[#808080] hover:text-white hover:opacity-90 transition-all duration-200',
                        'hover:tracking-[0.5px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {footerSections.map((section) => (
            <div key={section.title} className="border-b border-[#333333]">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex justify-between items-center py-4 text-white text-lg font-medium"
                aria-expanded={expandedSections[section.title]}
              >
                {section.title}
                <ChevronDown
                  className={clsx(
                    'w-5 h-5 transition-transform duration-300',
                    expandedSections[section.title] && 'transform rotate-180'
                  )}
                />
              </button>
              <div
                className={clsx(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  expandedSections[section.title] ? 'max-h-96' : 'max-h-0'
                )}
              >
                <ul className="py-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        target={item.isExternal ? '_blank' : undefined}
                        rel={item.isExternal ? 'noopener noreferrer' : undefined}
                        className="block py-2 text-[#808080] hover:text-white transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Compliance Bar */}
      <div className="border-t border-[#333333]">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/hipaa-shield.svg"
                alt="HIPAA compliant data storage"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-sm text-[#808080]">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/hitrust-csf.svg"
                alt="HITRUST CSF certified"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-sm text-[#808080]">HITRUST CSF Certified</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#808080]">© 2024 Sesame Health LLC. All rights reserved.</span>
            <Link
              href="/data-usage"
              className="text-sm text-[#808080] hover:text-white transition-colors duration-200"
              aria-label="View data usage policy"
            >
              Data Usage
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
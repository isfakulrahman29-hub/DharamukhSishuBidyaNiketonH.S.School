'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ChevronDown, MapPin, Phone, Mail, Globe, GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const mainLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Teachers', href: '/teachers' },
    { name: 'Admission', href: '/admission' },
    { name: 'Notices', href: '/notices' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const moreLinks = [
    { name: 'Principal', href: '/principal' },
    { name: 'Director', href: '/director' },
    { name: 'Classes', href: '/classes' },
    { name: 'Student Services', href: '/student-services' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="w-full bg-white shadow-md z-50 sticky top-0">
      {/* Top Bar */}
      <div className="hidden md:flex bg-blue-900 text-white text-xs py-2 px-4 justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Phone size={12} /> +91 9678661642</span>
          <span className="flex items-center gap-1"><Mail size={12} /> dharamukhsishubidyaniketon@gmail.com</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/admin/login" className="hover:text-yellow-400 transition">{t('adminLogin')}</Link>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-blue-950 uppercase">{t('schoolName')}</span>
                <span className="text-xs text-slate-500">{t('schoolSubtitle')}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1 items-center">
            {mainLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-md transition"
              >
                {t(link.name.toLowerCase()) !== link.name.toLowerCase() ? t(link.name.toLowerCase()) : link.name}
              </Link>
            ))}
            
            <div className="relative group">
              <button 
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-md transition"
              >
                {t('more')} <ChevronDown size={14} className="ml-1" />
              </button>
              
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-slate-100">
                {moreLinks.map((link) => {
                  const tKey = link.name === 'Student Services' ? 'studentServices' : link.name.toLowerCase();
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                    >
                      {t(tKey) !== tKey ? t(tKey) : link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link 
              href="/inquiry" 
              className="ml-4 px-4 py-2 bg-yellow-500 text-blue-950 hover:bg-yellow-400 font-semibold rounded-md shadow-sm transition"
            >
              {t('admissionInquiry')}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-blue-700 focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 shadow-inner">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[70vh] overflow-y-auto">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:text-blue-700 hover:bg-slate-50"
              >
                {t(link.name.toLowerCase()) !== link.name.toLowerCase() ? t(link.name.toLowerCase()) : link.name}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-2 mt-2">
              <span className="block px-3 py-1 text-xs font-semibold text-slate-500 uppercase">{t('morePages')}</span>
              {moreLinks.map((link) => {
                const tKey = link.name === 'Student Services' ? 'studentServices' : link.name.toLowerCase();
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:text-blue-700 hover:bg-slate-50"
                  >
                    {t(tKey) !== tKey ? t(tKey) : link.name}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 px-3 pb-2">
              <Link
                href="/inquiry"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 bg-yellow-500 text-blue-950 font-bold rounded-md"
              >
                {t('admissionInquiry')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

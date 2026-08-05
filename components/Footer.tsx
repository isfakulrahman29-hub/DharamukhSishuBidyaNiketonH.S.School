'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, ArrowRight, GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-blue-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white p-2 rounded-md inline-flex">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white shadow-md">
                <GraduationCap size={16} />
              </div>
              <span className="font-bold text-sm text-blue-950 leading-tight uppercase">Dharamukh Sishu<br/>Bidya Niketon</span>
            </div>
            <p className="text-sm text-slate-400 mt-4">
              Providing quality education, character building, and holistic development since 2013. Co-educational Higher Secondary School in Nagaon, Assam.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-blue-800 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Academics', href: '/academics' },
                { name: 'Teachers & Staff', href: '/teachers' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Notice Board', href: '/notices' },
                { name: 'Events', href: '/events' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-yellow-400 transition flex items-center">
                    <ArrowRight size={12} className="mr-2" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-blue-800 pb-2">Important Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Govt. of Assam Education', href: 'https://education.assam.gov.lang' },
                { name: 'SEBA', href: 'https://sebaonline.org' },
                { name: 'AHSEC', href: 'https://ahsec.assam.gov.in' },
                { name: 'UDISE+', href: 'https://udiseplus.gov.in' },
                { name: 'Samagra Shiksha Assam', href: 'https://ssa.assam.gov.in' },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-yellow-400 transition flex items-center">
                    <ArrowRight size={12} className="mr-2" /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-blue-800 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-yellow-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">
                  Dharamukh, Bajbatamari,<br />
                  Nagaon, Assam, India<br />
                  PIN: Contact School
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-yellow-500 shrink-0" />
                <div className="flex flex-col text-sm text-slate-300">
                  <span>9954624624 (Director)</span>
                  <span>9678661642 (Principal)</span>
                </div>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-yellow-500 shrink-0" />
                <a href="mailto:dharamukhsishubidyaniketon@gmail.com" className="text-sm text-slate-300 hover:text-white transition break-all">
                  dharamukhsishubidyaniketon<br/>@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-blue-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} Dharamukh Sishu Bidya Niketon H.S. School. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/admin/login" className="hover:text-white transition">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

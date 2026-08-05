'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { auth } from '@/lib/firebase/client';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Allow login page to render without admin check
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading admin...</div>;
  }

  if (!user || !isAdmin) {
    // Should probably redirect, but we'll show a message for now
    router.push('/admin/login');
    return null;
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Website Content', href: '/admin/content', icon: FileText },
    { name: 'Teachers & Staff', href: '/admin/teachers', icon: Users },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    { name: 'Notices', href: '/admin/notices', icon: FileText },
    { name: 'Events', href: '/admin/events', icon: FileText },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-blue-950 text-white p-4 flex justify-between items-center">
        <span className="font-bold text-lg">DSBN Admin</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-blue-950 text-white flex-shrink-0 min-h-screen relative`}>
        <div className="p-6 border-b border-blue-900 hidden md:block">
          <h2 className="text-xl font-bold">DSBN Admin</h2>
          <p className="text-xs text-blue-300 mt-1">Content Management System</p>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-blue-800 text-white font-medium' 
                    : 'text-blue-100 hover:bg-blue-900'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-blue-900">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-blue-100 hover:bg-red-900 hover:text-white rounded-md transition"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Admin Top Bar */}
        <header className="bg-white shadow-sm border-b border-slate-200 p-4 flex justify-end items-center h-16">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">{user.email}</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

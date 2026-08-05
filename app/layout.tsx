import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { AuthProvider } from '@/components/AuthProvider';
import { LanguageProvider } from '@/components/LanguageProvider';

export const metadata: Metadata = {
  title: 'Dharamukh Sishu Bidya Niketon Higher Secondary School',
  description: 'Official website for Dharamukh Sishu Bidya Niketon Higher Secondary School, Nagaon, Assam. Classes 1 to 12.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans antialiased bg-slate-50" suppressHydrationWarning>
        <AuthProvider>
          <LanguageProvider>
            <Header />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
            <Chatbot />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

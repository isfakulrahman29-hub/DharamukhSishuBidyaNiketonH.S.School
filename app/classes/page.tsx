import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Classes | Dharamukh Sishu Bidya Niketon',
  description: 'Detailed class information for Dharamukh Sishu Bidya Niketon.',
};

export default function ClassesPage() {
  const classesList = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/academics" className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium">
            <ArrowLeft size={16} className="mr-2" /> Back to Academics
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 border-b pb-4">Our Classes</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classesList.map(num => (
            <div key={num} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-blue-950">Class {num}</h3>
              </div>
              <p className="text-slate-500 text-sm flex-grow text-center italic">
                Information will be updated soon.
              </p>
              <div className="mt-6 text-center">
                <Link href="/inquiry" className="text-sm font-semibold text-yellow-600 hover:text-yellow-700">
                  Inquire for Admission &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

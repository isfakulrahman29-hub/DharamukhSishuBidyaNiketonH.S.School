import { Metadata } from 'next';
import Image from 'next/image';
import { UserCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Principal | Dharamukh Sishu Bidya Niketon',
  description: 'Message from the Principal of Dharamukh Sishu Bidya Niketon Higher Secondary School.',
};

export default function PrincipalPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-blue-950 h-32 md:h-48"></div>
          <div className="px-8 md:px-12 pb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start relative -top-16">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl shrink-0 relative bg-gradient-to-br from-indigo-400 to-blue-600 flex items-center justify-center">
                <div className="z-0 flex flex-col items-center justify-center text-white text-center p-2 relative">
                  <UserCircle2 size={48} className="mb-2 opacity-80" />
                  <span className="text-xs font-medium opacity-90 leading-tight">Photo not<br/>available</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-10 bg-blend-overlay z-10 pointer-events-none"></div>
              </div>
              <div className="pt-16 md:pt-20">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Ziarul Hoque (Jitu Ahmed)</h1>
                <p className="text-xl text-blue-700 font-semibold">Principal / Headmaster</p>
              </div>
            </div>
            
            <div className="prose prose-blue max-w-none mt-2">
              <h2>Message from the Principal</h2>
              <p>
                Welcome to Dharamukh Sishu Bidya Niketon Higher Secondary School. It is with great pride and enthusiasm that I welcome you to our learning community.
              </p>
              <p>
                Since our establishment in 2013, our primary goal has been to provide an environment where every student can thrive academically, socially, and emotionally. We believe that education is a collaborative effort between the school, students, parents, and the community.
              </p>
              <p>
                Our dedicated faculty members are committed to fostering a culture of continuous learning and improvement. We strive to instill in our students the values of discipline, respect, and integrity, which we believe are essential for success in all walks of life.
              </p>
              <p>
                I invite you to explore our website to learn more about our programs and activities. We look forward to partnering with you in your child&apos;s educational journey.
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="font-serif text-2xl mb-4 text-slate-800">অধ্যক্ষৰ বাৰ্তা</h3>
                <p className="text-lg leading-relaxed text-slate-700">
                  ধৰমুখ শিশু বিদ্যা নিকেতন উচ্চতৰ মাধ্যমিক বিদ্যালয়লৈ আপোনালোকক স্বাগতম জনাইছো। ২০১৩ চনত প্ৰতিষ্ঠা হোৱাৰে পৰা আমাৰ লক্ষ্য হৈছে ছাত্ৰ-ছাত্ৰীসকলক এক সুস্থ শৈক্ষিক পৰিৱেশ প্ৰদান কৰা য&apos;ত তেওঁলোকে বৌদ্ধিক আৰু মানসিকভাৱে বিকাশ লাভ কৰিব পাৰে। আমাৰ শিক্ষক সমাজ সদায় ছাত্ৰ-ছাত্ৰীৰ সৰ্বাংগীণ উন্নতিৰ বাবে দায়বদ্ধ।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

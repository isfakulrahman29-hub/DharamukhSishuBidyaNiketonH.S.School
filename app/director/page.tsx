import { Metadata } from 'next';
import Image from 'next/image';
import { UserCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Director | Dharamukh Sishu Bidya Niketon',
  description: 'Message from the Director of Dharamukh Sishu Bidya Niketon Higher Secondary School.',
};

export default function DirectorPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-blue-900 h-32 md:h-48"></div>
          <div className="px-8 md:px-12 pb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start relative -top-16">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl shrink-0 relative bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
                <div className="z-0 flex flex-col items-center justify-center text-white text-center p-2 relative">
                  <UserCircle2 size={48} className="mb-2 opacity-80" />
                  <span className="text-xs font-medium opacity-90 leading-tight">Photo not<br/>available</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-10 bg-blend-overlay z-10 pointer-events-none"></div>
              </div>
              <div className="pt-16 md:pt-20">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Jahirul Islam</h1>
                <p className="text-xl text-blue-700 font-semibold">Director</p>
              </div>
            </div>
            
            <div className="prose prose-blue max-w-none mt-2">
              <h2>Message from the Director</h2>
              <p>
                Education is the foundation upon which we build our future. At Dharamukh Sishu Bidya Niketon, our vision has always been to provide quality education that is accessible and impactful.
              </p>
              <p>
                We have continuously worked to improve our infrastructure, upgrade our teaching methodologies, and expand our academic offerings from Class 1 up to Higher Secondary. We are deeply committed to the holistic development of every child who walks through our doors.
              </p>
              <p>
                Our institution stands as a beacon of learning in the Nagaon district, thanks to the unwavering support of parents, the dedication of our teachers, and the hard work of our students. We will continue our pursuit of excellence in education.
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="font-serif text-2xl mb-4 text-slate-800">সঞ্চালকৰ বাৰ্তা</h3>
                <p className="text-lg leading-relaxed text-slate-700">
                  শিক্ষা হৈছে আমাৰ ভৱিষ্যতৰ মূল ভেটি। ধৰমুখ শিশু বিদ্যা নিকেতনত আমাৰ লক্ষ্য হৈছে ছাত্ৰ-ছাত্ৰীসকলক গুণগত শিক্ষা প্ৰদান কৰা। আমি বিশ্বাস কৰো যে সঠিক শিক্ষাই এখন সমাজ পৰিৱৰ্তন কৰিব পাৰে। অভিভাৱক আৰু সমাজৰ সহায়-সহযোগিতাৰে আমি আমাৰ এই যাত্ৰা অব্যাহত ৰাখিম।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

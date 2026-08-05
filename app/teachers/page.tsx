import { Metadata } from 'next';
import Image from 'next/image';
import { UserCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teachers & Staff | Dharamukh Sishu Bidya Niketon',
  description: 'Meet our experienced faculty and staff.',
};

const DEMO_TEACHERS = [
  { id: 1, name: 'Anup Kumar Barman', subject: 'Mathematics', role: 'Senior Teacher', gender: 'male', color: 'from-blue-400 to-indigo-600', photoUrl: '/images/teachers/teacher-3.jpg' },
  { id: 2, name: 'Mridula Sharma', subject: 'Science', role: 'Head of Department', gender: 'female', color: 'from-pink-400 to-rose-600', photoUrl: '/images/teachers/teacher-4.jpg' },
  { id: 3, name: 'Rupjyoti Das', subject: 'Assamese', role: 'Teacher', gender: 'male', color: 'from-amber-400 to-orange-600', photoUrl: '/images/teachers/teacher-rupjyoti-das.jpg' },
  { id: 4, name: 'Nibedita Kalita', subject: 'English', role: 'Teacher', gender: 'female', color: 'from-emerald-400 to-teal-600', photoUrl: '/images/teachers/teacher-nibedita-kalita.jpg' },
  { id: 5, name: 'Bidyut Saikia', subject: 'Social Studies', role: 'Teacher', gender: 'male', color: 'from-purple-400 to-violet-600', photoUrl: '/images/teachers/teacher-5.jpg' },
  { id: 6, name: 'Manasi Deka', subject: 'Computer Science', role: 'Teacher', gender: 'female', color: 'from-cyan-400 to-blue-600', photoUrl: null },
];

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20 -z-10"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 mb-6 drop-shadow-sm">Teachers & Staff</h1>
          <p className="text-lg text-slate-600 font-medium">
            Meet the dedicated educators and staff members who make our school a great place to learn and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {DEMO_TEACHERS.map((teacher) => (
            <div 
              key={teacher.id}
              className="relative group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col items-center text-center"
            >
              {/* 3D Icon Container */}
              <div className={`w-32 h-32 rounded-full mb-6 relative flex items-center justify-center bg-gradient-to-br ${teacher.color} shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] border-4 border-white transform group-hover:scale-105 transition-transform duration-300 overflow-hidden`}>
                <div className="absolute inset-0 bg-white opacity-20 bg-blend-overlay shadow-[inset_0_-10px_20px_rgba(0,0,0,0.2)] z-10"></div>
                
                {/* 3D Avatar representation */}
                {teacher.photoUrl ? (
                  <Image 
                    src={teacher.photoUrl} 
                    alt={teacher.name}
                    fill
                    className="object-cover z-0"
                  />
                ) : (
                  <div className="z-0 flex flex-col items-center justify-center text-white text-center p-2 relative">
                    <UserCircle2 size={40} className="mb-1 opacity-80" />
                    <span className="text-[10px] font-medium opacity-90 leading-tight">Photo not<br/>available</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{teacher.name}</h3>
              <p className="text-blue-600 font-semibold mb-1 bg-blue-50 px-4 py-1 rounded-full text-sm inline-block">{teacher.subject}</p>
              <p className="text-slate-500 font-medium">{teacher.role}</p>
              
              {/* Decorative 3D elements in the background of the card */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

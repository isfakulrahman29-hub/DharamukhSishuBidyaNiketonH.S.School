import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Academics | Dharamukh Sishu Bidya Niketon',
  description: 'Academic Information for Dharamukh Sishu Bidya Niketon Higher Secondary School.',
};

export default function AcademicsPage() {
  const levels = [
    {
      title: "Primary",
      classes: "Classes 1 to 5",
      languages: ["Assamese", "English"],
      description: "Building strong foundational skills in reading, writing, mathematics, and environmental awareness in a nurturing environment."
    },
    {
      title: "Upper Primary",
      classes: "Classes 6 to 8",
      languages: ["Assamese", "English", "Hindi"],
      description: "Transitioning to more specialized subjects, introducing students to scientific inquiry, historical contexts, and language development."
    },
    {
      title: "Secondary",
      classes: "Classes 9 and 10",
      languages: ["Assamese", "English"],
      description: "Rigorous academic preparation leading up to the HSLC board examinations, focusing on core concepts and analytical thinking."
    },
    {
      title: "Higher Secondary",
      classes: "Classes 11 and 12",
      languages: ["Assamese", "English"],
      description: "Advanced studies preparing students for higher education and professional careers. Please contact the school for details on available streams."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Academic Structure</h1>
          <p className="text-lg text-slate-600">
            Dharamukh Sishu Bidya Niketon offers a comprehensive educational journey from Primary through Higher Secondary levels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {levels.map((level, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{level.title}</h2>
              <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 font-semibold rounded-md text-sm mb-4">
                {level.classes}
              </div>
              <p className="text-slate-600 mb-6">
                {level.description}
              </p>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Languages Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {level.languages.map(lang => (
                    <span key={lang} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/classes" className="inline-flex items-center px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition">
            View Details by Class
          </Link>
        </div>
      </div>
    </div>
  );
}

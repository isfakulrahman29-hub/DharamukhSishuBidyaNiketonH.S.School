import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Student Services | Dharamukh Sishu Bidya Niketon',
  description: 'Services provided to students at Dharamukh Sishu Bidya Niketon.',
};

export default function StudentServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 border-b pb-4">Student Services</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg mb-8">
              The school facilitates various administrative and academic services for enrolled students to ensure compliance with educational boards and government mandates.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 not-prose">
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-blue-950 mb-2">PEN Number</h3>
                <p className="text-slate-600 text-sm">
                  We facilitate the recording and management of the Permanent Education Number (PEN) as mandated by the education department for student tracking and academic records.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-blue-950 mb-2">APAAR ID</h3>
                <p className="text-slate-600 text-sm">
                  The school assists in the registration process for the Automated Permanent Academic Account Registry (APAAR) ID, the &quot;One Nation, One Student ID&quot; initiative by the Government of India.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-blue-950 mb-2">School ID Card</h3>
                <p className="text-slate-600 text-sm">
                  Official school identity cards are issued to all enrolled students at the beginning of the academic session for campus access and identification.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center text-center">
                <p className="text-slate-600 text-sm mb-4">
                  For inquiries regarding certificates or documentation updates, please contact the administrative office.
                </p>
                <Link href="/contact" className="text-blue-700 font-semibold hover:underline">
                  Contact Office
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

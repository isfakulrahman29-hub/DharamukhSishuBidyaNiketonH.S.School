import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admission | Dharamukh Sishu Bidya Niketon',
  description: 'Admission information and procedure for Dharamukh Sishu Bidya Niketon.',
};

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 border-b pb-4">Admission Information</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg">
              We welcome applications from students who are eager to learn and grow in a supportive and challenging environment.
            </p>

            <h2>Available Classes</h2>
            <p>
              Admissions are open for <strong>Class 1 to Class 12</strong>, subject to seat availability.
            </p>

            <h2>Important Information</h2>
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-amber-900">
              <p className="font-semibold mb-2 mt-0 flex items-center"><CheckCircle2 className="mr-2" size={20} /> Current Status</p>
              <p className="m-0">
                Please contact the school for current details regarding admission dates, eligibility criteria, fee structure, and required documents.
              </p>
            </div>

            <div className="mt-12 text-center p-8 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-950 mb-4 mt-0">Ready to Apply?</h3>
              <p className="mb-6">Submit an online inquiry and our admission office will contact you with further details.</p>
              <Link href="/inquiry" className="inline-block px-8 py-3 bg-yellow-500 text-blue-950 font-bold rounded-lg hover:bg-yellow-400 transition shadow-sm">
                Submit Online Inquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

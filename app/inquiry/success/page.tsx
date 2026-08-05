'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 text-center max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        <CheckCircle className="text-green-500 w-20 h-20" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Inquiry Submitted Successfully</h1>
      <p className="text-lg text-slate-600 mb-8">
        Thank you for contacting Dharamukh Sishu Bidya Niketon Higher Secondary School. Our team will review your inquiry and contact you soon.
      </p>
      
      {id && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8 inline-block">
          <p className="text-sm text-blue-800 mb-2 font-medium">Your Inquiry Reference ID</p>
          <p className="text-2xl font-bold text-blue-950 tracking-wider">{id}</p>
          <p className="text-xs text-blue-700 mt-2">Please save this ID for future reference.</p>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Link href="/" className="px-6 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition">
          Return to Home
        </Link>
        <Link href="/academics" className="px-6 py-2 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition">
          View Academics
        </Link>
      </div>
    </div>
  );
}

export default function InquirySuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Suspense fallback={<div className="text-center p-12">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}

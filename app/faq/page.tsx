import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Dharamukh Sishu Bidya Niketon',
  description: 'Frequently Asked Questions about Dharamukh Sishu Bidya Niketon.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600">
            Find answers to common questions about admissions, academics, and school policies.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center py-20">
          <p className="text-xl text-slate-500 font-medium">FAQs will be updated soon.</p>
        </div>
      </div>
    </div>
  );
}

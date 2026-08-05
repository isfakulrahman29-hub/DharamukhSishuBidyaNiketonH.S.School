import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Dharamukh Sishu Bidya Niketon',
  description: 'Terms and Conditions of Dharamukh Sishu Bidya Niketon.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">Terms & Conditions</h1>
          <div className="prose prose-blue max-w-none text-slate-700">
            <p><strong>Effective Date:</strong> August 2026</p>
            <p>These terms and conditions outline the rules and regulations for the use of Dharamukh Sishu Bidya Niketon&apos;s Website.</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use Dharamukh Sishu Bidya Niketon if you do not agree to take all of the terms and conditions stated on this page.</p>

            <h2>2. Information Accuracy</h2>
            <p>While we strive to keep the information on this website accurate and up-to-date, Dharamukh Sishu Bidya Niketon makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information.</p>

            <h2>3. Modifications</h2>
            <p>The school reserves the right to revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then-current version of these terms of service.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

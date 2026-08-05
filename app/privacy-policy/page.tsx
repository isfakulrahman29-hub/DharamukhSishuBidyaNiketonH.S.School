import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dharamukh Sishu Bidya Niketon',
  description: 'Privacy Policy of Dharamukh Sishu Bidya Niketon.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">Privacy Policy</h1>
          <div className="prose prose-blue max-w-none text-slate-700">
            <p><strong>Effective Date:</strong> August 2026</p>
            <p>Welcome to the official website of Dharamukh Sishu Bidya Niketon Higher Secondary School. We value your privacy and are committed to protecting your personal information.</p>
            
            <h2>1. Information We Collect</h2>
            <p>When you submit an online inquiry, we collect information such as your name, email address, phone number, and other details relevant to the admission process.</p>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information solely for the purpose of communicating with you regarding your inquiry, admission updates, and official school matters. We do not sell or share your personal data with third-party marketers.</p>

            <h2>3. Security</h2>
            <p>We implement appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure, or destruction of data.</p>

            <h2>4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at dharamukhsishubidyaniketon@gmail.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

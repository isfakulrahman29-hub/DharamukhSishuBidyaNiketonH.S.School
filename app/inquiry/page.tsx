import { Metadata } from 'next';
import InquiryForm from '@/components/InquiryForm';

export const metadata: Metadata = {
  title: 'Online Admission Inquiry | Dharamukh Sishu Bidya Niketon',
  description: 'Submit an online inquiry for admission to Dharamukh Sishu Bidya Niketon.',
};

export default function InquiryPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-blue-900 p-8 md:p-12 text-white text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Online Inquiry</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Please fill out the form below with accurate information. Our admission team will review your inquiry and get back to you shortly.
            </p>
          </div>
          
          <div className="p-8 md:p-12">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}

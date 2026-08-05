import { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Dharamukh Sishu Bidya Niketon',
  description: 'Contact information for Dharamukh Sishu Bidya Niketon Higher Secondary School.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">
            We are here to answer any questions you may have about our school, admissions, or programs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Phone</h3>
            <p className="text-slate-600 mb-1">Director: <strong>9954624624</strong></p>
            <p className="text-slate-600 mb-1">Principal: <strong>9678661642</strong></p>
            <p className="text-slate-600 mb-4">IT Dept: <strong>8638371842</strong></p>
            <div className="flex gap-2 mt-auto">
              <a href="tel:+919678661642" className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition">Call Now</a>
              <a href="https://wa.me/919678661642" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition">WhatsApp</a>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
            <p className="text-slate-600 mb-4 break-all">dharamukhsishubidyaniketon<br/>@gmail.com</p>
            <a href="mailto:dharamukhsishubidyaniketon@gmail.com" className="mt-auto px-4 py-2 bg-blue-900 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition">Send Email</a>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Location</h3>
            <p className="text-slate-600 mb-4">
              Dharamukh, Bajbatamari,<br />
              Nagaon, Assam, India
            </p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=26.1738290,92.5647330" target="_blank" rel="noopener noreferrer" className="mt-auto px-4 py-2 bg-blue-900 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition">Get Directions</a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-16">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Admission Inquiries</h2>
              <p className="text-slate-600 mb-8">
                If you are looking to enroll your child or want to know more about the admission process, please fill out our online inquiry form.
              </p>
              <Link href="/inquiry" className="inline-block text-center px-6 py-3 bg-yellow-500 text-blue-950 font-bold rounded-lg hover:bg-yellow-400 transition w-full md:w-auto">
                Go to Admission Inquiry Form
              </Link>
            </div>
            <div className="h-64 lg:h-auto min-h-[400px] w-full bg-slate-200 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3550.082728277259!2d92.56215807544186!3d26.173829000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDEwJzI1LjgiTiA5MsKwMzMnNTMuMCJF!5e0!3m2!1sen!2sin!4v1714152541334!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location Map"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

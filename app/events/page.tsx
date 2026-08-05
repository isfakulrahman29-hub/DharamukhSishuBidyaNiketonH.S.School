import { Metadata } from 'next';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events | Dharamukh Sishu Bidya Niketon',
  description: 'Upcoming and past events at Dharamukh Sishu Bidya Niketon.',
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Events</h1>
          <p className="text-lg text-slate-600">
            Discover upcoming activities and celebrate our past events.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center py-24">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-xl text-slate-500 font-medium">No upcoming events.</p>
          <p className="text-slate-400 mt-2">We will update our calendar soon.</p>
        </div>
      </div>
    </div>
  );
}

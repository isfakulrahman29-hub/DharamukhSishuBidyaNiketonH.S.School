import { Metadata } from 'next';
import { Image as ImageIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gallery | Dharamukh Sishu Bidya Niketon',
  description: 'Photo gallery of Dharamukh Sishu Bidya Niketon.',
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Photo Gallery</h1>
          <p className="text-lg text-slate-600">
            A glimpse into the life at Dharamukh Sishu Bidya Niketon.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center py-24">
          <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-xl text-slate-500 font-medium">No gallery images available.</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Calendar, FileText } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const q = query(
          collection(db, 'notices'), 
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedNotices: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedNotices.push({ id: doc.id, ...doc.data() });
        });
        setNotices(fetchedNotices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'as-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('notices')}</h1>
          <p className="text-lg text-slate-600">
            {language === 'en' ? 'Important announcements and updates for students and parents.' : 'ছাত্ৰ-ছাত্ৰী আৰু অভিভাৱকৰ বাবে গুৰুত্বপূৰ্ণ জাননী আৰু আপডেটসমূহ।'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-24 text-slate-500">Loading notices...</div>
        ) : notices.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center py-24">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-500 font-medium">No active notices at the moment.</p>
            <p className="text-slate-400 mt-2">Please check back later for updates.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div key={notice.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 hover:shadow-md transition">
                <div className="flex items-center text-sm text-blue-600 font-semibold mb-3">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(notice.createdAt)}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {language === 'en' ? notice.titleEn : notice.titleAs || notice.titleEn}
                </h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {language === 'en' ? notice.descEn : notice.descAs || notice.descEn}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Trophy, MapPin, Sparkles, GraduationCap, Medal, Star, UserCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, where, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export default function Home() {
  const { t, language } = useLanguage();
  const [recentNotices, setRecentNotices] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecentNotices = async () => {
      try {
        const q = query(
          collection(db, 'notices'), 
          where('published', '==', true),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const fetchedNotices: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedNotices.push({ id: doc.id, ...doc.data() });
        });
        setRecentNotices(fetchedNotices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
    fetchRecentNotices();
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        {/* Colorful 3D Floating Elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl transform rotate-12 blur-sm opacity-60 shadow-[0_20px_50px_rgba(225,29,72,0.5)] animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full transform -rotate-12 blur-sm opacity-50 shadow-[0_20px_50px_rgba(245,158,11,0.5)]"></div>
        <div className="absolute top-40 left-1/4 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl transform rotate-45 blur-sm opacity-60 shadow-[0_20px_50px_rgba(16,185,129,0.5)]"></div>
        
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/school-campus/1920/1080')] bg-cover bg-center bg-no-repeat mix-blend-overlay"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
          
          {/* Main 3D Icon center */}
          <div className="w-32 h-32 mb-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl flex items-center justify-center transform rotate-3 shadow-[0_20px_50px_rgba(79,70,229,0.5)] border-4 border-white/20 backdrop-blur-xl transition-transform hover:scale-110 duration-500">
            <GraduationCap size={64} className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
            {t('heroWelcome')}
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-200 mb-4 max-w-2xl font-serif drop-shadow-md">
            {t('heroWelcomeAs')}
          </h2>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl font-medium tracking-wide">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              href="/inquiry" 
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-blue-950 font-extrabold rounded-2xl shadow-[0_10px_30px_rgba(251,191,36,0.4)] hover:shadow-[0_15px_40px_rgba(251,191,36,0.6)] transition transform hover:-translate-y-2 border border-yellow-300/50"
            >
              {t('admissionInquiry')}
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-white/20 transition transform hover:-translate-y-2 backdrop-blur-md"
            >
              {t('exploreSchool')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with 3D colorful cards */}
      <section className="py-16 bg-slate-50 relative -mt-10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-white transform hover:-translate-y-2 transition-transform duration-300 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-inner">
                <Medal size={32} />
              </div>
              <div className="text-4xl font-extrabold text-blue-900 mb-1">2013</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">{t('established')}</div>
            </div>

            <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-white transform hover:-translate-y-2 transition-transform duration-300 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:-rotate-12 transition-transform shadow-inner">
                <Users size={32} />
              </div>
              <div className="text-4xl font-extrabold text-indigo-900 mb-1">1-12</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">{t('classes')}</div>
            </div>

            <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-white transform hover:-translate-y-2 transition-transform duration-300 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-inner">
                <BookOpen size={32} />
              </div>
              <div className="text-4xl font-extrabold text-purple-900 mb-1">3</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Languages</div>
            </div>

            <div className="bg-gradient-to-br from-white to-rose-50 p-6 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-white transform hover:-translate-y-2 transition-transform duration-300 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-rose-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center transform group-hover:-rotate-12 transition-transform shadow-inner">
                <MapPin size={32} />
              </div>
              <div className="text-4xl font-extrabold text-rose-900 mb-1">Nagaon</div>
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">{t('district')}</div>
            </div>

          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold tracking-wide">
                {t('aboutUs')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                {t('nurturingMinds')}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('aboutDesc')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-3 mt-1"><BookOpen size={20} /></span>
                  <span className="text-slate-700 font-medium">{t('comprehensiveCurriculum')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-3 mt-1"><Users size={20} /></span>
                  <span className="text-slate-700 font-medium">{t('experiencedFaculty')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-3 mt-1"><Trophy size={20} /></span>
                  <span className="text-slate-700 font-medium">{t('focusOnExtracurriculars')}</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-900 transition">
                  {t('readOurStory')} <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-[400px] relative rounded-2xl overflow-hidden shadow-xl">
              <Image 
                src="https://picsum.photos/seed/students/800/600" 
                alt="Students learning" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Messages Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Principal */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full mb-6 relative flex items-center justify-center bg-gradient-to-br from-indigo-400 to-blue-600 shadow-lg border-4 border-white overflow-hidden">
                <div className="z-0 flex flex-col items-center justify-center text-white text-center p-2 relative">
                  <UserCircle2 size={40} className="mb-1 opacity-80" />
                  <span className="text-[10px] font-medium opacity-90 leading-tight">Photo not<br/>available</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-10 bg-blend-overlay z-10"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Ziarul Hoque (Jitu Ahmed)</h3>
              <p className="text-blue-700 font-semibold mb-6">{t('headmaster')}</p>
              <p className="text-slate-600 italic mb-8 relative">
                <span className="text-4xl text-blue-200 absolute -top-4 -left-4">&quot;</span>
                {t('principalMsg')}
                <span className="text-4xl text-blue-200 absolute -bottom-4 -right-4">&quot;</span>
              </p>
              <Link href="/principal" className="mt-auto inline-block px-6 py-2 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-800 transition">
                {t('readMessage')}
              </Link>
            </div>

            {/* Director */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full mb-6 relative flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 shadow-lg border-4 border-white overflow-hidden">
                <div className="z-0 flex flex-col items-center justify-center text-white text-center p-2 relative">
                  <UserCircle2 size={40} className="mb-1 opacity-80" />
                  <span className="text-[10px] font-medium opacity-90 leading-tight">Photo not<br/>available</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-10 bg-blend-overlay z-10"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Jahirul Islam</h3>
              <p className="text-blue-700 font-semibold mb-6">{t('director')}</p>
              <p className="text-slate-600 italic mb-8 relative">
                <span className="text-4xl text-blue-200 absolute -top-4 -left-4">&quot;</span>
                {t('directorMsg')}
                <span className="text-4xl text-blue-200 absolute -bottom-4 -right-4">&quot;</span>
              </p>
              <Link href="/director" className="mt-auto inline-block px-6 py-2 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-800 transition">
                {t('readFullMessage')}
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Academic Overview */}
      <section className="py-16 md:py-24 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('academicLevels')}</h2>
            <p className="text-blue-200 max-w-2xl mx-auto text-lg">{t('academicDesc')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Primary', classes: 'Classes 1-5', langs: 'Assamese, English', bg: 'bg-blue-900' },
              { title: 'Upper Primary', classes: 'Classes 6-8', langs: 'Assamese, English, Hindi', bg: 'bg-blue-800' },
              { title: 'Secondary', classes: 'Classes 9-10', langs: 'Assamese, English', bg: 'bg-blue-700' },
              { title: 'Higher Secondary', classes: 'Classes 11-12', langs: 'Assamese, English', bg: 'bg-blue-600' }
            ].map((level, i) => (
              <div key={i} className={`${level.bg} p-8 rounded-xl hover:-translate-y-2 transition duration-300`}>
                <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
                <div className="text-yellow-400 font-semibold mb-4">{level.classes}</div>
                <p className="text-blue-100 text-sm">Languages offered: {level.langs}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/academics" className="inline-flex items-center text-white border border-white/30 px-6 py-3 rounded-md hover:bg-white/10 transition">
              {t('viewDetailedCurriculum')} <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Notices & Events Preview */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Notice Board */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">{t('notices')}</h3>
                <Link href="/notices" className="text-sm text-blue-700 font-semibold hover:underline">{t('more')}</Link>
              </div>
              <div className="space-y-4">
                {recentNotices.length > 0 ? (
                  recentNotices.map((notice, index) => (
                    <div key={notice.id} className={`border-l-4 ${index % 2 === 0 ? 'border-yellow-500' : 'border-blue-500'} pl-4 py-2`}>
                      <div className="text-xs text-slate-500 font-medium mb-1">{formatDate(notice.createdAt)}</div>
                      <h4 className="font-semibold text-slate-900 mb-1">
                        {language === 'en' ? notice.titleEn : notice.titleAs || notice.titleEn}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {language === 'en' ? notice.descEn : notice.descAs || notice.descEn}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4">No recent notices.</p>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">{t('upcomingEvents')}</h3>
                <Link href="/events" className="text-sm text-blue-700 font-semibold hover:underline">{t('viewAll')}</Link>
              </div>
              <div className="space-y-6">
                {/* Placeholder Event */}
                <div className="flex gap-4">
                  <div className="bg-blue-50 text-blue-900 w-16 h-16 rounded-lg flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold uppercase">{t('aug')}</span>
                    <span className="text-xl font-bold">15</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">{t('event1Title')}</h4>
                    <p className="text-sm text-slate-500 mb-2">School Campus &bull; 7:30 AM</p>
                    <Link href="/events" className="text-xs text-blue-700 font-medium hover:underline">Event Details &rarr;</Link>
                  </div>
                </div>
                {/* Placeholder Event */}
                <div className="flex gap-4">
                  <div className="bg-blue-50 text-blue-900 w-16 h-16 rounded-lg flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold uppercase">{t('sept')}</span>
                    <span className="text-xl font-bold">05</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">{t('event2Title')}</h4>
                    <p className="text-sm text-slate-500 mb-2">Main Auditorium &bull; 10:00 AM</p>
                    <Link href="/events" className="text-xs text-blue-700 font-medium hover:underline">Event Details &rarr;</Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">Ready to join our community?</h2>
          <p className="text-lg text-blue-900 mb-10 max-w-2xl mx-auto">
            Admissions for the upcoming academic session are now open. Secure a bright future for your child at Dharamukh Sishu Bidya Niketon.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/inquiry" className="px-8 py-4 bg-blue-950 text-white font-bold rounded-lg shadow-lg hover:bg-blue-900 transition">
              Submit Admission Inquiry
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-transparent text-blue-950 font-bold border-2 border-blue-950 rounded-lg hover:bg-blue-950 hover:text-white transition">
              Contact School
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

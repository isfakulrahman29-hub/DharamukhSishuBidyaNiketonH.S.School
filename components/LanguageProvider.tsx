'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'as';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    about: 'About',
    academics: 'Academics',
    teachers: 'Teachers',
    admission: 'Admission',
    notices: 'Notices',
    events: 'Events',
    gallery: 'Gallery',
    contact: 'Contact',
    principal: 'Principal',
    director: 'Director',
    classes: 'Classes',
    studentServices: 'Student Services',
    faq: 'FAQ',
    adminLogin: 'Admin Login',
    admissionInquiry: 'Admission Inquiry',
    more: 'More',
    schoolName: 'Dharamukh Sishu Bidya Niketon',
    schoolSubtitle: 'Higher Secondary School',
    morePages: 'More Pages',
    heroWelcome: 'Welcome to Dharamukh Sishu Bidya Niketon',
    heroWelcomeAs: 'ধৰমুখ শিশু বিদ্যা নিকেতন উচ্চতৰ মাধ্যমিক বিদ্যালয়লৈ আদৰণি',
    heroSubtitle: 'Quality Education • Character • Discipline • Holistic Development',
    exploreSchool: 'Explore Our School',
    established: 'Established',
    district: 'District',
    aboutUs: 'About Us',
    nurturingMinds: 'Nurturing Minds, Building Character',
    aboutDesc: 'Situated in Dharamukh, Bajbatamari, Nagaon, Assam, Dharamukh Sishu Bidya Niketon is a premier co-educational institution. We are dedicated to providing excellent education from Class 1 to Class 12, focusing on the holistic development of every child.',
    comprehensiveCurriculum: 'Comprehensive Curriculum',
    experiencedFaculty: 'Experienced Faculty',
    focusOnExtracurriculars: 'Focus on Extracurriculars',
    readOurStory: 'Read our full story',
    headmaster: 'Principal / Headmaster',
    principalMsg: 'Education is not just about academic excellence, but about shaping responsible citizens for tomorrow. Welcome to our vibrant learning community.',
    directorMsg: 'Our vision is to build a strong foundation for every child, empowering them to achieve their full potential in a rapidly changing world.',
    readFullMessage: 'Read Full Message',
    academicLevels: 'Academic Levels',
    academicDesc: 'Structured learning pathways designed for every stage of your child\'s educational journey.',
    viewDetailedCurriculum: 'View Detailed Curriculum',
    upcomingEvents: 'Upcoming Events',
    viewAll: 'View All',
    aug: 'Aug',
    sept: 'Sept',
    event1Title: 'Independence Day',
    event1Desc: 'Flag hoisting and cultural program.',
    event2Title: 'Teachers Day',
    event2Desc: 'Special assembly by students.',
  },
  as: {
    home: 'মুখ্য পৃষ্ঠা',
    about: 'আমাৰ বিষয়ে',
    academics: 'শৈক্ষিক',
    teachers: 'শিক্ষকসকল',
    admission: 'ভৰ্তি',
    notices: 'জাননী',
    events: 'অনুষ্ঠান',
    gallery: 'গেলাৰী',
    contact: 'যোগাযোগ',
    principal: 'অধ্যক্ষ',
    director: 'পৰিচালক',
    classes: 'শ্ৰেণীসমূহ',
    studentServices: 'ছাত্ৰ সেৱা',
    faq: 'সচৰাচৰ সোধা প্ৰশ্ন',
    adminLogin: 'এডমিন লগইন',
    admissionInquiry: 'ভৰ্তি অনুসন্ধান',
    more: 'অধিক',
    schoolName: 'ধৰামুখ শিশু বিদ্যা নিকেতন',
    schoolSubtitle: 'উচ্চতৰ মাধ্যমিক বিদ্যালয়',
    morePages: 'অধিক পৃষ্ঠাসমূহ',
    heroWelcome: 'ধৰমুখ শিশু বিদ্যা নিকেতনলৈ স্বাগতম',
    heroWelcomeAs: 'Dharamukh Sishu Bidya Niketon Higher Secondary School',
    heroSubtitle: 'গুণগত শিক্ষা • চৰিত্ৰ গঠন • অনুশাসন • সৰ্বাংগীণ বিকাশ',
    exploreSchool: 'আমাৰ বিদ্যালয় অন্বেষণ কৰক',
    established: 'প্ৰতিষ্ঠিত',
    district: 'জিলা',
    aboutUs: 'আমাৰ বিষয়ে',
    nurturingMinds: 'মনক লালন-পালন কৰা, চৰিত্ৰ গঢ়ি তোলা',
    aboutDesc: 'অসমৰ নগাঁও জিলাৰ বজবটামাৰীৰ ধৰমুখত অৱস্থিত ধৰমুখ শিশু বিদ্যা নিকেতন এখন অগ্ৰণী সহ-শিক্ষানুষ্ঠান। প্ৰতিটো শিশুৰ সৰ্বাংগীণ বিকাশৰ ওপৰত গুৰুত্ব আৰোপ কৰি ১ম শ্ৰেণীৰ পৰা দ্বাদশ শ্ৰেণীলৈকে উৎকৃষ্ট শিক্ষা প্ৰদান কৰিবলৈ আমি উৎসৰ্গিত।',
    comprehensiveCurriculum: 'বিস্তৃত পাঠ্যক্ৰম',
    experiencedFaculty: 'অভিজ্ঞ অনুষদ',
    focusOnExtracurriculars: 'সহ-পাঠ্যক্ৰমৰ ওপৰত গুৰুত্ব',
    readOurStory: 'আমাৰ সম্পূৰ্ণ কাহিনী পঢ়ক',
    headmaster: 'অধ্যক্ষ / প্ৰধান শিক্ষক',
    principalMsg: 'শিক্ষা কেৱল শৈক্ষিক উৎকৃষ্টতা নহয়, ই হ’ল কাইলৈৰ বাবে দায়িত্বশীল নাগৰিক গঢ়ি তোলা। আমাৰ সজীৱ শিক্ষণ সম্প্ৰদায়লৈ স্বাগতম।',
    directorMsg: 'আমাৰ দৃষ্টিভংগী হ’ল প্ৰতিটো শিশুৰ বাবে এক শক্তিশালী ভেটি গঢ়ি তোলা, দ্ৰুতগতিত সলনি হোৱা বিশ্বত তেওঁলোকৰ সম্পূৰ্ণ সম্ভাৱনা লাভ কৰিবলৈ সবলীকৰণ কৰা।',
    readFullMessage: 'সম্পূৰ্ণ বাৰ্তা পঢ়ক',
    academicLevels: 'শৈক্ষিক স্তৰ',
    academicDesc: 'আপোনাৰ শিশুৰ শৈক্ষিক যাত্ৰাৰ প্ৰতিটো পৰ্যায়ৰ বাবে নিৰ্মিত গাঁথনিগত শিক্ষণ পথ।',
    viewDetailedCurriculum: 'বিস্তাৰিত পাঠ্যক্ৰম চাওক',
    upcomingEvents: 'আগন্তুক অনুষ্ঠানসমূহ',
    viewAll: 'সকলো চাওক',
    aug: 'আগষ্ট',
    sept: 'ছেপ্টে',
    event1Title: 'স্বাধীনতা দিৱস',
    event1Desc: 'পতাকা উত্তোলন আৰু সাংস্কৃতিক কাৰ্যসূচী।',
    event2Title: 'শিক্ষক দিৱস',
    event2Desc: 'ছাত্ৰ-ছাত্ৰীৰ দ্বাৰা বিশেষ সভা।',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved === 'en' || saved === 'as') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

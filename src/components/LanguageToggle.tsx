'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full border border-agri-green-600 bg-white p-1 shadow-sm">
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          language === 'en'
            ? 'bg-agri-green-700 text-white'
            : 'text-gray-700 hover:bg-agri-green-50'
        }`}
        aria-label="Switch to English"
      >
        <span>English</span>
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          language === 'hi'
            ? 'bg-agri-green-700 text-white'
            : 'text-gray-700 hover:bg-agri-green-50'
        }`}
        aria-label="Switch to Hindi"
      >
        <span>हिंदी</span>
      </button>
    </div>
  );
};

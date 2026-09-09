'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export function AuthGate() {
  const { authModalOpen, closeAuthModal } = useAuth();
  const { language } = useLanguage();

  if (!authModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="auth-gate-title">
      <div className="w-full max-w-sm rounded-3xl border border-emerald-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <button type="button" onClick={closeAuthModal} aria-label="Close login prompt" className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 id="auth-gate-title" className="mt-5 text-xl font-black text-slate-900 dark:text-white">
          {language === 'hi' ? 'किसान सुविधाएं इस्तेमाल करने के लिए लॉग इन करें' : 'Log in to use farmer features'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-300">
          {language === 'hi' ? 'आप preview देख सकते हैं। सलाह, मौसम, AI और crop scan इस्तेमाल करने के लिए अपना account खोलें।' : 'You can explore the preview. Log in to use advice, weather, AI, and crop scanning tools.'}
        </p>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={closeAuthModal} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            {language === 'hi' ? 'बाद में' : 'Maybe later'}
          </button>
          <Link href="/login" onClick={closeAuthModal} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700">
            <LogIn className="h-4 w-4" />
            {language === 'hi' ? 'लॉग इन' : 'Log in'}
          </Link>
        </div>
      </div>
    </div>
  );
}

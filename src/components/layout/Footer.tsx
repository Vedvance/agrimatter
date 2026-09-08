'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Sprout, PhoneCall, Shield, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-agri-brown-900 text-white border-t-4 border-agri-green-600 pt-10 pb-20 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-agri-green-500 flex items-center justify-center text-white font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">Agrimatter</span>
            </div>
            <p className="text-xs text-amber-100/80 leading-relaxed">
              {t.tagline}
            </p>
            <p className="text-[11px] text-emerald-300 font-medium">
              Empowering Small & Marginal Farmers in India with Rule-Based Agronomy & Weather Intelligence.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">Quick Services</h4>
            <ul className="space-y-2 text-xs text-amber-100">
              <li><Link href="/weather" className="hover:text-white transition">Weather & Irrigation Advisories</Link></li>
              <li><Link href="/crop-advisor" className="hover:text-white transition">Crop Suitability Calculator</Link></li>
              <li><Link href="/soil-health" className="hover:text-white transition">Soil pH & NPK Analysis</Link></li>
              <li><Link href="/fertilizer-guide" className="hover:text-white transition">Stage-Wise Fertilizer Guide</Link></li>
              <li><Link href="/ai-assistant" className="hover:text-white transition">Kisan AI Assistant</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">Kisan Helpline</h4>
            <div className="space-y-2 text-xs text-amber-100">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Kisan Call Center: 1800-180-1551</span>
              </div>
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Support: support@agrimatter.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Soil Testing Labs Nearby</span>
              </div>
            </div>
          </div>

          {/* Col 4 - Safety Disclaimer */}
          <div className="bg-agri-brown-800/80 p-4 rounded-xl border border-amber-500/20">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Safety Disclaimer</h4>
            <p className="text-[11px] text-amber-100/90 leading-relaxed italic">
              "{t.common.fertilizerDisclaimer}"
            </p>
          </div>

        </div>

        <div className="border-t border-amber-900/60 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-amber-200/60">
          <p>© {new Date().getFullYear()} Agrimatter Decision Support System. Built with Next.js, Tailwind & Supabase.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/admin" className="hover:underline">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Home, CloudSun, Leaf, Bot, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const pathname = usePathname();

  const items = [
    { href: '/dashboard', label: t.nav.home, icon: Home },
    { href: '/weather', label: t.nav.weather, icon: CloudSun },
    { href: '/crop-advisor', label: t.nav.cropAdvisor, icon: Leaf },
    { href: '/ai-assistant', label: t.nav.aiAssistant, icon: Bot },
    { href: '/profile', label: t.nav.profile, icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-emerald-200 shadow-lg px-2 py-1">
      <div className="flex justify-around items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-agri-green-800 font-extrabold scale-105'
                  : 'text-gray-500 font-semibold hover:text-agri-green-700'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-agri-green-100' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

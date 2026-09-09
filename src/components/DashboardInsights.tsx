'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BellRing,
  CalendarDays,
  CheckCircle2,
  CloudRain,
  Droplets,
  Leaf,
  ShieldAlert,
  Sparkles,
  SunMedium,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { WeatherForecast, FarmerCrop, Language } from '@/types';

interface DashboardInsightsProps {
  weather: WeatherForecast;
  activeCrop?: FarmerCrop | null;
  language: Language;
}

const cropStages = ['Sowing', 'Vegetative', 'Flowering', 'Harvesting'] as const;

export function DashboardInsights({ weather, activeCrop, language }: DashboardInsightsProps) {
  const isHindi = language === 'hi';
  const stage = activeCrop?.crop_stage || 'Vegetative';
  const currentStageIndex = Math.max(cropStages.indexOf(stage), 0);
  const rainSoon = weather.daily.slice(0, 2).some((day) => day.precipitationProb >= 60);
  const nextAction = rainSoon
    ? isHindi ? 'बारिश से पहले खेत की जल निकासी जांचें' : 'Check field drainage before the next rain'
    : isHindi ? 'आज हल्की सिंचाई और निराई करें' : 'Plan light irrigation and weeding today';

  const notifications = [
    {
      icon: rainSoon ? CloudRain : SunMedium,
      tone: rainSoon ? 'text-sky-700 bg-sky-50 border-sky-100' : 'text-amber-700 bg-amber-50 border-amber-100',
      title: rainSoon ? (isHindi ? 'बारिश का अलर्ट' : 'Rain watch') : (isHindi ? 'मौसम साफ है' : 'Clear weather'),
      detail: rainSoon ? (isHindi ? 'अगले 48 घंटे में बारिश संभव है' : 'Rain is possible in the next 48 hours') : (isHindi ? 'सिंचाई के लिए अच्छा दिन' : 'A good window for irrigation'),
    },
    {
      icon: ShieldAlert,
      tone: 'text-rose-700 bg-rose-50 border-rose-100',
      title: isHindi ? 'फसल जांच बाकी' : 'Crop check due',
      detail: isHindi ? 'पत्ती की फोटो से रोग जांचें' : 'Scan a leaf photo for early disease detection',
    },
    {
      icon: CalendarDays,
      tone: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      title: isHindi ? 'साप्ताहिक योजना' : 'Weekly plan',
      detail: isHindi ? 'फसल चरण के अनुसार काम तय करें' : 'Plan work around the crop growth stage',
    },
  ];

  return (
    <section className="space-y-5" aria-label={isHindi ? 'किसान insights' : 'Farmer insights'}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-5">
        <Card className="relative overflow-hidden border-emerald-200 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-5 sm:p-6">
          <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full border-[22px] border-white/10" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-black text-emerald-200">
                <Sparkles className="w-4 h-4 text-amber-300" />
                {isHindi ? 'आज का खेत action' : "Today's field action"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black max-w-md leading-tight">{nextAction}</h2>
              <p className="text-xs text-emerald-100/80 max-w-md leading-relaxed">
                {isHindi ? 'मौसम, फसल चरण और मिट्टी की स्थिति के आधार पर आपकी प्राथमिकता।' : 'A practical priority based on weather, crop stage, and field conditions.'}
              </p>
            </div>
            <Link href={rainSoon ? '/weather' : '/crop-advisor'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-300 transition-colors whitespace-nowrap">
              {isHindi ? 'सलाह देखें' : 'View advice'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Card>

        <Card className="p-5 sm:p-6 border-sky-200 bg-sky-50/60 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] font-black text-sky-700">{isHindi ? 'मौसम trend' : 'Weather trend'}</span>
              <h3 className="text-lg font-black text-agri-green-900 mt-1">{weather.current.temp}°C <span className="text-xs font-bold text-gray-500">{weather.current.condition}</span></h3>
            </div>
            <TrendingUp className="w-5 h-5 text-sky-600" />
          </div>
          <div className="flex items-end gap-2 h-20">
            {weather.hourly.slice(0, 8).map((hour, index) => {
              const height = Math.max(18, Math.min(100, ((hour.temp - 18) / 24) * 100));
              return (
                <div key={`${hour.time}-${index}`} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full max-w-5 rounded-t-md bg-gradient-to-t from-sky-600 to-cyan-300 transition-all" style={{ height: `${height}%` }} title={`${hour.temp}°C`} />
                  <span className="text-[9px] font-bold text-gray-500">{hour.time.slice(0, 5)}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-5">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-black text-agri-green-900">{isHindi ? 'फसल growth timeline' : 'Crop growth timeline'}</h3>
            </div>
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-1">{activeCrop?.crop_name || 'Wheat'}</span>
          </div>
          <div className="space-y-3">
            {cropStages.map((cropStage, index) => {
              const complete = index <= currentStageIndex;
              const label = isHindi ? ['बुवाई', 'विकास', 'फूल', 'कटाई'][index] : cropStage;
              return (
                <div key={cropStage} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${complete ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                    {complete ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-black">{index + 1}</span>}
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${complete ? 'bg-emerald-500' : ''}`} style={{ width: complete ? '100%' : '0%' }} />
                  </div>
                  <span className={`w-20 text-right text-[11px] font-black ${complete ? 'text-emerald-700' : 'text-gray-400'}`}>{label}</span>
                </div>
              );
            })}
          </div>
          <Link href="/crop-advisor" className="mt-5 inline-flex items-center gap-1 text-xs font-black text-emerald-700 hover:text-emerald-900">
            {isHindi ? 'फसल सलाह खोलें' : 'Open crop advisor'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-black text-agri-green-900">{isHindi ? 'आपके alerts' : 'Your alerts'}</h3>
            </div>
            <span className="text-[10px] font-black text-amber-800 bg-amber-50 border border-amber-100 rounded-full px-2 py-1">{notifications.length} {isHindi ? 'नए' : 'new'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {notifications.map(({ icon: Icon, tone, title, detail }) => (
              <div key={title} className={`rounded-xl border p-3 ${tone}`}>
                <Icon className="w-4 h-4 mb-3" />
                <p className="text-xs font-black mb-1">{title}</p>
                <p className="text-[10px] font-semibold leading-relaxed opacity-80">{detail}</p>
              </div>
            ))}
          </div>
          <Link href="/ai-assistant" className="mt-5 inline-flex items-center gap-1 text-xs font-black text-amber-700 hover:text-amber-900">
            {isHindi ? 'AI से पूछें' : 'Ask the AI assistant'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Card>
      </div>
    </section>
  );
}

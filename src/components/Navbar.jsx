import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sprout, 
  Users, 
  Activity, 
  TrendingUp, 
  ShoppingBag, 
  CloudSun, 
  Award, 
  Calculator, 
  Mic, 
  PhoneCall, 
  Globe, 
  Menu, 
  X,
  Volume2,
  VolumeX
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenVoice }) => {
  const { lang, setLang, t, isSpeaking, stopSpeaking } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'nearby', label: t('nav.nearbyFarmers'), icon: Users, badge: "NEW" },
    { id: 'doctor', label: t('nav.cropDoctor'), icon: Activity },
    { id: 'mandi', label: t('nav.mandiRates'), icon: TrendingUp },
    { id: 'market', label: t('nav.marketplace'), icon: ShoppingBag },
    { id: 'weather', label: t('nav.weather'), icon: CloudSun },
    { id: 'schemes', label: t('nav.schemes'), icon: Award },
    { id: 'fertilizer', label: t('nav.fertilizer'), icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
      {/* Top Notification & Emergency Bar */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/40 text-emerald-100 font-semibold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider border border-emerald-400/30">
              SIH 2024
            </span>
            <span className="hidden sm:inline text-emerald-100">
              Smart India Hackathon Agricultural Platform
            </span>
            <span className="sm:hidden font-medium">AgriMatter • कृषि सेतु</span>
          </div>
          
          <div className="flex items-center gap-4">
            {isSpeaking && (
              <button 
                onClick={stopSpeaking}
                className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white px-2 py-0.5 rounded-full text-[11px] animate-pulse"
                title="Stop Audio"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop Audio</span>
              </button>
            )}

            <a 
              href="tel:18001801551" 
              className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>1800-180-1551 (Kisan Helpline)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('nearby')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition">
                  AgriMatter
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  कृषि सेतु
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {lang === 'hi' ? 'हर किसान सशक्त, हर फसल समृद्ध' : 'Every Grain Matters'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                      isActive ? 'bg-amber-400 text-slate-900' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Voice & Language */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Voice Assistant Trigger */}
            <button
              onClick={onOpenVoice}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
              title="Speak in Hindi or English"
            >
              <Mic className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">
                {lang === 'hi' ? 'आवाज से पूछें' : 'Voice Assistant'}
              </span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition ${
                  lang === 'en' 
                    ? 'bg-white text-emerald-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition ${
                  lang === 'hi' 
                    ? 'bg-white text-emerald-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-amber-400 text-slate-900' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

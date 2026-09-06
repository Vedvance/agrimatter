import React, { useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { NearbyFarmers } from './components/NearbyFarmers';
import { CropDoctor } from './components/CropDoctor';
import { MandiTracker } from './components/MandiTracker';
import { KisanBazaar } from './components/KisanBazaar';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { SchemesGuide } from './components/SchemesGuide';
import { FertilizerCalc } from './components/FertilizerCalc';
import { VoiceAssistant } from './components/VoiceAssistant';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  ShoppingBag, 
  CloudSun, 
  Award, 
  Calculator, 
  Sprout, 
  ShieldCheck, 
  PhoneCall, 
  HeartHandshake, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const App = () => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('nearby');
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenVoice={() => setVoiceOpen(true)} 
      />

      {/* Hero Quick Navigation Ticker */}
      <div className="bg-emerald-900 border-b border-emerald-800 text-white py-3 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto text-xs font-semibold">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-amber-300 font-bold uppercase tracking-wider">
              {lang === 'hi' ? 'लाइव अलर्ट्स' : 'Live Agri Ticker'}:
            </span>
            <span className="text-emerald-100">
              {lang === 'hi' 
                ? 'सरसों एवं गेहूँ का मंडी भाव स्थिर • अगले 48 घंटे में वर्षा अलर्ट • नजदीकी 6 किसान उपकरण साझा करने हेतु उपलब्ध' 
                : 'Wheat & Mustard prices bullish across APMCs • Rain alert in next 48h • 6 nearby farmers sharing machinery'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0 text-emerald-200 text-[11px]">
            <span>Empowering Rural India</span>
            <span>•</span>
            <span>Zero Commission</span>
            <span>•</span>
            <span>Voice & Multi-lingual Ready</span>
          </div>
        </div>
      </div>

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'nearby' && <NearbyFarmers />}
        {activeTab === 'doctor' && <CropDoctor />}
        {activeTab === 'mandi' && <MandiTracker />}
        {activeTab === 'market' && <KisanBazaar />}
        {activeTab === 'weather' && <WeatherAdvisory />}
        {activeTab === 'schemes' && <SchemesGuide />}
        {activeTab === 'fertilizer' && <FertilizerCalc />}
      </main>

      {/* Voice Assistant Modal */}
      <VoiceAssistant 
        isOpen={voiceOpen} 
        onClose={() => setVoiceOpen(false)} 
        setActiveTab={setActiveTab} 
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="text-lg font-black text-white">AgriMatter</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart India Hackathon project addressing agricultural supply chains, leaf pathology AI diagnostics, APMC Mandi transparency, and farmer-to-farmer equipment pooling.
              </p>
              <div className="pt-2">
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                  SIH Flagship Prototype
                </span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
                Core Modules
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => setActiveTab('nearby')} className="hover:text-emerald-400 transition">
                    Nearby Farmers & Equipment Co-op
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('doctor')} className="hover:text-emerald-400 transition">
                    AI Leaf Pathology Scanner
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('mandi')} className="hover:text-emerald-400 transition">
                    APMC Mandi Intelligence & MSP Tracker
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('market')} className="hover:text-emerald-400 transition">
                    Agri Bazaar (Direct Marketplace)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
                Advisory & Support
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => setActiveTab('weather')} className="hover:text-emerald-400 transition">
                    Hyperlocal IMD Agro-Weather
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-400 transition">
                    PM-KISAN & Subsidies Matcher
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('fertilizer')} className="hover:text-emerald-400 transition">
                    ICAR Soil N-P-K Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => setVoiceOpen(true)} className="hover:text-amber-400 transition flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    AI Krishi Mitra Voice Assistant
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
                Government Helplines
              </h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kisan Call Center: <strong>1800-180-1551</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>PMFBY Insurance: <strong>1800-200-5142</strong></span>
                </p>
                <p className="pt-2 text-[11px] text-slate-500">
                  Toll-Free 24x7 support available in 22 regional Indian languages.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2024-2026 AgriMatter (कृषि सेतु) • Built for Smart India Hackathon
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy & Ethics</span>
              <span>Open Agriculture Data</span>
              <span>ICAR & e-NAM Integrated</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

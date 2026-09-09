'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { recommendCrops } from '@/lib/advisory-engine';
import { CropRecommendationResult } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CropDataGuide } from '@/components/CropDataGuide';
import { Leaf, CheckCircle2, Sparkles, BookOpen, Sliders } from 'lucide-react';

export default function CropAdvisorPage() {
  const { t, language } = useLanguage();
  const { farm } = useAuth();
  const isHi = language === 'hi';

  const [activeSection, setActiveSection] = useState<'guide' | 'advisor'>('guide');

  const [soilType, setSoilType] = useState(farm?.soil_type || 'Loam');
  const [irrigation, setIrrigation] = useState(farm?.irrigation_type || 'Borewell');
  const [season, setSeason] = useState<'Kharif' | 'Rabi' | 'Zaid'>('Rabi');

  const [results, setResults] = useState<CropRecommendationResult[]>(() => 
    recommendCrops(soilType, irrigation, season)
  );

  const handleCalculate = () => {
    const res = recommendCrops(soilType, irrigation, season);
    setResults(res);
  };

  return (
    <div className="space-y-6 py-2">
      
      {/* Top Header & Section Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-green-900">
            {t.cropAdvisorPage.title}
          </h1>
          <p className="text-xs font-semibold text-gray-600">
            {isHi 
              ? 'फसल चयन सलाहकार, NPK पोषण कैलकुलेटर एवं कृषि ज्ञानकोश'
              : 'Crop suitability calculator, agronomic reference guide, and fertilizer dosage advisor'}
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-emerald-100/70 dark:bg-slate-800 p-1 rounded-2xl border border-emerald-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveSection('guide')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSection === 'guide'
                ? 'bg-agri-green-800 text-white shadow-sm'
                : 'text-gray-700 hover:text-agri-green-900 dark:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isHi ? 'फसल गाइड' : 'Crop Data Guide'}</span>
          </button>
          
          <button
            onClick={() => setActiveSection('advisor')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSection === 'advisor'
                ? 'bg-agri-green-800 text-white shadow-sm'
                : 'text-gray-700 hover:text-agri-green-900 dark:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{isHi ? 'फसल सलाहकार' : 'Crop Match Calculator'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      {activeSection === 'guide' ? (
        <CropDataGuide />
      ) : (
        <div className="space-y-6">
          
          {/* Input Selector Card */}
          <Card className="bg-emerald-50/50 border-emerald-200 p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div>
                <label className="block text-xs font-extrabold text-agri-green-900 mb-1">{t.common.soilType}</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 font-bold text-xs bg-white"
                >
                  <option value="Loam">Loam (दोमट)</option>
                  <option value="Clay">Clay (चिकनी)</option>
                  <option value="Sandy">Sandy (बलुई)</option>
                  <option value="Black">Black Soil (काली)</option>
                  <option value="Red">Red Soil (लाल)</option>
                  <option value="Alluvial">Alluvial (जलोढ़)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-agri-green-900 mb-1">{t.common.irrigation}</label>
                <select
                  value={irrigation}
                  onChange={(e) => setIrrigation(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 font-bold text-xs bg-white"
                >
                  <option value="Borewell">Borewell (ट्यूबवेल)</option>
                  <option value="Rainfed">Rainfed (वर्षा आधारित)</option>
                  <option value="Canal">Canal (नहर)</option>
                  <option value="Drip">Drip (ड्रिप)</option>
                  <option value="Sprinkler">Sprinkler (फव्वारा)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-agri-green-900 mb-1">{t.cropAdvisorPage.seasonLabel}</label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 font-bold text-xs bg-white"
                >
                  <option value="Rabi">Rabi (रबी - Winter)</option>
                  <option value="Kharif">Kharif (खरीफ - Monsoon)</option>
                  <option value="Zaid">Zaid (जायद - Summer)</option>
                </select>
              </div>

            </div>

            <Button onClick={handleCalculate} fullWidth size="md">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>{t.cropAdvisorPage.recommendBtn}</span>
            </Button>
          </Card>

          {/* Results List */}
          <section className="space-y-4">
            <h3 className="text-lg font-black text-agri-green-900">
              {language === 'hi' ? 'सिफारिश किए गए परिणाम' : 'Suitability Results'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((res, idx) => {
                const isTop = idx === 0;
                return (
                  <Card key={res.crop.id} className={`space-y-3 ${isTop ? 'border-2 border-agri-green-600 bg-emerald-50/20' : 'border-gray-200'}`}>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${
                          res.matchScore >= 75 ? 'bg-agri-green-700' : 'bg-agri-yellow-600'
                        }`}>
                          <Leaf className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-agri-green-900">{res.crop.name}</h4>
                          <span className="text-[10px] text-gray-500 font-bold">{res.crop.season} Season</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-sm font-black ${res.matchScore >= 75 ? 'text-agri-green-800' : 'text-amber-800'}`}>
                          {res.matchScore}% {t.cropAdvisorPage.matchPercent}
                        </span>
                        <Badge variant={res.matchScore >= 75 ? 'green' : 'amber'} className="block mt-0.5">
                          {res.suitability} Fit
                        </Badge>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">{res.crop.description}</p>

                    {/* Reasons List */}
                    <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1.5">
                      <span className="text-[11px] font-extrabold text-agri-green-900 block">Why this crop?</span>
                      {res.reasons[language].map((r, rIdx) => (
                        <div key={rIdx} className="flex items-start space-x-1.5 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-agri-green-700 flex-shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>

                  </Card>
                );
              })}
            </div>
          </section>

        </div>
      )}

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { evaluateSoilHealth } from '@/lib/advisory-engine';
import { SoilAdviceResult } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { FlaskConical, CheckCircle2, Info, Sparkles } from 'lucide-react';

export default function SoilHealthPage() {
  const { t, language } = useLanguage();

  const [ph, setPh] = useState(6.8);
  const [nitrogen, setNitrogen] = useState(220);
  const [phosphorus, setPhosphorus] = useState(22);
  const [potassium, setPotassium] = useState(180);

  const [report, setReport] = useState<SoilAdviceResult>(() =>
    evaluateSoilHealth(ph, nitrogen, phosphorus, potassium)
  );

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setReport(evaluateSoilHealth(ph, nitrogen, phosphorus, potassium));
  };

  return (
    <div className="space-y-6 py-2">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-agri-green-900">
          {t.soilPage.title}
        </h1>
        <p className="text-xs font-semibold text-gray-600">
          {language === 'hi' ? 'अपनी मिट्टी परीक्षण रिपोर्ट के आंकड़े भरें' : 'Enter soil test values for pH and NPK nutrient evaluation'}
        </p>
      </div>

      {/* Input Form */}
      <Card className="bg-emerald-50/40 border-emerald-200 shadow-sm p-5">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div>
              <label className="block text-xs font-extrabold text-agri-green-900 mb-1">
                {t.soilPage.phLabel}
              </label>
              <input
                type="number"
                step="0.1"
                min="3"
                max="11"
                value={ph}
                onChange={(e) => setPh(parseFloat(e.target.value) || 7)}
                className="w-full p-3 rounded-xl border border-gray-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-agri-green-900 mb-1">
                {t.soilPage.nitrogenLabel}
              </label>
              <input
                type="number"
                value={nitrogen}
                onChange={(e) => setNitrogen(parseFloat(e.target.value) || 0)}
                className="w-full p-3 rounded-xl border border-gray-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-agri-green-900 mb-1">
                {t.soilPage.phosphorusLabel}
              </label>
              <input
                type="number"
                value={phosphorus}
                onChange={(e) => setPhosphorus(parseFloat(e.target.value) || 0)}
                className="w-full p-3 rounded-xl border border-gray-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-agri-green-900 mb-1">
                {t.soilPage.potassiumLabel}
              </label>
              <input
                type="number"
                value={potassium}
                onChange={(e) => setPotassium(parseFloat(e.target.value) || 0)}
                className="w-full p-3 rounded-xl border border-gray-300 font-bold text-sm"
              />
            </div>

          </div>

          <Button type="submit" size="lg" fullWidth>
            <Sparkles className="w-5 h-5 mr-2" />
            <span>{t.soilPage.analyzeBtn}</span>
          </Button>
        </form>
      </Card>

      {/* Results Display */}
      <section className="space-y-4">
        <h3 className="text-xl font-black text-agri-green-900 flex items-center space-x-2">
          <FlaskConical className="w-6 h-6 text-agri-brown-700" />
          <span>{t.soilPage.resultsTitle}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* pH Status */}
          <Card className="space-y-3 border-emerald-200">
            <h4 className="text-sm font-extrabold text-agri-green-900 uppercase">pH Balance Status</h4>
            <div className="p-3 bg-emerald-100/60 rounded-xl text-sm font-black text-agri-green-900">
              {report.phStatus[language]}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Target pH range for Indian cereal and pulse crops is 6.5 to 7.5 for maximum nutrient availability.
            </p>
          </Card>

          {/* NPK Status Badges */}
          <Card className="space-y-3 border-emerald-200">
            <h4 className="text-sm font-extrabold text-agri-green-900 uppercase">Primary Nutrients (NPK)</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-gray-50 rounded-xl flex justify-between items-center font-extrabold">
                <span>{report.nutrientStatus.nitrogen[language]}</span>
                <Badge variant={report.nutrientStatus.nitrogen.level === 'Optimal' ? 'green' : 'amber'}>
                  {report.nutrientStatus.nitrogen.level}
                </Badge>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl flex justify-between items-center font-extrabold">
                <span>{report.nutrientStatus.phosphorus[language]}</span>
                <Badge variant={report.nutrientStatus.phosphorus.level === 'Optimal' ? 'green' : 'amber'}>
                  {report.nutrientStatus.phosphorus.level}
                </Badge>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl flex justify-between items-center font-extrabold">
                <span>{report.nutrientStatus.potassium[language]}</span>
                <Badge variant={report.nutrientStatus.potassium.level === 'Optimal' ? 'green' : 'amber'}>
                  {report.nutrientStatus.potassium.level}
                </Badge>
              </div>
            </div>
          </Card>

        </div>

        {/* Soil Health Management Recommendations */}
        <Card className="border-agri-green-600 bg-white space-y-3">
          <h4 className="text-base font-black text-agri-green-900">Recommended Soil Amendments & Management</h4>
          <div className="space-y-2">
            {report.recommendations[language].map((rec, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs font-bold text-gray-800 p-2.5 bg-emerald-50/60 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-agri-green-700 flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </Card>

      </section>

    </div>
  );
}

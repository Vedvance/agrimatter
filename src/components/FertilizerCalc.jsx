import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  Leaf, 
  DollarSign, 
  HelpCircle, 
  CheckCircle2, 
  Scale, 
  Sparkles 
} from 'lucide-react';

export const FertilizerCalc = () => {
  const { t, lang } = useLanguage();
  const [acres, setAcres] = useState(3);
  const [crop, setCrop] = useState('wheat');
  const [fertility, setFertility] = useState('medium');

  // Crop agronomic requirements per acre
  const cropFormulas = {
    wheat: { name: "Wheat (गेहूँ)", ureaPerAcre: 2.2, dapPerAcre: 1.1, mopPerAcre: 0.5, fymTonnes: 2.5 },
    rice: { name: "Paddy / Rice (धान)", ureaPerAcre: 2.4, dapPerAcre: 1.0, mopPerAcre: 0.6, fymTonnes: 3.0 },
    mustard: { name: "Mustard (सरसों)", ureaPerAcre: 1.8, dapPerAcre: 0.9, mopPerAcre: 0.4, fymTonnes: 2.0 },
    potato: { name: "Potato (आलू)", ureaPerAcre: 3.5, dapPerAcre: 2.0, mopPerAcre: 1.8, fymTonnes: 5.0 },
    cotton: { name: "Cotton (कपास)", ureaPerAcre: 2.8, dapPerAcre: 1.2, mopPerAcre: 0.8, fymTonnes: 2.5 },
    maize: { name: "Maize (मक्का)", ureaPerAcre: 2.5, dapPerAcre: 1.2, mopPerAcre: 0.5, fymTonnes: 3.0 }
  };

  // Fertility multiplier
  const multiplier = fertility === 'low' ? 1.15 : fertility === 'high' ? 0.85 : 1.0;

  const currentFormula = cropFormulas[crop] || cropFormulas.wheat;
  const totalUrea = Math.ceil(currentFormula.ureaPerAcre * acres * multiplier);
  const totalDap = Math.ceil(currentFormula.dapPerAcre * acres * multiplier);
  const totalMop = Math.ceil(currentFormula.mopPerAcre * acres * multiplier);
  const totalFym = (currentFormula.fymTonnes * acres).toFixed(1);

  const estimatedSavings = Math.round(acres * 2150);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 backdrop-blur border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 mb-4">
            <Scale className="w-3.5 h-3.5 text-amber-300" />
            <span>ICAR Scientific Nutrient Management Algorithm</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t('calc.title')}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {t('calc.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          {/* Acres Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('calc.landArea')}
              </label>
              <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {acres} Acres
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="25"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Select Target Crop */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t('calc.selectCrop')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(cropFormulas).map((cKey) => (
                <button
                  key={cKey}
                  type="button"
                  onClick={() => setCrop(cKey)}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition border ${
                    crop === cKey
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cropFormulas[cKey].name}
                </button>
              ))}
            </div>
          </div>

          {/* Soil Fertility */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t('calc.soilHealth')}
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              {[
                { id: 'low', label: 'Low Fertility' },
                { id: 'medium', label: 'Medium (Normal)' },
                { id: 'high', label: 'High Fertility' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setFertility(lvl.id)}
                  className={`py-2 px-1 rounded-xl border text-center transition ${
                    fertility === lvl.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Results */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Target Field: {acres} Acres ({currentFormula.name})
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  {t('calc.resultsTitle')}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3 py-1.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ICAR Balanced</span>
              </div>
            </div>

            {/* Bags Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Urea */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-500 block mb-1">
                  {t('calc.ureaBags')}
                </span>
                <div className="text-3xl font-black text-slate-900">
                  {totalUrea} <span className="text-xs font-medium text-slate-500">Bags (50kg)</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">Split in 2 doses</span>
              </div>

              {/* DAP */}
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-center">
                <span className="text-xs font-bold text-amber-900 block mb-1">
                  {t('calc.dapBags')}
                </span>
                <div className="text-3xl font-black text-amber-950">
                  {totalDap} <span className="text-xs font-medium text-amber-800">Bags (50kg)</span>
                </div>
                <span className="text-[11px] text-amber-700 block mt-1">Apply at sowing basal</span>
              </div>

              {/* MOP */}
              <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 text-center">
                <span className="text-xs font-bold text-rose-900 block mb-1">
                  {t('calc.mopBags')}
                </span>
                <div className="text-3xl font-black text-rose-950">
                  {totalMop} <span className="text-xs font-medium text-rose-800">Bags (50kg)</span>
                </div>
                <span className="text-[11px] text-rose-700 block mt-1">Improves grain weight</span>
              </div>
            </div>

            {/* Organic Compost Suggestion */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Leaf className="w-6 h-6 text-emerald-600" />
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">
                    {t('calc.organicCompost')}
                  </span>
                  <p className="text-[11px] text-emerald-800">
                    Apply well-rotted farmyard manure 2-3 weeks before sowing to boost soil microbial activity.
                  </p>
                </div>
              </div>
              <span className="text-lg font-black text-emerald-900 shrink-0">
                {totalFym} Tonnes
              </span>
            </div>
          </div>

          {/* Money Saved Alert */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-200 shrink-0" />
              <div className="text-xs leading-tight font-medium">
                <span className="font-extrabold block text-sm">
                  Estimated Financial Savings: ₹{estimatedSavings.toLocaleString('en-IN')}
                </span>
                By preventing unscientific over-fertilization, you protect the soil microbiome and save money!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

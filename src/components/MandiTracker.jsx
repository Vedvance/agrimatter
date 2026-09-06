import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { initialMandiData } from '../data/mandiData';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Filter, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Volume2, 
  Calendar 
} from 'lucide-react';

export const MandiTracker = () => {
  const { t, lang, speakText } = useLanguage();
  const [mandiItems] = useState(initialMandiData);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const states = ['All', 'Punjab', 'Haryana', 'Maharashtra', 'Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Uttar Pradesh', 'Karnataka'];

  const filteredMandi = useMemo(() => {
    return mandiItems.filter((item) => {
      const matchSearch = item.commodity.toLowerCase().includes(search.toLowerCase()) ||
                          item.mandi.toLowerCase().includes(search.toLowerCase()) ||
                          item.district.toLowerCase().includes(search.toLowerCase());
      const matchState = selectedState === 'All' || item.state === selectedState;
      return matchSearch && matchState;
    });
  }, [mandiItems, search, selectedState]);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/30 backdrop-blur border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-100 mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
            <span>e-NAM & APMC Live Price Aggregation</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t('mandi.title')}
          </h1>
          <p className="text-amber-100 text-sm sm:text-base leading-relaxed mb-4">
            {t('mandi.subtitle')}
          </p>

          <p className="text-xs text-amber-200/80 italic">
            • {t('mandi.lastUpdated')}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('mandi.searchCommodity')}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        {/* State Filter */}
        <div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          >
            {states.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? t('mandi.allStates') : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mandi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMandi.map((item) => {
          const isAboveMsp = item.modalPrice >= item.msp;
          const diff = item.modalPrice - item.msp;
          const diffPercent = ((diff / item.msp) * 100).toFixed(1);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group hover:border-amber-400"
            >
              <div>
                {/* Header: Commodity & Mandi */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-amber-700 transition">
                      {item.commodity}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium block">
                      Variety: {item.variety}
                    </span>
                  </div>

                  {/* Trend Badge */}
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                    item.trend === 'up' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : item.trend === 'down' 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                    {item.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                    {item.trend === 'stable' && <Minus className="w-3.5 h-3.5" />}
                    <span>{item.changePercent}</span>
                  </span>
                </div>

                {/* Mandi Location */}
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mb-4">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{item.mandi}, {item.district} ({item.state})</span>
                </div>

                {/* Price Display */}
                <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200/70 mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-bold text-amber-900">
                      {t('mandi.modalPrice')}
                    </span>
                    <span className="text-xl font-black text-amber-950">
                      ₹{item.modalPrice.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-amber-800 ml-1">/ Qtl</span>
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-600 pt-2 border-t border-amber-200/50">
                    <span>Min: ₹{item.minPrice}</span>
                    <span>Max: ₹{item.maxPrice}</span>
                  </div>
                </div>

                {/* MSP Comparison Alert */}
                <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between mb-3 ${
                  isAboveMsp 
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                }`}>
                  <div className="flex items-center gap-1.5">
                    {isAboveMsp ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span className="font-semibold">
                      {isAboveMsp ? t('mandi.aboveMsp') : t('mandi.belowMsp')}
                    </span>
                  </div>

                  <span className="font-black">
                    {diff >= 0 ? `+₹${diff}` : `-₹${Math.abs(diff)}`} ({diffPercent}%)
                  </span>
                </div>
              </div>

              {/* Footer Details & Listen Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Arrivals: {item.arrivalsTonnes} Tonnes</span>
                <button
                  onClick={() => speakText(
                    lang === 'hi'
                      ? `${item.commodity} का ${item.mandi} में औसत भाव ₹${item.modalPrice} प्रति क्विंटल है। सरकारी एमएसपी ₹${item.msp} है।`
                      : `${item.commodity} price at ${item.mandi} is ₹${item.modalPrice} per quintal compared to government MSP of ₹${item.msp}.`
                  )}
                  className="text-amber-700 hover:text-amber-900 flex items-center gap-1 font-bold"
                  title="Read Price Aloud"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'भाव सुनें' : 'Listen'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

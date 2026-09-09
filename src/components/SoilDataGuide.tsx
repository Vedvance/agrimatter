'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  MAJOR_SOIL_TYPES,
  CHEMICAL_PROPERTIES,
  PH_CLASSIFICATIONS,
  SOIL_DEFICIENCIES,
  PHYSICAL_PROPERTIES,
  BIOLOGICAL_PROPERTIES,
  SOIL_HEALTH_CARD_INFO,
  SoilType
} from '@/lib/soil-guide-data';
import {
  Search,
  SlidersHorizontal,
  FlaskConical,
  Sprout,
  ShieldAlert,
  FileCheck2,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Droplets,
  HelpCircle,
  MapPin,
  FileText
} from 'lucide-react';

export const SoilDataGuide: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'types' | 'properties' | 'ph' | 'deficiencies' | 'testing'>('types');

  // Soil Types tab state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFertility, setSelectedFertility] = useState<string>('All');

  // pH Slider state
  const [phVal, setPhVal] = useState<number>(6.8);

  // Crop-Soil Matcher state
  const [matcherSoilType, setMatcherSoilType] = useState<string>('alluvial');
  const [matcherPh, setMatcherPh] = useState<number>(7.0);

  // Deficiency tab filter
  const [selectedDeficiency, setSelectedDeficiency] = useState<string>('All');

  // Filter Soil Types
  const filteredSoilTypes = MAJOR_SOIL_TYPES.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.hindiName.includes(searchTerm) ||
      st.bestCrops.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
      st.texture.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFertility =
      selectedFertility === 'All' || st.fertility.toLowerCase().includes(selectedFertility.toLowerCase());

    return matchesSearch && matchesFertility;
  });

  // Calculate pH classification
  const currentPhClass = PH_CLASSIFICATIONS.find(
    (item) => phVal >= item.minPh && phVal <= item.maxPh
  ) || PH_CLASSIFICATIONS[2];

  // Matcher evaluation
  const matchedSoil = MAJOR_SOIL_TYPES.find((s) => s.id === matcherSoilType) || MAJOR_SOIL_TYPES[0];
  const matchedPhClass = PH_CLASSIFICATIONS.find(
    (item) => matcherPh >= item.minPh && matcherPh <= item.maxPh
  ) || PH_CLASSIFICATIONS[2];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-agri-green-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-8 -translate-y-8 pointer-events-none">
          <FlaskConical className="w-72 h-72 text-white" />
        </div>
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-700/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-200 border border-emerald-500/30">
            <Sprout className="w-3.5 h-3.5" />
            <span>{isHi ? 'किसान मृदा ज्ञानकोश & गाइड' : 'Complete Farming Soil Reference Guide'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {isHi ? 'मृदा डेटा एवं कृषि उपयुक्तता गाइड' : 'Soil Data Guide for Smart Farming'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            {isHi
              ? 'विभिन्न मिट्टियों के प्रकार, भौतिक-रासायनिक गुण, pH मान, पोषक तत्वों की कमी के लक्षण और सुधार के उपाय।'
              : 'Comprehensive reference covering soil types, pH ranges, lab testing benchmarks, nutrient deficiency diagnosis, and crop suitability.'}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar space-x-2 border-b border-emerald-100 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('types')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'types'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isHi ? '1. प्रमुख मिट्टियां (Soil Types)' : '1. Major Soil Types'}</span>
        </button>

        <button
          onClick={() => setActiveTab('properties')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'properties'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>{isHi ? '2. मृदा गुण & मानक' : '2. Key Soil Properties'}</span>
        </button>

        <button
          onClick={() => setActiveTab('ph')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'ph'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{isHi ? '3. pH एवं फसल मैच' : '3. pH & Crop Matcher'}</span>
        </button>

        <button
          onClick={() => setActiveTab('deficiencies')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'deficiencies'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{isHi ? '4. कमी के लक्षण & उपाय' : '4. Deficiency Diagnosis'}</span>
        </button>

        <button
          onClick={() => setActiveTab('testing')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'testing'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>{isHi ? '5. मृदा कार्ड & टेस्ट गाइड' : '5. Soil Card & Testing'}</span>
        </button>
      </div>

      {/* TAB 1: Major Soil Types Finder */}
      {activeTab === 'types' && (
        <div className="space-y-4">
          
          {/* Controls / Filter bar */}
          <Card className="bg-emerald-50/50 border-emerald-200 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              
              {/* Search bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder={isHi ? 'मिट्टी या फसल का नाम खोजें...' : 'Search soil or crop (e.g. Cotton, Black)...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              {/* Fertility Filter */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-xs font-extrabold text-agri-green-900 whitespace-nowrap">
                  {isHi ? 'उर्वरता लेवल:' : 'Fertility Filter:'}
                </span>
                <select
                  value={selectedFertility}
                  onChange={(e) => setSelectedFertility(e.target.value)}
                  className="p-2 text-xs font-bold rounded-xl border border-gray-300 bg-white focus:outline-none"
                >
                  <option value="All">{isHi ? 'सभी उर्वरता स्तर' : 'All Fertility Levels'}</option>
                  <option value="High">{isHi ? 'उच्च (High)' : 'High Fertility'}</option>
                  <option value="Moderate">{isHi ? 'मध्यम (Moderate)' : 'Moderate Fertility'}</option>
                  <option value="Low">{isHi ? 'कम (Low)' : 'Low Fertility'}</option>
                </select>
              </div>

            </div>
          </Card>

          {/* Soil Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSoilTypes.map((soil) => (
              <Card key={soil.id} className="hover:shadow-md transition-shadow border-emerald-200 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-black text-agri-green-900">
                        {isHi ? soil.hindiName : soil.name}
                      </h3>
                      <p className="text-xs text-gray-600 font-semibold mt-0.5">{soil.description}</p>
                    </div>
                    <Badge variant={soil.fertility.includes('High') ? 'green' : soil.fertility.includes('Moderate') ? 'amber' : 'red'}>
                      {soil.fertility} Fertility
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="p-2 bg-emerald-50/60 rounded-xl">
                      <span className="block text-[10px] font-extrabold text-agri-green-800 uppercase">
                        {isHi ? 'बनावट (Texture)' : 'Texture'}
                      </span>
                      <span className="font-bold text-gray-800">{soil.texture}</span>
                    </div>

                    <div className="p-2 bg-emerald-50/60 rounded-xl">
                      <span className="block text-[10px] font-extrabold text-agri-green-800 uppercase">
                        {isHi ? 'जल निकास (Drainage)' : 'Drainage'}
                      </span>
                      <span className="font-bold text-gray-800">{soil.drainage}</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1 text-xs">
                    <div className="flex items-center space-x-1 font-bold text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isHi ? 'प्रचुरता:' : 'Rich In:'} <span className="font-normal text-gray-700">{soil.richIn}</span></span>
                    </div>
                    <div className="flex items-center space-x-1 font-bold text-amber-800">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isHi ? 'कमी:' : 'Deficient In:'} <span className="font-normal text-gray-700">{soil.deficientIn}</span></span>
                    </div>
                  </div>
                </div>

                {/* Best Suited Crops Badges */}
                <div className="pt-2 border-t border-gray-100">
                  <span className="block text-[10px] font-black text-gray-500 uppercase mb-1">
                    {isHi ? 'सर्वोत्तम उपयुक्त फसलें:' : 'Best Suited Crops:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {soil.bestCrops.map((crop, i) => (
                      <span key={i} className="px-2 py-1 bg-emerald-100/80 text-agri-green-900 rounded-lg text-[11px] font-extrabold">
                        🌱 {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: Key Soil Properties */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          
          {/* Chemical Properties Table */}
          <Card className="space-y-4 border-emerald-200">
            <div className="flex items-center space-x-2">
              <FlaskConical className="w-5 h-5 text-agri-green-700" />
              <h3 className="text-lg font-black text-agri-green-900">
                {isHi ? 'रासायनिक गुण एवं आदर्श सीमाएं' : 'Chemical Properties & Recommended Ranges'}
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-agri-green-900 text-white font-extrabold uppercase tracking-wider">
                    <th className="p-3 rounded-tl-xl">Parameter</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Ideal Range / Unit</th>
                    <th className="p-3 rounded-tr-xl">Notes & Agronomic Importance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {CHEMICAL_PROPERTIES.map((cp, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'}>
                      <td className="p-3 font-extrabold text-agri-green-900">{cp.parameter}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          cp.category === 'Macronutrient'
                            ? 'bg-emerald-100 text-emerald-800'
                            : cp.category === 'Micronutrient'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {cp.category}
                        </span>
                      </td>
                      <td className="p-3 font-black text-emerald-900">
                        {cp.idealRange} <span className="font-normal text-gray-500">{cp.unit}</span>
                      </td>
                      <td className="p-3 text-gray-700 font-medium">
                        {isHi ? cp.hindiNotes : cp.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Physical & Biological Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Physical Properties */}
            <Card className="space-y-4 border-emerald-200">
              <h3 className="text-base font-black text-agri-green-900 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-agri-brown-700" />
                <span>{isHi ? 'भौतिक गुण (Physical Properties)' : 'Physical Properties'}</span>
              </h3>
              <div className="space-y-3 text-xs">
                {PHYSICAL_PROPERTIES.map((pp, i) => (
                  <div key={i} className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <div className="flex justify-between items-center font-black text-agri-green-900">
                      <span>{isHi ? pp.hindiName : pp.property}</span>
                      <span className="px-2 py-0.5 bg-emerald-200/60 rounded text-[10px] font-bold text-emerald-900">
                        Ideal: {pp.ideal}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium">{pp.description}</p>
                    <p className="text-emerald-800 font-semibold text-[11px]">💡 {pp.impact}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Biological Properties */}
            <Card className="space-y-4 border-emerald-200">
              <h3 className="text-base font-black text-agri-green-900 flex items-center space-x-2">
                <Sprout className="w-5 h-5 text-agri-green-700" />
                <span>{isHi ? 'जैविक गुण (Biological Properties)' : 'Biological Properties'}</span>
              </h3>
              <div className="space-y-3 text-xs">
                {BIOLOGICAL_PROPERTIES.map((bp, i) => (
                  <div key={i} className="p-3 bg-emerald-50/50 rounded-xl space-y-1">
                    <div className="flex justify-between items-center font-black text-agri-green-900">
                      <span>{isHi ? bp.hindiName : bp.property}</span>
                      <span className="px-2 py-0.5 bg-emerald-200/60 rounded text-[10px] font-bold text-emerald-900">
                        Ideal: {bp.ideal}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium">{bp.description}</p>
                    <p className="text-emerald-800 font-semibold text-[11px]">✨ {bp.significance}</p>
                  </div>
                ))}
              </div>
            </Card>

          </div>

        </div>
      )}

      {/* TAB 3: Interactive pH & Crop Matcher */}
      {activeTab === 'ph' && (
        <div className="space-y-6">
          
          {/* Interactive pH Slider Widget */}
          <Card className="bg-emerald-50/40 border-emerald-200 space-y-5 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="text-xl font-black text-agri-green-900">
                  {isHi ? 'इंटरएक्टिव pH सिमुलेटर & फसल चयन' : 'Interactive Soil pH Calculator & Crop Matcher'}
                </h3>
                <p className="text-xs text-gray-600 font-semibold">
                  {isHi ? 'स्लाइडर हिलाकर मिट्टी का pH बदलें और उपयुक्त फसलें देखें' : 'Slide to adjust soil pH and discover crop suitability and required soil treatments'}
                </p>
              </div>
              
              <div className="px-4 py-2 rounded-2xl bg-agri-green-900 text-white font-black text-xl shadow-sm">
                pH {phVal.toFixed(1)}
              </div>
            </div>

            {/* Range Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="4.0"
                max="10.0"
                step="0.1"
                value={phVal}
                onChange={(e) => setPhVal(parseFloat(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-red-400 via-amber-300 via-emerald-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-black text-gray-500">
                <span>4.0 (Strongly Acidic)</span>
                <span>6.0 (Slightly Acidic)</span>
                <span>7.0 (Neutral)</span>
                <span>8.0 (Alkaline)</span>
                <span>10.0 (Strongly Alkaline)</span>
              </div>
            </div>

            {/* Dynamic Results Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 bg-white rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant={phVal >= 6.0 && phVal <= 7.5 ? 'green' : phVal < 6.0 ? 'amber' : 'red'}>
                    {isHi ? currentPhClass.hindiClassification : currentPhClass.classification}
                  </Badge>
                </div>
                <h4 className="text-xs font-black text-agri-green-900 uppercase tracking-wider">
                  {isHi ? 'उपयुक्त फसलें:' : 'Suitable Crops:'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentPhClass.suitableCrops.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 bg-emerald-100 text-agri-green-900 rounded-lg text-xs font-bold">
                      🌿 {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="text-xs font-black text-agri-green-900 uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-agri-green-700" />
                  <span>{isHi ? 'मृदा सुधार एवं प्रबंधन:' : 'Soil Reclamation & Management:'}</span>
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {isHi ? currentPhClass.hindiManagement : currentPhClass.management}
                </p>
              </div>

            </div>
          </Card>

          {/* Quick Crop-Soil Matcher Matrix */}
          <Card className="space-y-4 border-emerald-200">
            <h3 className="text-lg font-black text-agri-green-900 flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-agri-green-700" />
              <span>{isHi ? 'फसल-मिट्टी अनुकूलता मैचर (Crop-Soil Matcher)' : 'Crop-Soil Matcher Tool'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-extrabold text-agri-green-900 mb-1">
                  {isHi ? 'अपनी मिट्टी का प्रकार चुनें:' : 'Select Soil Type:'}
                </label>
                <select
                  value={matcherSoilType}
                  onChange={(e) => setMatcherSoilType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-bold text-xs bg-white"
                >
                  {MAJOR_SOIL_TYPES.map((st) => (
                    <option key={st.id} value={st.id}>
                      {isHi ? st.hindiName : st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-agri-green-900 mb-1">
                  {isHi ? 'मिट्टी का pH स्तर तय करें:' : 'Select pH Range:'}
                </label>
                <select
                  value={matcherPh}
                  onChange={(e) => setMatcherPh(parseFloat(e.target.value))}
                  className="w-full p-3 rounded-xl border border-gray-300 font-bold text-xs bg-white"
                >
                  <option value={5.0}>Below 5.5 (Acidic)</option>
                  <option value={6.2}>5.5 – 6.5 (Slightly Acidic)</option>
                  <option value={7.0}>6.5 – 7.5 (Optimal / Neutral)</option>
                  <option value={8.0}>7.5 – 8.5 (Alkaline)</option>
                  <option value={9.0}>Above 8.5 (Strongly Alkaline)</option>
                </select>
              </div>

            </div>

            {/* Matcher Result Card */}
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-300 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-agri-green-900 uppercase">
                  Match Analysis Result
                </span>
                <Badge variant="green">High Agronomic Compatibility</Badge>
              </div>

              <p className="text-xs text-gray-700 font-medium">
                In <strong>{matchedSoil.name}</strong> at <strong>pH {matcherPh}</strong> ({matchedPhClass.classification}), recommended top crops are:
              </p>

              <div className="flex flex-wrap gap-2">
                {matchedSoil.bestCrops.map((c, idx) => (
                  <div key={idx} className="px-3 py-1.5 bg-white border border-emerald-200 rounded-xl text-xs font-black text-agri-green-900 shadow-xs">
                    🌾 {c}
                  </div>
                ))}
              </div>
            </div>

          </Card>

        </div>
      )}

      {/* TAB 4: Deficiency Diagnosis & Soil Improvement */}
      {activeTab === 'deficiencies' && (
        <div className="space-y-4">
          
          <Card className="bg-amber-50/40 border-amber-200 p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-black text-agri-green-900">
                {isHi ? 'पोषक तत्वों की कमी के लक्षण एवं निदान निर्देशिका' : 'Soil Nutrient Deficiency Diagnostic Guide'}
              </h3>
            </div>
            <p className="text-xs text-gray-600 font-medium">
              {isHi
                ? 'पत्तियों पर दिखने वाले लक्षणों से पहचाने मिट्टी में किस तत्व की कमी है और तुरंत सही खाद चुनें।'
                : 'Identify soil nutrient deficiencies from crop visual symptoms and apply targeted soil amendments.'}
            </p>

            <div className="flex items-center space-x-2 pt-1">
              <span className="text-xs font-bold text-gray-700">{isHi ? 'फिल्टर पोषक तत्व:' : 'Filter Nutrient:'}</span>
              <select
                value={selectedDeficiency}
                onChange={(e) => setSelectedDeficiency(e.target.value)}
                className="p-2 text-xs font-bold rounded-xl border border-gray-300 bg-white"
              >
                <option value="All">All Nutrients & Conditions</option>
                {SOIL_DEFICIENCIES.map((sd, i) => (
                  <option key={i} value={sd.deficiency}>
                    {sd.deficiency}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          <div className="space-y-4">
            {SOIL_DEFICIENCIES.filter(
              (sd) => selectedDeficiency === 'All' || sd.deficiency === selectedDeficiency
            ).map((item, idx) => (
              <Card key={idx} className="border-emerald-200 hover:border-emerald-400 transition-colors space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-black text-agri-green-900 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{isHi ? item.hindiDeficiency : item.deficiency}</span>
                  </h4>
                  <Badge variant="amber">Correction Required</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  
                  <div className="p-3 bg-amber-50/60 rounded-xl space-y-1">
                    <span className="block font-black text-amber-900 uppercase text-[10px]">
                      {isHi ? 'दृश्यमान लक्षण (Visual Symptoms):' : 'Visual Symptoms:'}
                    </span>
                    <p className="text-gray-800 font-semibold">{isHi ? item.hindiSymptoms : item.symptoms}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/60 rounded-xl space-y-1">
                    <span className="block font-black text-agri-green-900 uppercase text-[10px]">
                      {isHi ? 'निदान एवं सुधार (Corrective Measures):' : 'Correction Strategy:'}
                    </span>
                    <p className="text-gray-800 font-semibold">{isHi ? item.hindiCorrection : item.correction}</p>
                  </div>

                </div>

                {/* Recommended Products */}
                <div className="pt-1 flex items-center space-x-2 text-xs">
                  <span className="font-extrabold text-agri-green-900 text-[11px]">
                    {isHi ? 'अनुशंसित उत्पाद/उर्वरक:' : 'Recommended Products:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.recommendedProducts.map((p, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded font-bold text-[10px]">
                        📦 {p}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </div>
      )}

      {/* TAB 5: Soil Health Card & Testing Guide */}
      {activeTab === 'testing' && (
        <div className="space-y-6">
          
          {/* Soil Health Card Parameters Card */}
          <Card className="space-y-4 border-emerald-200">
            <div className="flex items-center space-x-2">
              <FileCheck2 className="w-5 h-5 text-agri-green-700" />
              <h3 className="text-lg font-black text-agri-green-900">
                {isHi ? SOIL_HEALTH_CARD_INFO.hindiTitle : SOIL_HEALTH_CARD_INFO.title}
              </h3>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl text-xs font-bold text-agri-green-900">
              📅 {isHi ? 'नमूना लेने की आवृत्ति:' : 'Recommended Testing Frequency:'}{' '}
              <span className="text-emerald-700 font-extrabold">{SOIL_HEALTH_CARD_INFO.testingFrequency}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
              {SOIL_HEALTH_CARD_INFO.parameters.map((param, i) => (
                <div key={i} className="p-2.5 bg-white border border-emerald-200 rounded-xl font-extrabold text-agri-green-900 flex items-center space-x-1.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{param}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Sampling Steps Guide */}
          <Card className="space-y-4 border-emerald-200">
            <h3 className="text-base font-black text-agri-green-900 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-agri-green-700" />
              <span>{isHi ? 'नमूना लेने का सही तरीका (Step-by-Step Soil Sampling)' : 'How to Collect Soil Samples (4 Steps)'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {SOIL_HEALTH_CARD_INFO.samplingSteps.map((step) => (
                <div key={step.step} className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-200 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="w-6 h-6 rounded-full bg-agri-green-800 text-white font-black text-xs flex items-center justify-center">
                      {step.step}
                    </span>
                    <h4 className="font-black text-agri-green-900 pt-1">{step.title}</h4>
                    <p className="text-gray-600 font-medium leading-relaxed">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Official Authorities Reference */}
          <Card className="bg-gray-50 border-gray-200 space-y-3 p-4">
            <h4 className="text-xs font-black text-gray-600 uppercase tracking-wider flex items-center space-x-1">
              <Info className="w-4 h-4 text-gray-500" />
              <span>Reference Agricultural Survey Authorities</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {SOIL_HEALTH_CARD_INFO.authorities.map((auth, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-gray-200 space-y-1">
                  <span className="font-extrabold text-agri-green-900 block">{auth.name}</span>
                  <span className="text-[11px] text-gray-500 font-medium">{auth.description}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      )}

    </div>
  );
};

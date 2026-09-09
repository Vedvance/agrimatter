'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  CROP_CATEGORIES,
  CROP_GROWING_DATA,
  CROP_ROTATION_RULES,
  CropGrowingData
} from '@/lib/crop-guide-data';
import {
  Search,
  Sprout,
  Calculator,
  RefreshCw,
  Bug,
  Award,
  Layers,
  Thermometer,
  Droplets,
  Calendar,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';

export const CropDataGuide: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'finder' | 'fertilizer' | 'rotation' | 'pests' | 'yield'>('finder');

  // Crop Finder state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');

  // Fertilizer Calculator state
  const [calcCropId, setCalcCropId] = useState<string>('rice');
  const [farmArea, setFarmArea] = useState<number>(1);
  const [areaUnit, setAreaUnit] = useState<'acre' | 'hectare'>('acre');

  // Filter crops
  const filteredCrops = CROP_GROWING_DATA.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.hindiName.includes(searchTerm) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.soilType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || c.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSeason =
      selectedSeason === 'All' || c.season === selectedSeason;

    return matchesSearch && matchesCategory && matchesSeason;
  });

  // Fertilizer calculation
  const calcCrop = CROP_GROWING_DATA.find((c) => c.id === calcCropId) || CROP_GROWING_DATA[0];
  const areaInHa = areaUnit === 'acre' ? farmArea * 0.404686 : farmArea;

  const totalN = Math.round(calcCrop.npkKgHa.n * areaInHa);
  const totalP = Math.round(calcCrop.npkKgHa.p * areaInHa);
  const totalK = Math.round(calcCrop.npkKgHa.k * areaInHa);

  // Approximate commercial bags (50kg bags)
  // DAP gives 18% N, 46% P. MOP gives 60% K. Urea gives 46% N.
  const dapBags = Math.ceil((totalP / 0.46) / 50);
  const nFromDap = Math.round(dapBags * 50 * 0.18);
  const remN = Math.max(0, totalN - nFromDap);
  const ureaBags = Math.ceil((remN / 0.46) / 50);
  const mopBags = Math.ceil((totalK / 0.60) / 50);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-agri-green-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-8 -translate-y-8 pointer-events-none">
          <Sprout className="w-72 h-72 text-white" />
        </div>
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-700/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-200 border border-emerald-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>{isHi ? 'किसान फसल ज्ञानकोश & गाइड' : 'Complete Agronomic Crop Reference Guide'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {isHi ? 'फसल डेटा एवं कृषि गाइड' : 'Crop Data Guide for Smart Farming'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            {isHi
              ? 'फसलों के मौसम, मिट्टी का pH, तापमान, जल मांग, NPK पोषण, कीट-बीमारी प्रबंधन एवं कटाई के मुख्य सूचक।'
              : 'Detailed reference covering major crop categories, optimal temperature, soil pH, NPK requirements, companion planting, and yield benchmarks.'}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar space-x-2 border-b border-emerald-100 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('finder')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'finder'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>{isHi ? '1. फसल खोजक (Crop Finder)' : '1. Crop Finder'}</span>
        </button>

        <button
          onClick={() => setActiveTab('fertilizer')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'fertilizer'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{isHi ? '2. NPK पोषण कैलकुलेटर' : '2. NPK Fertilizer Calc'}</span>
        </button>

        <button
          onClick={() => setActiveTab('rotation')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'rotation'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>{isHi ? '3. फसल चक्र & सह-खेती' : '3. Crop Rotation & Companion'}</span>
        </button>

        <button
          onClick={() => setActiveTab('pests')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'pests'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <Bug className="w-4 h-4" />
          <span>{isHi ? '4. कीट एवं बीमारी गाइड' : '4. Pest & Disease Alert'}</span>
        </button>

        <button
          onClick={() => setActiveTab('yield')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'yield'
              ? 'bg-agri-green-800 text-white shadow-sm'
              : 'bg-emerald-50/60 text-gray-700 hover:bg-emerald-100/60 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{isHi ? '5. कटाई & पैदावार मानक' : '5. Harvest & Yield Reference'}</span>
        </button>
      </div>

      {/* TAB 1: Crop Finder & Category Directory */}
      {activeTab === 'finder' && (
        <div className="space-y-6">
          
          {/* Category Overview */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-agri-green-900 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-agri-green-700" />
              <span>{isHi ? 'प्रमुख फसल वर्ग (Major Crop Categories)' : 'Major Crop Categories'}</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CROP_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-xs text-agri-green-900">{isHi ? cat.hindiCategory : cat.category}</span>
                    <Badge variant="green" className="text-[9px]">Category</Badge>
                  </div>
                  <p className="text-[11px] text-gray-600 font-medium">{isHi ? cat.hindiDescription : cat.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {cat.examples.slice(0, 4).map((ex, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-white text-gray-700 rounded text-[10px] font-bold border border-gray-200">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search & Filter Controls */}
          <Card className="bg-emerald-50/50 border-emerald-200 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder={isHi ? 'फसल का नाम खोजें...' : 'Search crop name...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border border-gray-300 focus:outline-none bg-white"
                />
              </div>

              {/* Season Filter */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-xs font-extrabold text-agri-green-900 whitespace-nowrap">
                  {isHi ? 'मौसम:' : 'Season:'}
                </span>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="p-2 text-xs font-bold rounded-xl border border-gray-300 bg-white"
                >
                  <option value="All">All Seasons</option>
                  <option value="Kharif">Kharif (खरीफ)</option>
                  <option value="Rabi">Rabi (रबी)</option>
                  <option value="Zaid">Zaid (जायद)</option>
                  <option value="Perennial">Perennial (बारहमासी)</option>
                  <option value="Year-round">Year-round (वर्षभर)</option>
                </select>
              </div>

            </div>
          </Card>

          {/* Crop Growing Data Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCrops.map((crop) => (
              <Card key={crop.id} className="hover:border-emerald-400 transition-all border-emerald-200 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-black text-agri-green-900">
                        {isHi ? crop.hindiName : crop.name}
                      </h4>
                      <span className="text-[11px] font-bold text-gray-500">{crop.category}</span>
                    </div>
                    <Badge variant={crop.season === 'Kharif' ? 'green' : crop.season === 'Rabi' ? 'amber' : 'blue'}>
                      {crop.season}
                    </Badge>
                  </div>

                  {/* Param Badges Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 bg-emerald-50/60 rounded-xl space-y-0.5">
                      <span className="flex items-center space-x-1 text-[10px] font-extrabold text-agri-green-800">
                        <Thermometer className="w-3 h-3 text-red-500" />
                        <span>Temp Range</span>
                      </span>
                      <span className="font-extrabold text-gray-800">{crop.tempRange}</span>
                    </div>

                    <div className="p-2 bg-emerald-50/60 rounded-xl space-y-0.5">
                      <span className="flex items-center space-x-1 text-[10px] font-extrabold text-agri-green-800">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span>Water Need</span>
                      </span>
                      <span className="font-extrabold text-gray-800">{crop.waterReqMm}</span>
                    </div>

                    <div className="p-2 bg-emerald-50/60 rounded-xl space-y-0.5">
                      <span className="flex items-center space-x-1 text-[10px] font-extrabold text-agri-green-800">
                        <FlaskConical className="w-3 h-3 text-emerald-600" />
                        <span>Soil pH</span>
                      </span>
                      <span className="font-extrabold text-gray-800">{crop.soilPh}</span>
                    </div>

                    <div className="p-2 bg-emerald-50/60 rounded-xl space-y-0.5">
                      <span className="flex items-center space-x-1 text-[10px] font-extrabold text-agri-green-800">
                        <Calendar className="w-3 h-3 text-purple-500" />
                        <span>Duration</span>
                      </span>
                      <span className="font-extrabold text-gray-800">{crop.durationDays}</span>
                    </div>
                  </div>

                  <div className="p-2 bg-gray-50 rounded-xl text-xs">
                    <span className="font-extrabold text-agri-green-900 text-[10px] block uppercase">Suitable Soil Type:</span>
                    <span className="font-bold text-gray-700">{crop.soilType}</span>
                  </div>

                </div>

                <div className="pt-2 border-t border-gray-100 text-[11px] font-bold text-emerald-800 flex justify-between items-center">
                  <span>Avg Yield: {crop.avgYieldTonnesHa}</span>
                </div>
              </Card>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: NPK Fertilizer Calculator */}
      {activeTab === 'fertilizer' && (
        <div className="space-y-6">
          
          <Card className="bg-emerald-50/40 border-emerald-200 p-6 space-y-5">
            <div>
              <h3 className="text-xl font-black text-agri-green-900 flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-agri-green-700" />
                <span>{isHi ? 'फसल NPK पोषण एवं खाद कैलकुलेटर' : 'Crop NPK Fertilizer Dose Calculator'}</span>
              </h3>
              <p className="text-xs text-gray-600 font-medium mt-1">
                {isHi
                  ? 'अपनी फसल और खेत का क्षेत्रफल दर्ज करके यूरिया, डीएपी (DAP) और पोटाश (MOP) बोरी की गणना करें।'
                  : 'Select your crop and farm size to compute required NPK nutrients and recommended 50kg fertilizer bags.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div>
                <label className="block text-xs font-extrabold text-agri-green-900 mb-1">
                  {isHi ? 'फसल चुनें:' : 'Select Crop:'}
                </label>
                <select
                  value={calcCropId}
                  onChange={(e) => setCalcCropId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-bold text-xs bg-white"
                >
                  {CROP_GROWING_DATA.filter(c => c.npkKgHa.n > 0).map((c) => (
                    <option key={c.id} value={c.id}>
                      {isHi ? c.hindiName : c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-agri-green-900 mb-1">
                  {isHi ? 'खेत का क्षेत्रफल:' : 'Farm Size Area:'}
                </label>
                <input
                  type="number"
                  min="0.25"
                  step="0.25"
                  value={farmArea}
                  onChange={(e) => setFarmArea(parseFloat(e.target.value) || 1)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-bold text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-agri-green-900 mb-1">
                  {isHi ? 'इकाई (Unit):' : 'Area Unit:'}
                </label>
                <select
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-bold text-xs bg-white"
                >
                  <option value="acre">Acre (एकड़)</option>
                  <option value="hectare">Hectare (हेक्टेयर)</option>
                </select>
              </div>

            </div>

            {/* Calculated Results Display */}
            <div className="pt-2 space-y-4">
              <h4 className="text-xs font-black uppercase text-agri-green-900 tracking-wider">
                Target Nutrients Required for {farmArea} {areaUnit} of {calcCrop.name}:
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-white border border-emerald-200 rounded-xl text-center">
                  <span className="block text-[10px] font-extrabold text-agri-green-800 uppercase">Nitrogen (N)</span>
                  <span className="text-lg font-black text-agri-green-900">{totalN} kg</span>
                </div>
                <div className="p-3 bg-white border border-emerald-200 rounded-xl text-center">
                  <span className="block text-[10px] font-extrabold text-agri-green-800 uppercase">Phosphorus (P)</span>
                  <span className="text-lg font-black text-agri-green-900">{totalP} kg</span>
                </div>
                <div className="p-3 bg-white border border-emerald-200 rounded-xl text-center">
                  <span className="block text-[10px] font-extrabold text-agri-green-800 uppercase">Potassium (K)</span>
                  <span className="text-lg font-black text-agri-green-900">{totalK} kg</span>
                </div>
              </div>

              {/* Recommended Commercial Fertilizer Bags */}
              <div className="p-4 bg-emerald-100/60 rounded-2xl border border-emerald-300 space-y-2">
                <span className="text-xs font-black text-agri-green-900 uppercase block flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-agri-green-700" />
                  <span>Estimated Commercial Fertilizer Bag Quantities (50kg Bags):</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold pt-1">
                  <div className="p-2.5 bg-white rounded-xl flex justify-between items-center border border-emerald-200">
                    <span>Neem Coated Urea (46% N)</span>
                    <Badge variant="green">{ureaBags} Bags</Badge>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl flex justify-between items-center border border-emerald-200">
                    <span>DAP (18-46-0)</span>
                    <Badge variant="green">{dapBags} Bags</Badge>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl flex justify-between items-center border border-emerald-200">
                    <span>MOP (60% K2O)</span>
                    <Badge variant="green">{mopBags} Bags</Badge>
                  </div>
                </div>

                <p className="text-[11px] text-gray-600 font-medium pt-1">
                  💡 <em>Note: Apply full DAP and MOP at sowing as basal dose, and split Urea into 2-3 top dressings during basal, vegetative, and tillering stages.</em>
                </p>
              </div>

            </div>

          </Card>

        </div>
      )}

      {/* TAB 3: Crop Rotation & Companion Planting */}
      {activeTab === 'rotation' && (
        <div className="space-y-6">
          
          <Card className="space-y-4 border-emerald-200">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-agri-green-700" />
              <h3 className="text-lg font-black text-agri-green-900">
                {isHi ? 'फसल चक्र एवं सह-खेती तकनीकें' : 'Agronomic Crop Rotation & Companion Planting'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CROP_ROTATION_RULES.map((rule, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border space-y-2 ${
                    rule.category === 'Avoid'
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-emerald-50/50 border-emerald-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-black text-sm text-agri-green-900">
                      {isHi ? rule.hindiPractice : rule.practice}
                    </h4>
                    <Badge variant={rule.category === 'Avoid' ? 'amber' : 'green'}>
                      {rule.category}
                    </Badge>
                  </div>

                  <div className="p-2 bg-white rounded-xl text-xs font-bold text-gray-800">
                    📌 {isHi ? rule.hindiExample : rule.example}
                  </div>

                  <p className="text-xs text-gray-600 font-medium">
                    {isHi ? rule.hindiBenefit : rule.benefit}
                  </p>
                </div>
              ))}
            </div>
          </Card>

        </div>
      )}

      {/* TAB 4: Pest & Disease Alert */}
      {activeTab === 'pests' && (
        <div className="space-y-4">
          
          <Card className="bg-amber-50/40 border-amber-200 p-4 space-y-2">
            <h3 className="text-base font-black text-agri-green-900 flex items-center space-x-2">
              <Bug className="w-5 h-5 text-amber-700" />
              <span>{isHi ? 'प्रमुख फसलों के कीट एवं रोग निर्देशिका' : 'Pest & Disease Reference Matrix'}</span>
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Identify common insect pests and fungal/bacterial diseases affecting key field and cash crops.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CROP_GROWING_DATA.filter(c => c.pests.length > 0).map((c) => (
              <Card key={c.id} className="border-emerald-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-agri-green-900">{isHi ? c.hindiName : c.name}</h4>
                  <Badge variant="amber">{c.season}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-red-50/60 rounded-xl space-y-1">
                    <span className="block font-black text-red-900 uppercase text-[10px]">Common Pests (कीट):</span>
                    <ul className="space-y-0.5 text-gray-800 font-semibold">
                      {c.pests.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 bg-amber-50/60 rounded-xl space-y-1">
                    <span className="block font-black text-amber-900 uppercase text-[10px]">Common Diseases (रोग):</span>
                    <ul className="space-y-0.5 text-gray-800 font-semibold">
                      {c.diseases.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </div>
      )}

      {/* TAB 5: Harvest & Yield Reference */}
      {activeTab === 'yield' && (
        <div className="space-y-6">
          
          <Card className="space-y-4 border-emerald-200">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-agri-green-700" />
              <h3 className="text-lg font-black text-agri-green-900">
                {isHi ? 'फसल पैदावार एवं कटाई परिपक्वता सूचक' : 'Harvest Readiness & Average Yield Reference'}
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-agri-green-900 text-white font-extrabold uppercase tracking-wider">
                    <th className="p-3 rounded-tl-xl">Crop Name</th>
                    <th className="p-3">Average Yield (t/ha)</th>
                    <th className="p-3">Duration (Days)</th>
                    <th className="p-3 rounded-tr-xl">Harvest Readiness Indicator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {CROP_GROWING_DATA.map((c, idx) => (
                    <tr key={c.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'}>
                      <td className="p-3 font-extrabold text-agri-green-900">{isHi ? c.hindiName : c.name}</td>
                      <td className="p-3 font-black text-emerald-800">{c.avgYieldTonnesHa}</td>
                      <td className="p-3 font-bold text-gray-700">{c.durationDays}</td>
                      <td className="p-3 text-gray-700 font-medium">
                        {isHi ? c.hindiHarvestIndicator : c.harvestIndicator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      )}

    </div>
  );
};

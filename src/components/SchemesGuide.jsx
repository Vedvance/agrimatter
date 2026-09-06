import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { governmentSchemesData } from '../data/schemesData';
import { 
  Award, 
  CheckSquare, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const SchemesGuide = () => {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState('All');
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);

  // Quick eligibility checker state
  const [landOwned, setLandOwned] = useState('yes');
  const [aadhaarLinked, setAadhaarLinked] = useState('yes');
  const [hasKcc, setHasKcc] = useState('no');
  const [eligibilityResult, setEligibilityResult] = useState(null);

  const categories = [
    { id: 'All', label: t('schemes.allSchemes') },
    { id: 'Financial Support', label: t('schemes.financialSupport') },
    { id: 'Crop Insurance', label: t('schemes.insurance') },
    { id: 'Solar & Irrigation', label: t('schemes.solarIrrigation') },
    { id: 'Kisan Loans', label: t('schemes.credit') }
  ];

  const filteredSchemes = governmentSchemesData.filter((item) => {
    if (category === 'All') return true;
    return item.category === category;
  });

  const checkEligibility = (e) => {
    e.preventDefault();
    const eligibleList = [];
    if (landOwned === 'yes' && aadhaarLinked === 'yes') {
      eligibleList.push("PM-KISAN Samman Nidhi (₹6,000/yr)");
      eligibleList.push("PM Fasal Bima Yojana (Crop Insurance)");
      eligibleList.push("Soil Health Card Scheme");
      eligibleList.push("PM-KUSUM Solar Pump (Up to 90% Subsidy)");
    }
    if (hasKcc === 'no') {
      eligibleList.push("Kisan Credit Card (4% Subsidized Loan up to ₹3 Lakh)");
    }
    setEligibilityResult(eligibleList);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-purple-500/30 backdrop-blur border border-purple-400/30 px-3 py-1 rounded-full text-xs font-semibold text-purple-200 mb-4">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Ministry of Agriculture & Farmers Welfare Schemes</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t('schemes.title')}
          </h1>
          <p className="text-purple-100 text-sm sm:text-base leading-relaxed mb-6">
            {t('schemes.subtitle')}
          </p>

          <button
            onClick={() => setEligibilityModalOpen(true)}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg transition hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('schemes.quickCheck')}</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              category === c.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group hover:border-indigo-300"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                  {scheme.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {scheme.category}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-700 transition">
                {lang === 'hi' ? scheme.nameHi : scheme.nameEn}
              </h3>

              {/* Benefit Box */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 mb-4 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">
                  🎁 {t('schemes.benefits')}:
                </span>
                <p className="text-emerald-950 leading-relaxed font-medium">
                  {lang === 'hi' ? scheme.benefitHi : scheme.benefitEn}
                </p>
              </div>

              {/* Eligibility */}
              <div className="mb-4 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">
                  👤 {t('schemes.eligibility')}:
                </span>
                <p className="leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {lang === 'hi' ? scheme.eligibilityHi : scheme.eligibilityEn}
                </p>
              </div>

              {/* Documents Required */}
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  📑 {t('schemes.documents')}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {scheme.documents.map((doc, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-slate-200"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-sm"
              >
                <span>{t('schemes.applyNow')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Eligibility Modal */}
      {eligibilityModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Instant Scheme Eligibility Matcher
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Answer 3 simple questions to find which government subsidies you qualify for:
            </p>

            <form onSubmit={checkEligibility} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  1. Do you or your family own agricultural cultivable land?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="land"
                      value="yes"
                      checked={landOwned === 'yes'}
                      onChange={() => setLandOwned('yes')}
                      className="accent-indigo-600"
                    />
                    <span>Yes (Own Land)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="land"
                      value="no"
                      checked={landOwned === 'no'}
                      onChange={() => setLandOwned('no')}
                      className="accent-indigo-600"
                    />
                    <span>No / Tenant Farmer</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  2. Is your bank account linked to your Aadhaar Card?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="aadhaar"
                      value="yes"
                      checked={aadhaarLinked === 'yes'}
                      onChange={() => setAadhaarLinked('yes')}
                      className="accent-indigo-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="aadhaar"
                      value="no"
                      checked={aadhaarLinked === 'no'}
                      onChange={() => setAadhaarLinked('no')}
                      className="accent-indigo-600"
                    />
                    <span>Not Yet</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  3. Do you currently hold an active Kisan Credit Card (KCC)?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="kcc"
                      value="yes"
                      checked={hasKcc === 'yes'}
                      onChange={() => setHasKcc('yes')}
                      className="accent-indigo-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="kcc"
                      value="no"
                      checked={hasKcc === 'no'}
                      onChange={() => setHasKcc('no')}
                      className="accent-indigo-600"
                    />
                    <span>No (Want to Apply)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition"
              >
                Find My Eligible Schemes
              </button>
            </form>

            {eligibilityResult && (
              <div className="mt-5 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-xs font-bold text-emerald-900 block mb-2">
                  🎉 You are eligible for the following programs:
                </span>
                <ul className="space-y-1 text-xs text-emerald-950">
                  {eligibilityResult.map((sch, i) => (
                    <li key={i} className="flex items-center gap-1.5 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{sch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => {
                setEligibilityModalOpen(false);
                setEligibilityResult(null);
              }}
              className="w-full mt-3 text-slate-500 hover:text-slate-800 text-xs font-bold py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

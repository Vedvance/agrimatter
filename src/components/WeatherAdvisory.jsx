import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Compass, 
  Volume2,
  Calendar
} from 'lucide-react';

export const WeatherAdvisory = () => {
  const { t, lang, speakText } = useLanguage();

  const forecast = [
    { day: "Today", temp: "28°C", condition: "Partly Cloudy", rainProb: "15%", icon: CloudSun },
    { day: "Tomorrow", temp: "26°C", condition: "Light Rain Expected", rainProb: "75%", icon: CloudRain },
    { day: "Day 3", temp: "24°C", condition: "Heavy Showers", rainProb: "85%", icon: CloudRain },
    { day: "Day 4", temp: "27°C", condition: "Clear Sunshine", rainProb: "10%", icon: Sun },
    { day: "Day 5", temp: "29°C", condition: "Sunny & Dry", rainProb: "5%", icon: Sun },
    { day: "Day 6", temp: "30°C", condition: "Warm & Breezy", rainProb: "10%", icon: Wind },
    { day: "Day 7", temp: "29°C", condition: "Clear Sky", rainProb: "15%", icon: Sun }
  ];

  const advisories = [
    {
      id: "adv-1",
      type: "warning",
      titleEn: "Urgent Fungicide Spray Advisory",
      titleHi: "कीटनाशक एवं फफूंदनाशी छिड़काव चेतावनी",
      descEn: "Heavy rainfall (85% probability) forecasted within 48 to 72 hours. Do NOT apply foliar urea, soluble fertilizers, or expensive insecticides today as they will wash off. Wait until Day 4 when clear sunshine returns.",
      descHi: "अगले 48 से 72 घंटों में तेज बारिश (85% संभावना) का अनुमान है। आज यूरिया या फफूंदनाशी का छिड़काव न करें, यह बहकर व्यर्थ हो जाएगा। चौथे दिन मौसम साफ होने तक प्रतीक्षा करें।"
    },
    {
      id: "adv-2",
      type: "info",
      titleEn: "Irrigation Scheduling for Rabi Wheat & Mustard",
      titleHi: "गेहूँ और सरसों की सिंचाई प्रबंधन सलाह",
      descEn: "Soil moisture retention is currently at 68%. In light of upcoming rain on Days 2 & 3, suspend scheduled tubewell irrigation immediately to prevent waterlogging and root rot in low-lying plots.",
      descHi: "मिट्टी में नमी 68% है। आगामी 2 दिनों में वर्षा के पूर्वानुमान को देखते हुए नलकूप से सिंचाई तुरंत रोक दें, जिससे जलभराव और जड़ों के गलने से बचाव हो सके।"
    },
    {
      id: "adv-3",
      type: "success",
      titleEn: "Optimal Harvesting & Storage Window",
      titleHi: "कटाई एवं सुरक्षित भंडारण खिड़की",
      descEn: "Farmers with harvested paddy or pearl millet in open threshing yards must cover produce with tarpaulin sheets before tomorrow evening to avoid moisture absorption and grain discoloration.",
      descHi: "जिन किसानों की धान या बाजरा खलिहान में खुली पड़ी है, वे कल शाम से पहले तिरपाल से ढँक दें ताकि अनाज में सीलन न आए।"
    }
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-sky-500/30 backdrop-blur border border-sky-400/30 px-3 py-1 rounded-full text-xs font-semibold text-sky-100 mb-4">
            <CloudSun className="w-3.5 h-3.5 text-amber-300" />
            <span>IMD Radar & Hyperlocal Agro-Meteorological Advisory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t('weather.title')}
          </h1>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            {t('weather.subtitle')}
          </p>
        </div>
      </div>

      {/* Current Weather Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
              <Sun className="w-10 h-10 animate-spin" style={{ animationDuration: '25s' }} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Current Location (GPS Synced)
              </span>
              <div className="text-3xl font-black text-slate-900">
                28°C <span className="text-sm font-medium text-slate-500">Partly Cloudy</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-xs">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-500" />
              <div>
                <span className="text-slate-400 block">{t('weather.humidity')}</span>
                <span className="font-bold text-slate-800 text-sm">62%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-teal-500" />
              <div>
                <span className="text-slate-400 block">{t('weather.windSpeed')}</span>
                <span className="font-bold text-slate-800 text-sm">11 km/h</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-blue-500" />
              <div>
                <span className="text-slate-400 block">{t('weather.rainfallProb')}</span>
                <span className="font-bold text-slate-800 text-sm">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast Strip */}
        <div className="pt-6">
          <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-4">
            {t('weather.forecast7Days')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {forecast.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between transition ${
                    i === 0 
                      ? 'bg-emerald-50 border-emerald-300' 
                      : i === 1 || i === 2 
                      ? 'bg-sky-50 border-sky-200' 
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-700">{f.day}</span>
                  <Icon className={`w-7 h-7 my-2 ${
                    f.rainProb > '50%' ? 'text-blue-500' : 'text-amber-500'
                  }`} />
                  <span className="text-sm font-black text-slate-900">{f.temp}</span>
                  <span className="text-[11px] font-bold text-sky-700 mt-1">
                    {f.rainProb} rain
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actionable Agronomic Advisories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            {t('weather.agriAdvisoryTitle')}
          </h2>
          <button
            onClick={() => speakText(
              lang === 'hi'
                ? `मौसम सलाह: अगले 48 घंटों में भारी बारिश की संभावना है। यूरिया और कीटनाशक का छिड़काव रोक दें।`
                : `Weather advisory: Heavy rainfall is predicted in next 48 hours. Postpone chemical sprays and stop irrigation.`
            )}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'सलाह सुनें' : 'Read Advisory Aloud'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advisories.map((adv) => (
            <div
              key={adv.id}
              className={`rounded-3xl p-5 border flex flex-col justify-between ${
                adv.type === 'warning'
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : adv.type === 'info'
                  ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {adv.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                  {adv.type === 'info' && <Clock className="w-5 h-5 text-blue-600" />}
                  {adv.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                  <h3 className="font-extrabold text-sm">
                    {lang === 'hi' ? adv.titleHi : adv.titleEn}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  {lang === 'hi' ? adv.descHi : adv.descEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-bold">
                <span>Priority: High</span>
                <span>Active 48 hrs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

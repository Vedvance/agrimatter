'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { CropDoctorEntry } from '@/components/CropDoctorEntry';
import { 
  Sprout, 
  CloudSun, 
  Leaf, 
  FlaskConical, 
  Bot, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown,
  Award
} from 'lucide-react';

export default function LandingPage() {
  const { t, language } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const features = [
    {
      icon: CloudSun,
      title: t.features.weatherTitle,
      desc: t.features.weatherDesc,
      href: "/weather",
      badge: "Open-Meteo API"
    },
    {
      icon: Leaf,
      title: t.features.cropTitle,
      desc: t.features.cropDesc,
      href: "/crop-advisor",
      badge: "Kharif / Rabi / Zaid"
    },
    {
      icon: FlaskConical,
      title: t.features.soilTitle,
      desc: t.features.soilDesc,
      href: "/soil-health",
      badge: "pH & NPK Rules"
    },
    {
      icon: Sprout,
      title: t.features.fertilizerTitle,
      desc: t.features.fertilizerDesc,
      href: "/fertilizer-guide",
      badge: "Stage-Wise"
    },
    {
      icon: Bot,
      title: t.features.aiTitle,
      desc: t.features.aiDesc,
      href: "/ai-assistant",
      badge: "Voice & Text"
    }
  ];

  const faqs = [
    {
      q: language === 'hi' ? 'एग्रीमैटर किसानों की कैसे मदद करता है?' : 'How does Agrimatter help farmers?',
      a: language === 'hi'
        ? 'एग्रीमैटर आपके स्थान, मौसम, मिट्टी के प्रकार और सिंचाई के आधार पर सरल खेती की सलाह प्रदान करता है।'
        : 'Agrimatter provides simple farming recommendations tailored to your village location, soil type, irrigation, and crop growth stage.'
    },
    {
      q: language === 'hi' ? 'क्या यह ऐप हिंदी में उपलब्ध है?' : 'Is Agrimatter available in Hindi?',
      a: language === 'hi'
        ? 'हाँ! ऐप के ऊपर दाईं ओर दिए गए स्विच से आप कभी भी हिंदी और अंग्रेजी में बदल सकते हैं।'
        : 'Yes! Toggle instantly between English and Hindi anytime using the header language switcher.'
    },
    {
      q: language === 'hi' ? 'क्या खाद की सलाह सुरक्षित है?' : 'Is fertilizer advice safe to follow?',
      a: language === 'hi'
        ? 'हम हमेशा नियम-आधारित सामान्य मार्गदर्शन प्रदान करते हैं और मिट्टी परीक्षण रिपोर्ट या स्थानीय कृषि अधिकारी से पुष्टि की सलाह देते हैं।'
        : 'We follow strict agronomical guidelines and always display mandatory disclaimers recommending official soil test confirmation.'
    }
  ];

  return (
    <div className="space-y-16 py-4">
      <CropDoctorEntry />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-agri-green-900 via-agri-green-800 to-agri-brown-900 text-white p-6 sm:p-12 shadow-xl border border-emerald-700">
        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-emerald-800/80 px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-xs font-bold text-emerald-200">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Kisan Support System for Indian Farmers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
            <p className="text-sm font-bold text-amber-300">
              "{t.hero.farmerGreeting} - {language === 'hi' ? 'आज का अलर्ट: कल बारिश की संभावना है। आज छिड़काव (spraying) से बचें।' : 'Today Alert: Rain expected tomorrow. Avoid spraying today.'}"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-extrabold shadow-lg">
                {t.hero.getStarted}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                {t.nav.onboarding}
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Mandatory Safety Alert Box */}
      <Alert type="warning" title={t.common.disclaimerTitle}>
        {t.common.fertilizerDisclaimer}
      </Alert>

      {/* Feature Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-agri-green-900 tracking-tight">
            {language === 'hi' ? 'किसानों के लिए आवश्यक सुविधाएं' : 'Key Farming Features'}
          </h2>
          <p className="text-sm font-semibold text-gray-600">
            {language === 'hi' ? 'आपकी फसल, मौसम और मिट्टी के अनुसार त्वरित मार्गदर्शन' : 'Instant guidance tailored to your crop, weather, and soil conditions'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="hover:border-agri-green-600 transition group relative flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-agri-green-100 flex items-center justify-center text-agri-green-800 font-bold group-hover:scale-110 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                      {f.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-agri-green-900 mb-1">{f.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <Link href={f.href} className="inline-flex items-center text-xs font-extrabold text-agri-green-700 hover:text-agri-green-900">
                    <span>{t.common.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-agri-green-900">
            {t.howItWorks.title}
          </h2>
          <p className="text-xs text-gray-500 font-semibold">
            {language === 'hi' ? '4 आसान चरणों में बेहतर पैदावार हासिल करें' : 'Achieve better yield in 4 simple steps'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: t.howItWorks.step1, desc: t.howItWorks.step1Desc },
            { step: t.howItWorks.step2, desc: t.howItWorks.step2Desc },
            { step: t.howItWorks.step3, desc: t.howItWorks.step3Desc },
            { step: t.howItWorks.step4, desc: t.howItWorks.step4Desc }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <span className="text-xs font-black text-agri-green-700 block uppercase">Step {idx + 1}</span>
              <h4 className="text-base font-extrabold text-agri-green-900">{item.step}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 space-y-6">
        <h2 className="text-2xl font-black text-agri-green-900 flex items-center space-x-2">
          <HelpCircle className="w-6 h-6 text-agri-green-700" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-emerald-50/50 flex justify-between items-center text-sm font-bold text-agri-green-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

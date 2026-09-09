'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { CropDoctorEntry } from '@/components/CropDoctorEntry';
import { ProtectedLink } from '@/components/ProtectedLink';
import { FAQSection } from '@/components/FAQSection';
import { 
  Sprout, 
  CloudSun, 
  Leaf, 
  FlaskConical, 
  Bot, 
  ArrowRight, 
  Award
} from 'lucide-react';

export default function LandingPage() {
  const { t, language } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const animationContext = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const uploadPanel = page.querySelector('[data-gsap="upload"]');
      const hero = page.querySelector('[data-gsap="hero"]');
      const alert = page.querySelector('[data-gsap="alert"]');
      const heroItems = gsap.utils.toArray<HTMLElement>('[data-gsap="hero-item"]');
      const heroSweep = page.querySelector('[data-gsap="hero-sweep"]');
      const cards = gsap.utils.toArray<HTMLElement>('[data-gsap="feature-card"]');
      const icons = gsap.utils.toArray<HTMLElement>('[data-gsap="feature-icon"]');

      if (reduceMotion) {
        gsap.set([uploadPanel, hero, alert, ...heroItems, heroSweep, ...cards, ...icons], { clearProps: 'all' });
        return;
      }

      const introTimeline = gsap.timeline();
      introTimeline
        .fromTo(uploadPanel, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo(hero, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
        .fromTo(heroItems, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' }, '-=0.35')
        .fromTo(alert, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.12')
        .fromTo(cards, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' }, '-=0.18');

      gsap.to(heroSweep, {
        xPercent: 180,
        duration: 3.8,
        repeat: -1,
        repeatDelay: 2.8,
        ease: 'power1.inOut',
      });

      const handleEnter = (event: Event) => {
        gsap.to(event.currentTarget, { y: -6, duration: 0.22, ease: 'power2.out' });
      };
      const handleLeave = (event: Event) => {
        gsap.to(event.currentTarget, { y: 0, duration: 0.28, ease: 'power2.out' });
      };
      const handleIconEnter = (event: Event) => {
        gsap.to(event.currentTarget, { rotate: 8, scale: 1.12, duration: 0.25, ease: 'back.out(2)' });
      };
      const handleIconLeave = (event: Event) => {
        gsap.to(event.currentTarget, { rotate: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
      };

      cards.forEach((card) => {
        card.addEventListener('mouseenter', handleEnter);
        card.addEventListener('mouseleave', handleLeave);
      });
      icons.forEach((icon) => {
        icon.addEventListener('mouseenter', handleIconEnter);
        icon.addEventListener('mouseleave', handleIconLeave);
      });

      return () => {
        introTimeline.kill();
        gsap.killTweensOf(heroSweep);
        cards.forEach((card) => {
          card.removeEventListener('mouseenter', handleEnter);
          card.removeEventListener('mouseleave', handleLeave);
        });
        icons.forEach((icon) => {
          icon.removeEventListener('mouseenter', handleIconEnter);
          icon.removeEventListener('mouseleave', handleIconLeave);
        });
      };
    }, page);

    return () => animationContext.revert();
  }, []);

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

  return (
    <div ref={pageRef} className="space-y-16 py-4">
      <div data-gsap="upload">
        <CropDoctorEntry />
      </div>
      
      {/* Hero Section */}
      <section data-gsap="hero" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-agri-green-900 via-agri-green-800 to-agri-brown-900 text-white p-6 sm:p-12 shadow-xl border border-emerald-700">
        <div data-gsap="hero-sweep" className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/4 -skew-x-12 bg-white/10 blur-2xl" />
        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div data-gsap="hero-item" className="inline-flex items-center space-x-2 bg-emerald-800/80 px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-xs font-bold text-emerald-200">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Kisan Support System for Indian Farmers</span>
          </div>

          <h1 data-gsap="hero-item" className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t.hero.title}
          </h1>

          <p data-gsap="hero-item" className="text-base sm:text-xl text-emerald-100/90 font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div data-gsap="hero-item" className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
            <p className="text-sm font-bold text-amber-300">
              "{t.hero.farmerGreeting} - {language === 'hi' ? 'आज का अलर्ट: कल बारिश की संभावना है। आज छिड़काव (spraying) से बचें।' : 'Today Alert: Rain expected tomorrow. Avoid spraying today.'}"
            </p>
          </div>

          <div data-gsap="hero-item" className="flex flex-col sm:flex-row gap-3 pt-2">
            <ProtectedLink href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-extrabold shadow-lg">
                {t.hero.getStarted}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </ProtectedLink>
            <Link href="/onboarding">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                {t.nav.onboarding}
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Mandatory Safety Alert Box */}
      <div data-gsap="alert">
        <Alert type="warning" title={t.common.disclaimerTitle}>
          {t.common.fertilizerDisclaimer}
        </Alert>
      </div>

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
              <div key={i} data-gsap="feature-card">
                <Card className="hover:border-agri-green-600 transition group relative flex flex-col justify-between">
                  <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div data-gsap="feature-icon" className="w-12 h-12 rounded-2xl bg-agri-green-100 flex items-center justify-center text-agri-green-800 font-bold">
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
                    <ProtectedLink href={f.href} className="inline-flex items-center text-xs font-extrabold text-agri-green-700 hover:text-agri-green-900">
                      <span>{t.common.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </ProtectedLink>
                  </div>
                </Card>
              </div>
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

      <FAQSection initialLanguage={language} />

    </div>
  );
}

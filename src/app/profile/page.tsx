'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { User, Phone, MapPin, Droplets, Layers, LogOut, CheckCircle2, Languages } from 'lucide-react';

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const { user, farm, activeCrop, logout, updateProfile, updateFarm } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || 'Ramesh Kumar');
  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [village, setVillage] = useState(user?.village || 'Samrala');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ full_name: fullName, phone, village });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-2">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-green-900">
            {t.nav.profile} & Settings
          </h1>
          <p className="text-xs font-semibold text-gray-600">
            {language === 'hi' ? 'अपनी व्यक्तिगत और खेत की जानकारी प्रबंधित करें' : 'Manage your farmer identity and land parameters'}
          </p>
        </div>

        <Button variant="danger" size="sm" onClick={logout}>
          <LogOut className="w-4 h-4 mr-1" />
          <span>{t.nav.logout}</span>
        </Button>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl border border-emerald-300 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Profile details saved successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <Card className="space-y-4 border-emerald-200">
        <h3 className="text-base font-extrabold text-agri-green-900 flex items-center space-x-2">
          <User className="w-5 h-5 text-agri-green-700" />
          <span>Personal Information</span>
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-extrabold text-agri-green-900 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-agri-green-900 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 font-bold text-sm"
              />
            </div>

          </div>

          <div>
            <label className="block text-xs font-extrabold text-agri-green-900 mb-1">Village / Town</label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 font-bold text-sm"
            />
          </div>

          <Button type="submit" size="md">
            <span>{t.common.save}</span>
          </Button>
        </form>
      </Card>

      {/* Farm Overview Card */}
      <Card className="space-y-3 border-emerald-200 bg-emerald-50/30">
        <h3 className="text-base font-extrabold text-agri-green-900 flex items-center space-x-2">
          <Droplets className="w-5 h-5 text-agri-green-700" />
          <span>Registered Farm Parameters</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-emerald-100">
            <span className="text-gray-500 block text-[10px] font-semibold">{t.common.landSize}</span>
            <span className="text-sm font-black text-agri-green-900">{farm?.land_size || 2.5} Acres</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-100">
            <span className="text-gray-500 block text-[10px] font-semibold">{t.common.irrigation}</span>
            <span className="text-sm font-black text-agri-green-900">{farm?.irrigation_type || 'Borewell'}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-100">
            <span className="text-gray-500 block text-[10px] font-semibold">{t.common.soilType}</span>
            <span className="text-sm font-black text-agri-green-900">{farm?.soil_type || 'Loam'}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-100">
            <span className="text-gray-500 block text-[10px] font-semibold">{t.common.currentCrop}</span>
            <span className="text-sm font-black text-agri-green-900">{activeCrop?.crop_name || 'Wheat'}</span>
          </div>
        </div>
      </Card>

      {/* Language Preference Card */}
      <Card className="flex items-center justify-between border-emerald-200">
        <div className="flex items-center space-x-3">
          <Languages className="w-6 h-6 text-agri-green-700" />
          <div>
            <h4 className="text-sm font-extrabold text-agri-green-900">App Language Preference</h4>
            <p className="text-xs text-gray-500">Currently set to {language === 'hi' ? 'हिंदी (Hindi)' : 'English'}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant={language === 'hi' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setLanguage('hi')}
          >
            हिंदी
          </Button>
          <Button
            variant={language === 'en' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setLanguage('en')}
          >
            English
          </Button>
        </div>
      </Card>

    </div>
  );
}

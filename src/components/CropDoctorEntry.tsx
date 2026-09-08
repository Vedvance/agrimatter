'use client';

import React from 'react';
import { LanguageProvider as LegacyLanguageProvider } from '@/context/LanguageContext.jsx';
import { CropDoctor } from './CropDoctor';

export function CropDoctorEntry() {
  return (
    <LegacyLanguageProvider>
      <CropDoctor />
    </LegacyLanguageProvider>
  );
}

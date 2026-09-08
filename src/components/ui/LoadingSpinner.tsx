'use client';

import React from 'react';

export const LoadingSpinner: React.FC<{ label?: string }> = ({ label }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-10 h-10 border-4 border-agri-green-200 border-t-agri-green-700 rounded-full animate-spin"></div>
      {label && <p className="text-sm font-semibold text-agri-green-900">{label}</p>}
    </div>
  );
};

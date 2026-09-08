'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'amber' | 'blue' | 'brown' | 'red';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'green', className = '' }) => {
  const styles = {
    green: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    amber: 'bg-amber-100 text-amber-900 border-amber-300',
    blue: 'bg-sky-100 text-sky-900 border-sky-300',
    brown: 'bg-amber-50 text-amber-950 border-amber-200',
    red: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

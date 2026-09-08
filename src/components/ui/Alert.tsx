'use client';

import React from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

interface AlertProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'warning', title, children, className = '' }) => {
  const config = {
    info: {
      bg: 'bg-sky-50 border-sky-300 text-sky-900',
      icon: <Info className="h-5 w-5 text-sky-600 flex-shrink-0" />
    },
    warning: {
      bg: 'bg-amber-50 border-amber-300 text-amber-900',
      icon: <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
      icon: <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
    },
    error: {
      bg: 'bg-red-50 border-red-300 text-red-900',
      icon: <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
    }
  };

  return (
    <div className={`flex items-start space-x-3 p-4 rounded-xl border ${config[type].bg} ${className}`}>
      {config[type].icon}
      <div className="flex-1 text-sm">
        {title && <h4 className="font-bold text-base mb-1">{title}</h4>}
        <div>{children}</div>
      </div>
    </div>
  );
};

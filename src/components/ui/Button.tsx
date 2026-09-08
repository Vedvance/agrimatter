'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'amber' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 shadow-sm";

  const variantStyles = {
    primary: "bg-agri-green-700 hover:bg-agri-green-800 text-white focus:ring-agri-green-600",
    secondary: "bg-agri-brown-700 hover:bg-agri-brown-800 text-white focus:ring-agri-brown-600",
    outline: "border-2 border-agri-green-700 text-agri-green-800 hover:bg-agri-green-50 focus:ring-agri-green-600 bg-white",
    amber: "bg-agri-yellow-600 hover:bg-agri-yellow-700 text-black focus:ring-agri-yellow-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-semibold",
    md: "px-4 py-2.5 text-sm font-bold min-h-[44px]", // farmer friendly touch target
    lg: "px-6 py-3.5 text-base font-bold min-h-[52px]" // extra large mobile button
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

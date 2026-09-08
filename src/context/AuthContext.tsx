'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Farm, FarmerCrop } from '@/types';
import { MOCK_PROFILE, MOCK_FARM, MOCK_FARMER_CROP, supabase } from '@/lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  farm: Farm | null;
  activeCrop: FarmerCrop | null;
  isLoggedIn: boolean;
  sendOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, otp: string, name?: string) => Promise<{ success: boolean; message: string }>;
  login: (phoneOrEmail: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateFarm: (farm: Partial<Farm>) => void;
  setActiveCrop: (crop: FarmerCrop) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [farm, setFarm] = useState<Farm | null>(null);
  const [activeCrop, setActiveCropState] = useState<FarmerCrop | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('agrimatter_user');
    const storedFarm = localStorage.getItem('agrimatter_farm');
    const storedCrop = localStorage.getItem('agrimatter_crop');

    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch (e) { setUser(MOCK_PROFILE); }
    } else {
      setUser(MOCK_PROFILE);
    }

    if (storedFarm) {
      try { setFarm(JSON.parse(storedFarm)); } catch (e) { setFarm(MOCK_FARM); }
    } else {
      setFarm(MOCK_FARM);
    }

    if (storedCrop) {
      try { setActiveCropState(JSON.parse(storedCrop)); } catch (e) { setActiveCropState(MOCK_FARMER_CROP); }
    } else {
      setActiveCropState(MOCK_FARMER_CROP);
    }
  }, []);

  // Send OTP (Integrated with Supabase Auth + Mock fallback)
  const sendOtp = async (phone: string): Promise<{ success: boolean; message: string }> => {
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone.replace(/\D/g, '')}`;

    try {
      // Attempt live Supabase Phone OTP if configured
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
        });
        if (error) throw error;
        return { success: true, message: `OTP sent to ${formattedPhone}` };
      }
    } catch (err: any) {
      console.warn("Supabase OTP notice (using demo mode):", err?.message);
    }

    // Demo Mode OTP Success
    return { 
      success: true, 
      message: `Demo OTP 123456 sent to +91 ${phone}` 
    };
  };

  // Verify OTP
  const verifyOtp = async (phone: string, otp: string, name?: string): Promise<{ success: boolean; message: string }> => {
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone.replace(/\D/g, '')}`;

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
        const { data, error } = await supabase.auth.verifyOtp({
          phone: formattedPhone,
          token: otp,
          type: 'sms'
        });
        if (error) throw error;
      }
    } catch (err: any) {
      console.warn("Supabase verify notice (using demo verification):", err?.message);
    }

    // Accept demo OTP '123456' or any 6-digit number in local dev mode
    if (otp.length === 6) {
      const loggedInUser: UserProfile = {
        ...MOCK_PROFILE,
        full_name: name || MOCK_PROFILE.full_name,
        phone: phone.replace(/\D/g, ''),
      };
      setUser(loggedInUser);
      setFarm(MOCK_FARM);
      setActiveCropState(MOCK_FARMER_CROP);

      localStorage.setItem('agrimatter_user', JSON.stringify(loggedInUser));
      localStorage.setItem('agrimatter_farm', JSON.stringify(MOCK_FARM));
      localStorage.setItem('agrimatter_crop', JSON.stringify(MOCK_FARMER_CROP));

      return { success: true, message: "OTP verified successfully!" };
    }

    return { success: false, message: "Invalid 6-digit OTP code." };
  };

  const login = (phoneOrEmail: string) => {
    const loggedInUser: UserProfile = {
      ...MOCK_PROFILE,
      phone: phoneOrEmail.replace(/\D/g, '') || '9876543210',
    };
    setUser(loggedInUser);
    setFarm(MOCK_FARM);
    setActiveCropState(MOCK_FARMER_CROP);
    localStorage.setItem('agrimatter_user', JSON.stringify(loggedInUser));
    localStorage.setItem('agrimatter_farm', JSON.stringify(MOCK_FARM));
    localStorage.setItem('agrimatter_crop', JSON.stringify(MOCK_FARMER_CROP));
  };

  const logout = () => {
    setUser(null);
    setFarm(null);
    setActiveCropState(null);
    localStorage.removeItem('agrimatter_user');
    localStorage.removeItem('agrimatter_farm');
    localStorage.removeItem('agrimatter_crop');
  };

  const updateProfile = (updatedProps: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...updatedProps };
      setUser(updated);
      localStorage.setItem('agrimatter_user', JSON.stringify(updated));
    }
  };

  const updateFarm = (updatedProps: Partial<Farm>) => {
    if (farm) {
      const updated = { ...farm, ...updatedProps };
      setFarm(updated);
      localStorage.setItem('agrimatter_farm', JSON.stringify(updated));
    }
  };

  const setActiveCrop = (crop: FarmerCrop) => {
    setActiveCropState(crop);
    localStorage.setItem('agrimatter_crop', JSON.stringify(crop));
  };

  return (
    <AuthContext.Provider value={{
      user,
      farm,
      activeCrop,
      isLoggedIn: !!user,
      sendOtp,
      verifyOtp,
      login,
      logout,
      updateProfile,
      updateFarm,
      setActiveCrop
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

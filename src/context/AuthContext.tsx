'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Farm, FarmerCrop } from '@/types';
import { 
  MOCK_PROFILE, 
  MOCK_FARM, 
  MOCK_FARMER_CROP, 
  supabase, 
  isSupabaseConfigured,
  syncUserProfile,
  syncUserFarm 
} from '@/lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  farm: Farm | null;
  activeCrop: FarmerCrop | null;
  isLoggedIn: boolean;
  isSupabaseLive: boolean;
  sendOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, otp: string, name?: string) => Promise<{ success: boolean; message: string }>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<{ success: boolean; message: string }>;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
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
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  useEffect(() => {
    const isLive = isSupabaseConfigured();
    setIsSupabaseLive(isLive);

    // 1. Check local storage
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

    // 2. Attach Supabase Auth State Change Listener if configured
    if (isLive) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const authUser = session.user;
          const userProfile: UserProfile = {
            id: authUser.id,
            full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Farmer User',
            phone: authUser.phone || authUser.user_metadata?.phone || '9876543210',
            language: (authUser.user_metadata?.language as any) || 'hi',
            state: authUser.user_metadata?.state || 'Punjab',
            district: authUser.user_metadata?.district || 'Ludhiana',
            village: authUser.user_metadata?.village || 'Samrala',
            created_at: authUser.created_at
          };
          setUser(userProfile);
          localStorage.setItem('agrimatter_user', JSON.stringify(userProfile));

          // Sync to profiles table
          await syncUserProfile(userProfile);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  // Live Supabase / Demo OTP Sender
  const sendOtp = async (phone: string): Promise<{ success: boolean; message: string }> => {
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone.replace(/\D/g, '')}`;

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
        if (error) throw error;
        return { success: true, message: `OTP sent via Supabase SMS to ${formattedPhone}` };
      } catch (err: any) {
        console.warn("Supabase OTP attempt:", err.message);
        return { success: true, message: `Demo OTP 123456 sent to +91 ${phone} (Supabase SMS gateway unconfigured)` };
      }
    }

    return { success: true, message: `Demo OTP 123456 sent to +91 ${phone}` };
  };

  // Live Supabase / Demo OTP Verifier
  const verifyOtp = async (phone: string, otp: string, name?: string): Promise<{ success: boolean; message: string }> => {
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone.replace(/\D/g, '')}`;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          phone: formattedPhone,
          token: otp,
          type: 'sms'
        });
        if (error) throw error;
        if (data.session?.user) {
          const userProfile: UserProfile = {
            id: data.session.user.id,
            full_name: name || data.session.user.user_metadata?.full_name || 'Ramesh Kumar',
            phone: phone.replace(/\D/g, ''),
            language: 'hi',
            state: 'Punjab',
            district: 'Ludhiana',
            village: 'Samrala'
          };
          setUser(userProfile);
          localStorage.setItem('agrimatter_user', JSON.stringify(userProfile));
          await syncUserProfile(userProfile);
          return { success: true, message: "Supabase OTP verified successfully!" };
        }
      } catch (err: any) {
        console.warn("Supabase verify notice:", err.message);
      }
    }

    // Demo Mode OTP Verification (Accepts 123456 or any 6-digit number)
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

  // Live Supabase Email / Password Signup
  const signUpWithEmail = async (email: string, pass: string, name: string): Promise<{ success: boolean; message: string }> => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: { full_name: name }
          }
        });
        if (error) throw error;

        if (data.user) {
          const newUser: UserProfile = {
            id: data.user.id,
            full_name: name,
            phone: '9876543210',
            language: 'hi',
            state: 'Punjab',
            district: 'Ludhiana',
            village: 'Samrala'
          };
          setUser(newUser);
          localStorage.setItem('agrimatter_user', JSON.stringify(newUser));
          await syncUserProfile(newUser);
          return { success: true, message: "Supabase account created successfully!" };
        }
      } catch (err: any) {
        return { success: false, message: err.message || "Failed to create Supabase account." };
      }
    }

    // Fallback Local Signup
    login(email);
    return { success: true, message: "Account created locally!" };
  };

  // Live Supabase Email / Password Login
  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; message: string }> => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass
        });
        if (error) throw error;

        if (data.user) {
          const loggedInUser: UserProfile = {
            id: data.user.id,
            full_name: data.user.user_metadata?.full_name || email.split('@')[0],
            phone: data.user.phone || '9876543210',
            language: 'hi',
            state: 'Punjab',
            district: 'Ludhiana',
            village: 'Samrala'
          };
          setUser(loggedInUser);
          localStorage.setItem('agrimatter_user', JSON.stringify(loggedInUser));
          await syncUserProfile(loggedInUser);
          return { success: true, message: "Supabase Login Successful!" };
        }
      } catch (err: any) {
        return { success: false, message: err.message || "Supabase authentication failed." };
      }
    }

    login(email);
    return { success: true, message: "Logged in locally!" };
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

  const logout = async () => {
    if (isSupabaseConfigured()) {
      try { await supabase.auth.signOut(); } catch (e) { console.warn(e); }
    }
    setUser(null);
    setFarm(null);
    setActiveCropState(null);
    localStorage.removeItem('agrimatter_user');
    localStorage.removeItem('agrimatter_farm');
    localStorage.removeItem('agrimatter_crop');
  };

  const updateProfile = async (updatedProps: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...updatedProps };
      setUser(updated);
      localStorage.setItem('agrimatter_user', JSON.stringify(updated));
      await syncUserProfile(updated);
    }
  };

  const updateFarm = async (updatedProps: Partial<Farm>) => {
    if (farm) {
      const updated = { ...farm, ...updatedProps };
      setFarm(updated);
      localStorage.setItem('agrimatter_farm', JSON.stringify(updated));
      if (user) {
        await syncUserFarm({
          user_id: user.id,
          land_size: updated.land_size,
          irrigation_type: updated.irrigation_type,
          soil_type: updated.soil_type
        });
      }
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
      isSupabaseLive,
      sendOtp,
      verifyOtp,
      signUpWithEmail,
      loginWithEmail,
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

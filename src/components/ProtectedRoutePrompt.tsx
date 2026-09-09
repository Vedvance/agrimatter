'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export function ProtectedRoutePrompt() {
  const { authReady, isLoggedIn, openAuthModal } = useAuth();

  useEffect(() => {
    if (authReady && !isLoggedIn) {
      // Automatically show the login/signup popup modal on initial website load
      const hasShownModal = sessionStorage.getItem('agrimatter_initial_popup_shown');
      if (!hasShownModal) {
        sessionStorage.setItem('agrimatter_initial_popup_shown', 'true');
        openAuthModal();
      }
    }
  }, [authReady, isLoggedIn, openAuthModal]);

  return null;
}

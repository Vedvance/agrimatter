'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const protectedPaths = ['/dashboard', '/weather', '/crop-advisor', '/soil-health', '/fertilizer-guide', '/ai-assistant', '/profile', '/admin'];

export function ProtectedRoutePrompt() {
  const pathname = usePathname();
  const { authReady, isLoggedIn, openAuthModal } = useAuth();

  useEffect(() => {
    if (authReady && !isLoggedIn && protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
      openAuthModal();
    }
  }, [authReady, isLoggedIn, openAuthModal, pathname]);

  return null;
}

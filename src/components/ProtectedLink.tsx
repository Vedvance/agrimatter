'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface ProtectedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function ProtectedLink({ children, className, onClick, href, ...props }: ProtectedLinkProps) {
  const { isLoggedIn, openAuthModal } = useAuth();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !isLoggedIn) {
      event.preventDefault();
      openAuthModal();
    }
  };

  return <Link {...props} href={href} onClick={handleClick} className={className}>{children}</Link>;
}

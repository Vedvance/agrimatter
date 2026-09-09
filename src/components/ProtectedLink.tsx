'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';

interface ProtectedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function ProtectedLink({ children, className, onClick, href, ...props }: ProtectedLinkProps) {
  return <Link {...props} href={href} onClick={onClick} className={className}>{children}</Link>;
}

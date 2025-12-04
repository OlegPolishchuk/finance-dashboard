'use client';

import React from 'react';
import { clsx } from 'clsx';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Button } from '@/app/components/ui/button';

interface Props {
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}

export const ButtonLogout = ({ children, className, iconClassName }: Props) => {
  return (
    <button
      className={clsx(
        'flex w-fit cursor-pointer items-center justify-center gap-4 border-none font-semibold transition-all outline-none hover:text-destructive',
        className,
      )}
      onClick={() => signOut()}
    >
      <LogOut
        className={clsx('cursor-pointer transition-all hover:text-destructive', iconClassName)}
      />
      {children}
    </button>
  );
};

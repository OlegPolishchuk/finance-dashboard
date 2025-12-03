'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const ButtonLogout = () => {
  return (
    <LogOut
      className={'cursor-pointer transition-all hover:text-destructive'}
      onClick={() => signOut()}
    />
  );
};

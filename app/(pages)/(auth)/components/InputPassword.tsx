'use client';

import React, { ComponentPropsWithoutRef, useState } from 'react';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';

import { Input } from '@/app/components/ui/input';

export const InputPassword = (props: ComponentPropsWithoutRef<'input'>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={'relative'}>
      <Input type={showPassword ? 'text' : 'password'} placeholder='Password' {...props} />

      <div className={'absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer'}>
        {showPassword && <Eye onClick={() => setShowPassword(false)} />}
        {!showPassword && <EyeOff onClick={() => setShowPassword(true)} />}
      </div>
    </div>
  );
};

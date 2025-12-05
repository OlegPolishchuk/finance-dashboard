'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Option } from '@/app/lib/types/types';

interface Props {
  className?: string;
  options: Option[];
}

export const TabsTriggerList = ({ options, className }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <TabsList className={className}>
      {options.map((option) => (
        <TabsTrigger
          key={option.value}
          value={option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

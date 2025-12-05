import React, { ComponentPropsWithRef } from 'react';
import { clsx } from 'clsx';
import { Asterisk as AsteriskIcon } from 'lucide-react';

export const Asterisk = ({ className, ...props }: ComponentPropsWithRef<'svg'>) => {
  return (
    <AsteriskIcon className={clsx('h-[8px] w-[8px] text-destructive', className)} {...props} />
  );
};

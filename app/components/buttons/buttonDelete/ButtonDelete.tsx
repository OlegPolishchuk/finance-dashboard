import React, { ComponentPropsWithRef } from 'react';
import { clsx } from 'clsx';
import { Trash } from 'lucide-react';

export const ButtonDelete = ({ className, ...props }: ComponentPropsWithRef<'button'>) => {
  return (
    <button
      type='button'
      className={clsx(
        'color-white cursor-pointer rounded-sm border-none bg-destructive p-1 transition-all outline-none hover:bg-theme-hover',
        className,
      )}
      {...props}
    >
      <Trash className={'h-[20px] w-[20px] text-background'} />
    </button>
  );
};

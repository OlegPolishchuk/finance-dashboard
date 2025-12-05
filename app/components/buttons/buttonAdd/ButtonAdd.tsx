import React, { ComponentPropsWithRef } from 'react';
import { clsx } from 'clsx';
import { Plus } from 'lucide-react';

export const ButtonAdd = ({ className, ...props }: ComponentPropsWithRef<'button'>) => {
  return (
    <button
      type='button'
      className={clsx(
        'color-white cursor-pointer rounded-sm border-none bg-theme p-1 transition-all outline-none hover:bg-theme-hover',
        className,
      )}
      {...props}
    >
      <Plus className={'text-background'} />
    </button>
  );
};

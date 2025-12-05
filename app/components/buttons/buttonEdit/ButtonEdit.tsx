import React, { ComponentPropsWithRef } from 'react';
import { clsx } from 'clsx';
import { Edit } from 'lucide-react';

export const ButtonEdit = ({ className, ...props }: ComponentPropsWithRef<'button'>) => {
  return (
    <button
      type='button'
      className={clsx(
        'color-white cursor-pointer rounded-sm border-none bg-chart-4 p-1 transition-all outline-none hover:bg-theme-hover',
        className,
      )}
      {...props}
    >
      <Edit className={'h-[20px] w-[20px] text-background'} />
    </button>
  );
};

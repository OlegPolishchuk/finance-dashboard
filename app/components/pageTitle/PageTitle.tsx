import React from 'react';

import { Typography } from '@/app/components/ui/typography';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const PageTitle = ({ children, className }: Props) => {
  return (
    <Typography className={className} tag={'h1'} variant={'headline-3'}>
      {children}
    </Typography>
  );
};

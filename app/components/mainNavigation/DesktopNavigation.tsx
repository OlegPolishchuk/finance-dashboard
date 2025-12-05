import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ButtonLogout } from '@/app/components/buttons/buttonLogout/ButtonLogout';
import { NavigationList } from '@/app/components/mainNavigation/NavigationList';

export const DesktopNavigation = () => {
  return (
    <aside
      className={twMerge(
        'hidden md:block',
        'h-[calc(100vh-57px)] w-[300px] min-w-[300px] bg-background',
        'border-r border-r-sidebar-border',
      )}
    >
      <div className={'fixed top-[56px] bottom-0 flex w-[300px] flex-col py-4'}>
        <NavigationList />

        <ButtonLogout className={'mt-auto mb-10 ml-4'}>Выити</ButtonLogout>
      </div>
    </aside>
  );
};

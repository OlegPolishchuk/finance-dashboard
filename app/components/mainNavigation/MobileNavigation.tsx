'use client';

import React from 'react';
import { clsx } from 'clsx';
import { Menu } from 'lucide-react';

import { ButtonLogout } from '@/app/components/buttonLogout/ButtonLogout';
import { NavigationList } from '@/app/components/mainNavigation/NavigationList';
import { Button } from '@/app/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/ui/drawer';

interface Props {
  className?: string;
}

export const MobileNavigation = ({ className }: Props) => {
  return (
    <Drawer direction={'left'}>
      <DrawerTrigger className={clsx('md:hidden', className)}>
        <Menu />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle hidden>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription hidden>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <NavigationList className={'w-full'} />
        <DrawerFooter>
          <ButtonLogout className={'mb-10'}>Выити</ButtonLogout>

          <DrawerClose asChild>
            <Button variant='outline'>Отмена</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

'use client';

import React from 'react';
import { clsx } from 'clsx';
import {
  ArrowRightLeft,
  Goal,
  Landmark,
  LayoutDashboard,
  NotebookTabs,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/app/constants/constants';

interface Props {
  className?: string;
  listClassName?: string;
}

export const NavigationList = ({ className, listClassName }: Props) => {
  const pathname = usePathname();

  const itemsClassName =
    'text-l w-full px-4 py-4 flex items-center gap-4 hover:text-theme transition-all';
  const activeClassName = (path: string) => {
    return pathname === path ? 'text-theme' : '';
  };

  return (
    <nav className={clsx(className, '')}>
      <ul className={clsx(listClassName, '')}>
        <Link href={ROUTES.dashboard.href}>
          <li className={clsx(itemsClassName, activeClassName('/'))}>
            <LayoutDashboard />
            {ROUTES.dashboard.title}
          </li>
        </Link>

        <Link href={ROUTES.transactions.href}>
          <li className={clsx(itemsClassName, activeClassName(ROUTES.transactions.href))}>
            <ArrowRightLeft />
            {ROUTES.transactions.title}
          </li>
        </Link>

        <Link href={ROUTES.accounts.href}>
          <li className={clsx(itemsClassName, activeClassName(ROUTES.accounts.href))}>
            <NotebookTabs />
            {ROUTES.accounts.title}
          </li>
        </Link>

        <Link href={ROUTES.budgets.href}>
          <li className={clsx(itemsClassName, activeClassName(ROUTES.budgets.href))}>
            <Landmark />
            {ROUTES.budgets.title}
          </li>
        </Link>

        <Link href={ROUTES.goals.href}>
          <li className={clsx(itemsClassName, activeClassName(ROUTES.goals.href))}>
            <Goal />
            {ROUTES.goals.title}
          </li>
        </Link>

        <Link href={ROUTES.settings.href}>
          <li className={clsx(itemsClassName, activeClassName(ROUTES.settings.href))}>
            <Settings />
            {ROUTES.settings.title}
          </li>
        </Link>
      </ul>
    </nav>
  );
};

import React from 'react';

import { ButtonLogout } from '@/app/components/buttonLogout/ButtonLogout';
import { DesktopNavigation } from '@/app/components/mainNavigation/DesktopNavigation';
import { MobileNavigation } from '@/app/components/mainNavigation/MobileNavigation';
import { Typography } from '@/app/components/ui/typography';
import { getSession } from '@/app/lib/utils/auth_utils';
import { getUserById } from '@/app/lib/utils/user.utils';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = await getUserById(session?.user?.id);

  if (!user) return null;

  return (
    <>
      <header className={'border-b border-b-sidebar-border'}>
        <div className={'container flex items-center justify-end gap-8 py-4'}>
          <MobileNavigation className={'mr-auto'} />

          <Typography>{user.email}</Typography>
          <ButtonLogout />
        </div>
      </header>

      <div className={'flex'}>
        <DesktopNavigation />
        <main className={'w-full px-6 py-4'}>{children}</main>
      </div>
    </>
  );
};

export default Layout;

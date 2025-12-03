import React from 'react';

import { ButtonLogout } from '@/app/components/buttonLogout/ButtonLogout';
import { Typography } from '@/app/components/ui/typography';
import { getSession } from '@/app/lib/utils/auth_utils';
import { getUserById } from '@/app/lib/utils/user.utils';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = await getUserById(session?.user?.id);

  if (!user) return null;

  return (
    <>
      <header className={'container flex items-center justify-end gap-8 py-4'}>
        <Typography>{user.email}</Typography>
        <ButtonLogout />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;

import React, { Suspense } from 'react';

import { PasswordForm } from '@/app/(pages)/(root_layout)/settings/components/PasswordForm';
import { PasswordFormSkeleton } from '@/app/(pages)/(root_layout)/settings/components/PasswordFormSleketon';
import { SettingsForm } from '@/app/(pages)/(root_layout)/settings/components/SettingsForm';
import { SettingsFormSkeleton } from '@/app/(pages)/(root_layout)/settings/components/SettingsFormSkeleton';
import { PageTitle } from '@/app/components/pageTitle/PageTitle';
import { getUserSession } from '@/app/lib/utils/user.utils';

const Page = async () => {
  const user = await getUserSession();

  return (
    <div>
      <PageTitle className={'mb-10'}>Настройки</PageTitle>

      <div className={'flex flex-col gap-7'}>
        <Suspense fallback={<SettingsFormSkeleton />}>
          <SettingsForm user={user} />
        </Suspense>

        <Suspense fallback={<PasswordFormSkeleton />}>
          <PasswordForm user={user} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;

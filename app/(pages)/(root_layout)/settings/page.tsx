import React, { Suspense } from 'react';

import { SettingsForm } from '@/app/(pages)/(root_layout)/settings/components/accountForm/SettingsForm';
import { SettingsFormSkeleton } from '@/app/(pages)/(root_layout)/settings/components/accountForm/SettingsFormSkeleton';
import { CategoryTabContent } from '@/app/(pages)/(root_layout)/settings/components/categories/CategoryTabContent';
import { PasswordForm } from '@/app/(pages)/(root_layout)/settings/components/passwordForm/PasswordForm';
import { PasswordFormSkeleton } from '@/app/(pages)/(root_layout)/settings/components/passwordForm/PasswordFormSleketon';
import { TabsTriggerList } from '@/app/(pages)/(root_layout)/settings/components/tabsTriggerList/TabsTriggerList';
import { PageTitle } from '@/app/components/pageTitle/PageTitle';
import { Tabs, TabsContent } from '@/app/components/ui/tabs';
import { getUserSession } from '@/app/services/user.service';
import { PaginatedRequestFields } from '@/app/types/types';

const TABS = {
  account: { value: 'account', label: 'Аккаунт' },
  categories: { value: 'categories', label: 'Категории' },
} as const;

type TabKey = keyof typeof TABS;

interface UrlParams {
  searchParams: Promise<PaginatedRequestFields & { tab: string }>;
}

const Page = async ({ searchParams }: UrlParams) => {
  const user = await getUserSession();

  const { tab } = await searchParams;
  const tabKey = (Array.isArray(tab) ? tab[0] : tab) as string | undefined;
  const activeTabKey: TabKey = tabKey && tabKey in TABS ? (tabKey as TabKey) : 'account';

  const activeTab = TABS[activeTabKey].value;
  const tabsOptions = Object.values(TABS);

  return (
    <div>
      <PageTitle className={'mb-10'}>Настройки</PageTitle>

      <Tabs defaultValue={activeTab}>
        <TabsTriggerList className={'mb-7'} options={tabsOptions} />

        <TabsContent value={TABS.account.value}>
          <Suspense fallback={<SettingsFormSkeleton />}>
            <SettingsForm user={user} />
          </Suspense>

          <Suspense fallback={<PasswordFormSkeleton />}>
            <PasswordForm user={user} />
          </Suspense>
        </TabsContent>

        <TabsContent value={TABS.categories.value}>
          <CategoryTabContent searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;

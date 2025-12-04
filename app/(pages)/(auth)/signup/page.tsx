import React from 'react';

import { SignUpForm } from '@/app/(pages)/(auth)/signup/components/SignUpForm';

const Page = () => {
  return (
    <main className='container flex min-h-screen items-center justify-center'>
      <SignUpForm />
    </main>
  );
};

export default Page;

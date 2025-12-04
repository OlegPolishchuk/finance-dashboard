'use client';

import React, { startTransition, useActionState, useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { loginAction, LoginFormState } from '@/app/(pages)/(auth)/login/actions/login.action';
import { SignUpFormState } from '@/app/(pages)/(auth)/signup/actions/singup.action';
import { Button } from '@/app/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '@/app/components/ui/field';
import { Input } from '@/app/components/ui/input';
import { InputPassword } from '@/app/components/ui/InputPassword';
import { Spinner } from '@/app/components/ui/spinner';
import { Typography } from '@/app/components/ui/typography';
import { ROUTES } from '@/app/constants/constants';

export const LoginForm = () => {
  const router = useRouter();

  const [authError, setAuthError] = useState('');
  const [pending, startTransition] = useTransition();

  const initialState: SignUpFormState = { message: '' };
  const [state, formAction, isPending] = useActionState<LoginFormState, FormData>(
    loginAction,
    initialState,
  );

  const isFullPending = isPending || pending;

  useEffect(() => {
    if (state.success) {
      const signInUser = async () => {
        try {
          const response = await signIn('credentials', {
            email: state.values?.email,
            password: state.values?.password,
            redirect: false,
          });

          if (response && response.error) {
            if (response.error === 'CredentialsSignin') {
              return setAuthError('Такого пользователя не существует!');
            }
          }

          router.replace(ROUTES.home.href);
          router.refresh();
        } catch (e) {
          console.log('error', e);
        }
      };

      startTransition(signInUser);
    }
  }, [state]);

  return (
    <form className={'w-full max-w-md'} action={formAction}>
      <Typography className={'mb-6 text-center'} variant={'headline-2'} tag={'h1'}>
        Вход
      </Typography>

      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='checkout-7j9-card-name-43j'>Email:</FieldLabel>
              <Input
                id='checkout-7j9-card-name-43j'
                name={'email'}
                placeholder='Example@mail.com'
                defaultValue={state.values?.email ?? ''}
                disabled={isFullPending}
                required
              />
              {state.errors?.email && (
                <p className={'text-xs text-destructive'}>{state.errors.email}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor='checkout-7j9-card-number-uw1'>Password:</FieldLabel>

              <InputPassword
                id='checkout-7j9-card-number-uw1'
                name={'password'}
                placeholder='qwerty'
                defaultValue={state.values?.password ?? ''}
                disabled={isFullPending}
                required
              />
              {state.errors?.password && (
                <p className={'text-xs text-destructive'}>{state.errors.password}</p>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className={'flex items-center justify-between'}>
          <Typography className={'text-xs'} tag={'span'}>
            Нет аккаунта ?
          </Typography>
          <Link className={'text-[#1447E6FF]'} href={ROUTES.signup.href}>
            Регистрация
          </Link>
        </div>

        <FieldSeparator />

        {authError && <p className={'text-sm text-destructive'}>{authError}</p>}

        <Field orientation='horizontal'>
          <Button type='submit' disabled={isFullPending}>
            Войти
            {isFullPending && <Spinner />}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

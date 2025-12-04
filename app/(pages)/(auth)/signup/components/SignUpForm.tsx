'use client';

import React, { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signupAction, SignUpFormState } from '@/app/(pages)/(auth)/signup/actions/singup.action';
import { Button } from '@/app/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/app/components/ui/field';
import { Input } from '@/app/components/ui/input';
import { InputPassword } from '@/app/components/ui/InputPassword';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Spinner } from '@/app/components/ui/spinner';
import { Typography } from '@/app/components/ui/typography';
import { ROUTES } from '@/app/constants/constants';

export const SignUpForm = () => {
  const router = useRouter();
  const initialState: SignUpFormState = { message: '' };
  const [state, formAction, isPending] = useActionState<SignUpFormState, FormData>(
    signupAction,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      router.push(ROUTES.login.href);
    }
  }, [state?.success]);

  return (
    <form className={'w-full max-w-md'} action={formAction}>
      <Typography className={'mb-6 text-center'} variant={'headline-2'} tag={'h1'}>
        Регистрация
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
                disabled={isPending}
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
                disabled={isPending}
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
            Уже есть аккаунт ?
          </Typography>
          <Link className={'text-[#1447E6FF]'} href={ROUTES.login.href}>
            Войти
          </Link>
        </div>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Валюта по умолчанию:</FieldLegend>
          <FieldDescription>
            Стандартная валюта для рассчета. Можно изменить в личном кабинете
          </FieldDescription>

          <FieldGroup>
            <RadioGroup
              name={'currency'}
              className={'flex items-center gap-6'}
              defaultValue={state.values?.currency ?? 'BYN'}
              disabled={isPending}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='BYN' id='BYN' />
                <Label htmlFor='BYN'>BYN</Label>
              </div>

              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='RUB' id='RUB' />
                <Label htmlFor='RUB'>RUB</Label>
              </div>

              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='USD' id='USD' />
                <Label htmlFor='USD'>USD</Label>
              </div>
            </RadioGroup>
          </FieldGroup>
        </FieldSet>

        <Field orientation='horizontal'>
          <Button type='submit'>
            Зарегистраироваться
            {isPending && <Spinner />}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

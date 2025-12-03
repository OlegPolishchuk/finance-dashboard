'use client';

import React, { useActionState } from 'react';

import { signupAction, SignUpFormState } from '@/app/(pages)/(auth)/actions/singup.action';
import { InputPassword } from '@/app/(pages)/(auth)/components/InputPassword';
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
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Spinner } from '@/app/components/ui/spinner';
import { Typography } from '@/app/components/ui/typography';

export const SignUpForm = () => {
  const initialState: SignUpFormState = { message: '' };
  const [state, formAction, isPending] = useActionState<SignUpFormState, FormData>(
    signupAction,
    initialState,
  );

  console.log('state =>', state);
  console.log('isPending =>', isPending);

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

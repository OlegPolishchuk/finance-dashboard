'use client';

import React, { startTransition, useActionState } from 'react';
import { clsx } from 'clsx';

import { loginAction, LoginFormState } from '@/app/(pages)/(auth)/login/actions/login.action';
import { SignUpFormState } from '@/app/(pages)/(auth)/signup/actions/singup.action';
import {
  settingsAction,
  SettingsFormState,
} from '@/app/(pages)/(root_layout)/settings/actions/settings.action';
import { Button } from '@/app/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/app/components/ui/field';
import { Input } from '@/app/components/ui/input';
import { InputPassword } from '@/app/components/ui/InputPassword';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Spinner } from '@/app/components/ui/spinner';
import { CurrencyCode, User } from '@/app/generated/prisma/client';

interface Props {
  user: Omit<User, 'password'> | null;
  className?: string;
}

export const SettingsForm = ({ user, className }: Props) => {
  const initialState: SettingsFormState = {
    message: '',
    values: {
      email: user?.email ?? '',
      default_currency: user?.default_currency ?? 'BYN',
    },
  };
  const [state, formAction, isPending] = useActionState<SettingsFormState, FormData>(
    settingsAction,
    initialState,
  );

  if (!user) return null;

  const handleChangeCurrency = (currency: CurrencyCode) =>
    startTransition(() => {
      const formData = new FormData();
      formData.append('default_currency', currency);
      formData.append('email', user.email);
      formAction(formData);
    });

  return (
    <form className={clsx('w-full max-w-[550px]', className)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldDescription>Email:</FieldDescription>
              <Input
                name={'email'}
                placeholder='Example@mail.com'
                defaultValue={state.values?.email ?? ''}
                disabled
              />
            </Field>

            <FieldSeparator />

            <FieldSet>
              <FieldDescription>Валюта для рассчета:</FieldDescription>

              <FieldGroup>
                <RadioGroup
                  name={'currency'}
                  className={'flex items-center gap-6'}
                  defaultValue={state.values?.default_currency ?? 'BYN'}
                  disabled={isPending}
                  onValueChange={handleChangeCurrency}
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

            <FieldSeparator />
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

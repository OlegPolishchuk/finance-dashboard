import React, { useActionState } from 'react';
import { clsx } from 'clsx';

import {
  AccountFormState,
  createAccountAction,
} from '@/app/(pages)/(root_layout)/accounts/actions/createAccount.action';
import { Asterisk } from '@/app/components/Asterisk/Asterisk';
import { Button } from '@/app/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/app/components/ui/field';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Spinner } from '@/app/components/ui/spinner';
import { accountOptions } from '@/app/constants/constants';
import { Account } from '@/app/generated/prisma/client';

interface Props {
  className?: string;
  account?: Account;
}

export const AccountForm = ({ className, account }: Props) => {
  const initialState: AccountFormState = {
    message: '',
    values: {
      name: account?.name ?? '',
      type: account?.type ?? 'CARD',
      initial_balance: account?.initial_balance ?? 0,
      currency: account?.currency ?? 'BYN',
      is_archived: account?.is_archived ?? false,
    },
    success: false,
  };
  const [state, formAction, isPending] = useActionState<AccountFormState, FormData>(
    createAccountAction,
    initialState,
  );

  return (
    <form action={formAction} className={clsx('w-full max-w-[550px]', className)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='settings-password-current'>
                Название <Asterisk className={'ml-[-8px]'} />
              </FieldLabel>

              <Input
                id='account_name'
                name={'name'}
                placeholder='Название счета (карта)'
                disabled={isPending}
                defaultValue={state.values?.name ?? ''}
                required
              />
              {state.errors?.name && (
                <p className={'text-xs text-destructive'}>{state.errors.name}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor={'category_type'}>
                Тип <Asterisk className={'ml-[-8px]'} />
              </FieldLabel>

              <Select name={'type'} defaultValue={state.values?.type} disabled={isPending}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Тип' />
                </SelectTrigger>

                <SelectContent>
                  {accountOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {initialState?.errors?.type && <FieldError>{initialState.errors?.type}</FieldError>}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <RadioGroup
              name={'currency'}
              className={'flex items-center gap-6'}
              defaultValue={state.values?.currency ?? 'BYN'}
              disabled={isPending}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='BYN' id='settings-currency-BYN' />
                <Label htmlFor='settings-currency-BYN'>BYN</Label>
              </div>

              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='RUB' id='settings-currency-RUB' />
                <Label htmlFor='settings-currency-RUB'>RUB</Label>
              </div>

              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='USD' id='settings-currency-USD' />
                <Label htmlFor='settings-currency-USD'>USD</Label>
              </div>
            </RadioGroup>
          </FieldGroup>
        </FieldSet>

        <Field orientation='horizontal'>
          <Button type='submit' disabled={isPending}>
            Изменить
            {isPending && <Spinner />}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

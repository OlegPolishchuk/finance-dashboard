'use client';

import React, { useActionState } from 'react';
import { clsx } from 'clsx';

import {
  changePasswordAction,
  ChangePasswordFormState,
} from '@/app/(pages)/(root_layout)/settings/actions/changePassword.action';
import { Button } from '@/app/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/app/components/ui/field';
import { InputPassword } from '@/app/components/ui/InputPassword';
import { Spinner } from '@/app/components/ui/spinner';
import { User } from '@/app/generated/prisma/client';

interface Props {
  user: Omit<User, 'password'> | null;
  className?: string;
}

export const PasswordForm = ({ user, className }: Props) => {
  const initialState: ChangePasswordFormState = {
    message: '',
    values: {
      email: user?.email ?? '',
      password: '',
      newPassword: '',
    },
  };
  const [state, formAction, isPending] = useActionState<ChangePasswordFormState, FormData>(
    changePasswordAction,
    initialState,
  );

  if (!user) return null;

  return (
    <form action={formAction} className={clsx('w-full max-w-[550px]', className)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <FieldDescription>Изменить пароль:</FieldDescription>
            <Field>
              <FieldLabel htmlFor='settings-password-current'>Старый пароль:</FieldLabel>

              <InputPassword
                id='settings-password-current'
                name={'password'}
                placeholder='qwerty'
                disabled={isPending}
                defaultValue={state.values?.password ?? ''}
                required
              />
              {state.errors?.password && (
                <p className={'text-xs text-destructive'}>{state.errors.password}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor='settings-password-new'>Новый пароль:</FieldLabel>

              <InputPassword
                id='settings-password-new'
                name={'newPassword'}
                placeholder='qwerty'
                defaultValue={state.values?.newPassword ?? ''}
                disabled={isPending}
                required
              />
              {state.errors?.newPassword && (
                <p className={'text-xs text-destructive'}>{state.errors.newPassword}</p>
              )}
            </Field>
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

'use client';

import React from 'react';
import { clsx } from 'clsx';

import { Button } from '@/app/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/app/components/ui/field';
import { InputPassword } from '@/app/components/ui/InputPassword';

interface Props {
  className?: string;
}

export const PasswordFormSkeleton = ({ className }: Props) => {
  return (
    <form className={clsx('w-full max-w-[550px]', className)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <FieldDescription>Изменить пароль:</FieldDescription>
            <Field>
              <FieldLabel htmlFor='setting_password'>Старый пароль:</FieldLabel>

              <InputPassword
                id='setting_password'
                name={'password'}
                placeholder='qwerty'
                disabled={true}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor='setting_new_password'>Новый пароль:</FieldLabel>

              <InputPassword
                id='setting_new_password'
                name={'newPassword'}
                placeholder='qwerty'
                disabled={true}
                required
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Field orientation='horizontal'>
          <Button type='submit' disabled={true}>
            Изменить
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

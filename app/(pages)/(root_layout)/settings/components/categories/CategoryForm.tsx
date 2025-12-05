'use client';

import React, { useActionState, useEffect } from 'react';

import {
  CategoryFormState,
  createCategoryAction,
} from '@/app/(pages)/(root_layout)/settings/actions/createCategory.action';
import { Asterisk } from '@/app/components/Asterisk/Asterisk';
import { Button } from '@/app/components/ui/button';
import { DialogClose } from '@/app/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/app/components/ui/field';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Spinner } from '@/app/components/ui/spinner';
import { categoryOptions } from '@/app/constants/constants';

interface Props {
  onSuccess: () => void;
}

export const CategoryForm = ({ onSuccess }: Props) => {
  const initialState: CategoryFormState = {
    success: false,
    message: '',
    errors: {},
    values: {},
  };

  const [state, action, pending] = useActionState(createCategoryAction, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success]);

  return (
    <form className={'flex flex-col gap-6'} action={action}>
      <Field>
        <FieldLabel htmlFor={'category_name'}>
          Название
          <Asterisk className={'ml-[-8px]'} />
        </FieldLabel>
        <Input
          id={'category_name'}
          name={'name'}
          defaultValue={state.values?.name}
          disabled={pending}
          required
        />
        {state?.errors?.name && <FieldError>{state.errors?.name}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor={'category_type'}>
          Категория <Asterisk className={'ml-[-8px]'} />
        </FieldLabel>

        <Select name={'type'} defaultValue={state.values?.type} disabled={pending}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Категория' />
          </SelectTrigger>

          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {state?.errors?.type && <FieldError>{state.errors?.type}</FieldError>}
      </Field>

      <Field className={'w-[100px]'}>
        <FieldLabel htmlFor={'category_color'}>Цвет</FieldLabel>
        <Input
          id={'category_color'}
          name={'color'}
          type={'color'}
          defaultValue={state.values?.color ?? ''}
          disabled={pending}
        />
      </Field>

      <div className='flex items-center justify-end gap-2'>
        <DialogClose asChild>
          <Button variant='outline'>Отмена</Button>
        </DialogClose>

        <Button type='submit' disabled={pending}>
          Создать категорию
          {pending && <Spinner />}
        </Button>
      </div>
    </form>
  );
};

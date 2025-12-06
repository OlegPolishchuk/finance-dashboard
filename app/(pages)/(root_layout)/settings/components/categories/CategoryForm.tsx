'use client';

import React from 'react';

import { CategoryFormState } from '@/app/(pages)/(root_layout)/settings/actions/createCategory.action';
import { Asterisk } from '@/app/components/Asterisk/Asterisk';
import { Field, FieldError, FieldLabel } from '@/app/components/ui/field';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { categoryOptions } from '@/app/constants/constants';

interface Props {
  initialState: CategoryFormState;
  onSubmit: (payload: FormData) => void;
  pending: boolean;
  formId: string;
}

export const CategoryForm = ({ initialState, onSubmit, pending, formId }: Props) => {
  return (
    <form className={'flex flex-col gap-6'} action={onSubmit} id={formId}>
      <Field>
        <FieldLabel htmlFor={'category_name'}>
          Название
          <Asterisk className={'ml-[-8px]'} />
        </FieldLabel>
        <Input
          id={'category_name'}
          name={'name'}
          defaultValue={initialState.values?.name}
          disabled={pending}
          required
        />
        {initialState?.errors?.name && <FieldError>{initialState.errors?.name}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor={'category_type'}>
          Категория <Asterisk className={'ml-[-8px]'} />
        </FieldLabel>

        <Select name={'type'} defaultValue={initialState.values?.type} disabled={pending}>
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

        {initialState?.errors?.type && <FieldError>{initialState.errors?.type}</FieldError>}
      </Field>

      <Field className={'w-[100px]'}>
        <FieldLabel htmlFor={'category_color'}>Цвет</FieldLabel>
        <Input
          id={'category_color'}
          name={'color'}
          type={'color'}
          defaultValue={initialState.values?.color ?? ''}
          disabled={pending}
        />
      </Field>
    </form>
  );
};

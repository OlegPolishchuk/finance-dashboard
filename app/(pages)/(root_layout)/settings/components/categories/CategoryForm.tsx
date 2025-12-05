import React from 'react';

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
import { transformToOptions } from '@/app/lib/utils';

export const CategoryForm = () => {
  return (
    <form>
      <Field>
        <FieldLabel htmlFor={'category_name'}>Название</FieldLabel>
        <Input id={'category_name'} name={'name'} />
        <FieldError>Some error</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor={'category_name'}>Категория</FieldLabel>
        <Select>
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
      </Field>
    </form>
  );
};

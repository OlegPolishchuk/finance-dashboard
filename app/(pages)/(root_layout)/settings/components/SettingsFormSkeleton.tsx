import React from 'react';
import { clsx } from 'clsx';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from '@/app/components/ui/field';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';

export const SettingsFormSkeleton = ({ className }: { className?: string }) => {
  return (
    <form className={clsx('w-full max-w-[550px]', className)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldDescription>Email:</FieldDescription>
              <Input name={'email'} placeholder='Example@mail.com' disabled />
            </Field>

            <FieldSeparator />

            <FieldSet>
              <FieldDescription>Валюта для рассчета:</FieldDescription>

              <FieldGroup>
                <RadioGroup className={'flex items-center gap-6'}>
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

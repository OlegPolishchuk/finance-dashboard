'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { User } from 'next-auth';
import { z } from 'zod';

import { ROUTES } from '@/app/constants/constants';
import { CurrencyCode } from '@/app/generated/prisma/enums';
import prisma from '@/app/lib/utils/prisma';

export interface SettingsFormState {
  message: string;
  values?: {
    email?: string;
    default_currency?: CurrencyCode;
  };
  user?: User;
}

const settingsFormSchema = z.object({
  email: z.email({ message: 'Невалидный email' }),
});

export const settingsAction = async (initialState: SettingsFormState, formData: FormData) => {
  const values = {
    email: (formData.get('email') || '') as string,
    default_currency: (formData.get('default_currency') || 'BYN') as CurrencyCode,
  };

  /* Валидация */
  const result = settingsFormSchema.safeParse({
    email: values.email,
  });

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);

    return {
      message: 'Ошибка валидации',
      errors: {
        email: fieldErrors.email,
      },
      values,
    };
  }

  /* Тут будем работать с бд */
  try {
    const updatedUser = await prisma.user.update({
      where: { email: values.email },
      data: { default_currency: values.default_currency },
    });

    return {
      message: 'Success',
      success: true,
      values: {
        email: updatedUser.email,
        default_currency: updatedUser.default_currency,
      },
    };
  } catch (error) {
    console.log('error in DB =>', error);

    return {
      message: 'Error => ' + error,
    };
  }
};

'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { User } from 'next-auth';
import { z } from 'zod';

import { ROUTES } from '@/app/constants/constants';
import { CurrencyCode } from '@/app/generated/prisma/enums';
import prisma from '@/app/lib/utils/prisma';

export interface SignUpFormState {
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
  values?: {
    email?: string;
    password?: string;
    currency?: CurrencyCode;
  };
  user?: User;
}

const signupFormSchema = z.object({
  email: z.email({ message: 'Невалидный email' }),
  password: z.string().min(3, { message: 'Пароль должен состоять как минимум из трех символов' }),
});

export const signupAction = async (initialState: SignUpFormState, formData: FormData) => {
  const values = {
    email: (formData.get('email') || '') as string,
    password: (formData.get('password') || '') as string,
    currency: (formData.get('currency') || 'BYN') as CurrencyCode,
  };

  /* Валидация */
  const result = signupFormSchema.safeParse({
    email: values.email,
    password: values.password,
  });

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);

    return {
      message: 'Ошибка валидации',
      errors: {
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
      values,
    };
  }

  /* Тут будем работать с бд */
  const user = await prisma.user.findUnique({
    where: { email: values.email },
  });

  if (user) {
    return {
      message: 'Error',
      errors: {
        email: ['Пользователь с таким email уже существует'],
      },
    };
  }

  try {
    const hashedPassword = await hash(values.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: values.email,
        password: hashedPassword,
        default_currency: values.currency,
      },
    });

    redirect(ROUTES.login.href);
  } catch (error) {
    console.log('error in DB =>', error);

    return {
      message: 'Error => ' + error,
    };
  }
};

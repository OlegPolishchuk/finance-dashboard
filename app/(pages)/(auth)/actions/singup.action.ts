'use server';

import { z } from 'zod';

import { baseUrl } from '@/app/constants/constants';

export interface SignUpFormState {
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
  values?: {
    email?: string;
    password?: string;
    currency?: string;
  };
}

const signupFormSchema = z.object({
  email: z.email({ message: 'Невалидный email' }),
  password: z.string().min(3, { message: 'Пароль должен состоять как минимум из трех символов' }),
});

export const signupAction = async (initialState: SignUpFormState, formData: FormData) => {
  const values = {
    email: (formData.get('email') || '') as string,
    password: (formData.get('password') || '') as string,
    currency: (formData.get('currency') || 'BYN') as string,
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

  /* Тут будет делать запрос по api */

  const response = await fetch(`${baseUrl}/api/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(values),
  });

  console.log({ response });

  return {
    message: 'Success',
    values,
  };
};

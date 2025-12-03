'use server';

import { z } from 'zod';

export interface LoginFormState {
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
  values?: {
    email?: string;
    password?: string;
  };
  success?: boolean;
}

const loginFormSchema = z.object({
  email: z.email({ message: 'Невалидный email' }),
  password: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
});

export const loginAction = async (initialState: LoginFormState, formData: FormData) => {
  const values = {
    email: (formData.get('email') || '') as string,
    password: (formData.get('password') || '') as string,
  };

  /* Валидация */
  const result = loginFormSchema.safeParse({
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

  return {
    message: 'Success',
    success: true,
    values,
  };
};

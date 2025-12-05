'use server';

import { compare, hash } from 'bcrypt';
import { User } from 'next-auth';
import { z } from 'zod';

import prisma from '@/app/lib/utils/prisma';

export interface ChangePasswordFormState {
  message: string;
  values?: {
    email: string;
    password: string;
    newPassword: string;
  };
  errors?: {
    email?: string[];
    password?: string[];
    newPassword?: string[];
  };
  user?: User;
}

const changePasswordSchema = z.object({
  email: z.email({ message: 'Невалидный email' }),
  password: z.string().min(3, { message: 'Пароль должен состоять как минимум из трех символов' }),
  newPassword: z
    .string()
    .min(3, { message: 'Пароль должен состоять как минимум из трех символов' }),
});

export const changePasswordAction = async (
  initialState: ChangePasswordFormState,
  formData: FormData,
) => {
  const values = {
    email: initialState.values?.email ?? '',
    password: (formData.get('password') || '') as string,
    newPassword: (formData.get('newPassword') || '') as string,
  };

  /* Валидация */
  const result = changePasswordSchema.safeParse({
    email: values.email,
    password: values.password,
    newPassword: values.newPassword,
  });

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);

    return {
      message: 'Ошибка валидации',
      errors: {
        email: fieldErrors.email,
        password: fieldErrors.password,
        newPassword: fieldErrors.newPassword,
      },
      values,
    };
  }

  /* Тут будем работать с бд */
  const user = await prisma.user.findUnique({
    where: { email: values.email },
  });

  if (!user) {
    return {
      message: 'Error',
      errors: {
        email: ['Пользователь не найден'],
      },
    };
  }

  try {
    /* Нужно проверить пароли (введенны пользователем текущий пароль и тот, что в бд) */
    const isPasswordValid = await compare(values.password, user.password);

    if (!isPasswordValid) {
      return {
        message: 'Error',
        errors: {
          password: ['Неверный текущий пароль'],
        },
        values,
      };
    }

    /* Если все верно, обновляем пароль у пользователя в бд */
    const hashedPassword = await hash(values.newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: { email: values.email },
      data: { password: hashedPassword },
      omit: { password: true },
    });

    return {
      message: 'Success',
      user: updatedUser,
    };
  } catch (error) {
    console.log('error in DB =>', error);

    return {
      message: 'Error => ' + error,
    };
  }
};

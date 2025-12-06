'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { ROUTES } from '@/app/constants/constants';
import { CategoryType } from '@/app/generated/prisma/enums';
import prisma from '@/app/lib/utils/prisma';
import { getUserSession } from '@/app/services/user.service';
import { ActionResponse } from '@/app/types/types';

interface CreateCategoryFormState {
  name?: string;
  type?: string;
  color?: string | null;
}

export type CategoryFormState = ActionResponse<CreateCategoryFormState>;

const requiredMessage = 'Поле обязательно для заполнения';

const categoryFormSchema = z.object({
  name: z.string().nonempty({ message: requiredMessage }),
  type: z.string().nonempty({ message: requiredMessage }),
  color: z.string(),
});

export const createCategoryAction = async (
  initialState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> => {
  const values = {
    name: (formData.get('name') || '') as string,
    type: (formData.get('type') || '') as CategoryType,
    color: (formData.get('color') || '') as string,
  };

  const result = categoryFormSchema.safeParse(values);

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);

    return {
      success: false,
      message: 'Ошибка валидации',
      values,
      errors: {
        name: fieldErrors.name,
        type: fieldErrors.type,
        color: fieldErrors.color,
      },
    };
  }

  /* DB */
  /* Нужно проверить на наличие категорий с таким же именем */
  const existingCategory = await prisma.category.findFirst({
    where: { name: values.name },
  });

  if (existingCategory?.id) {
    return {
      success: false,
      message: 'Такая категория уже существует',
      values,
      errors: {
        name: ['Категория с таким названием уже существует'],
      },
    };
  }

  /* Если категории с таким название нет, нужно создать :D */
  const user = await getUserSession();

  if (!user) {
    throw new Error('Пользователь не найден!');
  }

  const newCategory = await prisma.category.create({
    data: {
      ...values,
      user: {
        connect: { id: user.id },
      },
    },
  });

  revalidatePath(`${ROUTES.settings.href}?tab=categories`);

  return {
    success: true,
    message: 'Success',
    errors: {},
    values: newCategory,
  };
};

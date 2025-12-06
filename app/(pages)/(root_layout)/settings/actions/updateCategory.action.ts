'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { ROUTES } from '@/app/constants/constants';
import { CategoryType } from '@/app/generated/prisma/client';
import prisma from '@/app/lib/utils/prisma';
import { ActionResponse } from '@/app/types/types';

interface UpdateCategoryFormState {
  name?: string;
  type?: string;
  color?: string | null;
  id: string;
}

type CategoryFormState = ActionResponse<UpdateCategoryFormState>;

const requiredMessage = 'Поле обязательно для заполнения';

const categoryFormSchema = z.object({
  name: z.string().nonempty({ message: requiredMessage }),
  type: z.string().nonempty({ message: requiredMessage }),
  color: z.string(),
  id: z.string().nonempty({ message: requiredMessage }),
});

export const updateCategoryAction = async (
  initialState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> => {
  const id = initialState.values;
  const values = {
    name: (formData.get('name') || '') as string,
    type: (formData.get('type') || '') as CategoryType,
    color: (formData.get('color') || '') as string,
    id: (initialState.values?.id || '') as string,
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
        id: fieldErrors.id,
      },
    };
  }

  /* DB */
  console.log('values', values);

  const updatedCategory = await prisma.category.update({
    where: { id: values.id },
    data: { ...values },
  });

  revalidatePath(`${ROUTES.settings.href}?tab=categories`);

  return {
    success: true,
    message: 'Success',
    errors: {},
    values: updatedCategory,
  };
};

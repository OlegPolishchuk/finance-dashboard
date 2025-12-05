'use server';

import { revalidatePath } from 'next/cache';

import { ROUTES } from '@/app/constants/constants';
import { Category } from '@/app/generated/prisma/client';
import { deleteCategory } from '@/app/lib/actions/categories.action';
import { ActionResponse } from '@/app/lib/types/types';

export type DeleteCategoryFormState = ActionResponse<Category>;

export const deleteCategoryAction = async (
  initialValue: DeleteCategoryFormState,
): Promise<DeleteCategoryFormState> => {
  try {
    const id = initialValue?.values?.id || '';
    const deletedCategory = await deleteCategory(id);

    revalidatePath(`${ROUTES.settings.href}?tab=categories`);

    return {
      message: 'Success',
      values: deletedCategory,
      success: true,
      errors: {},
    };
  } catch (error) {
    return {
      message: 'Error',
      values: initialValue.values,
      success: false,
    };
  }
};

'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { ROUTES } from '@/app/constants/constants';
import { AccountType, CategoryType, CurrencyCode } from '@/app/generated/prisma/enums';
import prisma from '@/app/lib/utils/prisma';
import { getUserSession } from '@/app/services/user.service';
import { ActionResponse } from '@/app/types/types';

export interface CreateAccountFormState {
  name: string;
  type: AccountType;
  currency: CurrencyCode;
  initial_balance: number;
  is_archived: boolean;
}

export type AccountFormState = ActionResponse<CreateAccountFormState>;

const requiredMessage = 'Поле обязательно для заполнения';

const categoryFormSchema = z.object({
  name: z.string().nonempty({ message: requiredMessage }),
  type: z.string().nonempty({ message: requiredMessage }),
  currency: z.string().nonempty({ message: requiredMessage }),
  initial_balance: z.number(),
});

export const createAccountAction = async (
  initialState: AccountFormState,
  formData: FormData,
): Promise<AccountFormState> => {
  const values = {
    name: (formData.get('name') || '') as string,
    type: (formData.get('type') || 'INCOME') as AccountType,
    currency: (formData.get('currency') || 'BYN') as CurrencyCode,
    initial_balance: (formData.get('initial_balance') || 0) as number,
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
        currency: fieldErrors.currency,
        initial_balance: fieldErrors.initial_balance,
      },
    };
  }

  /* DB */
};

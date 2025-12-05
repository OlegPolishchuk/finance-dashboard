'use client';

import React from 'react';

import { DeleteCategoryModal } from '@/app/(pages)/(root_layout)/settings/components/deleteCategoryModal/DeleteCategoryModal';
import { ButtonEdit } from '@/app/components/buttons/buttonEdit/ButtonEdit';
import { Category } from '@/app/generated/prisma/client';

interface Props {
  category: Category;
}

export const CategoryListActions = ({ category }: Props) => {
  return (
    <div className={'flex items-center justify-end gap-2'}>
      <ButtonEdit />

      <DeleteCategoryModal category={category} />
    </div>
  );
};

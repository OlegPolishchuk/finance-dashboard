'use client';

import React, { startTransition, useActionState, useEffect } from 'react';

import { CategoryFormState } from '@/app/(pages)/(root_layout)/settings/actions/createCategory.action';
import {
  deleteCategoryAction,
  DeleteCategoryFormState,
} from '@/app/(pages)/(root_layout)/settings/actions/deleteCategory.action';
import { updateCategoryAction } from '@/app/(pages)/(root_layout)/settings/actions/updateCategory.action';
import { CategoryForm } from '@/app/(pages)/(root_layout)/settings/components/categories/CategoryForm';
import { ButtonDelete } from '@/app/components/buttons/buttonDelete/ButtonDelete';
import { ButtonEdit } from '@/app/components/buttons/buttonEdit/ButtonEdit';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { Spinner } from '@/app/components/ui/spinner';
import { Category } from '@/app/generated/prisma/client';

interface Props {
  category: Category;
}

export const EditCategoryModal = ({ category }: Props) => {
  const [open, setOpen] = React.useState(false);

  const initialState: CategoryFormState = {
    success: false,
    message: '',
    errors: {},
    values: category,
  };
  const [state, updateAction, pending] = useActionState(updateCategoryAction, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <ButtonEdit />
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Изменить категорию</DialogTitle>
            <DialogDescription className={'text-balance'} hidden>
              Вы действительно хотите удалить категорию
              <span className={'ml-2 font-semibold'}>{category.name}?</span>
            </DialogDescription>
          </DialogHeader>

          <CategoryForm
            initialState={initialState}
            onSubmit={updateAction}
            pending={pending}
            formId={'update_category_form'}
          />

          <div className='flex items-center justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='outline'>Отмена</Button>
            </DialogClose>

            <Button type='submit' disabled={pending} form={'update_category_form'}>
              Обновить
              {pending && <Spinner />}
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

'use client';

import React, { startTransition, useActionState, useEffect } from 'react';

import {
  deleteCategoryAction,
  DeleteCategoryFormState,
} from '@/app/(pages)/(root_layout)/settings/actions/deleteCategory.action';
import { ButtonDelete } from '@/app/components/buttons/buttonDelete/ButtonDelete';
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

export const DeleteCategoryModal = ({ category }: Props) => {
  const [open, setOpen] = React.useState(false);

  const initialState: DeleteCategoryFormState = {
    message: '',
    errors: {},
    values: { id: category.id },
    success: false,
  };
  const [deleteState, deleteAction, pending] = useActionState(deleteCategoryAction, initialState);

  useEffect(() => {
    if (deleteState.success) {
      setOpen(false);
    }
  }, [deleteState.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <ButtonDelete />
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Удалить категорию</DialogTitle>
            <DialogDescription className={'text-balance'}>
              Вы действительно хотите удалить категорию
              <span className={'ml-2 font-semibold'}>{category.name}?</span>
            </DialogDescription>
          </DialogHeader>

          <div className='flex items-center justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Отмена
              </Button>
            </DialogClose>

            <Button type='button' onClick={() => startTransition(deleteAction)} disabled={pending}>
              Удалить категорию
              {pending && <Spinner />}
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

'use client';

import React, { useActionState, useEffect, useState } from 'react';

import {
  CategoryFormState,
  createCategoryAction,
} from '@/app/(pages)/(root_layout)/settings/actions/createCategory.action';
import { CategoryForm } from '@/app/(pages)/(root_layout)/settings/components/categories/CategoryForm';
import { ButtonAdd } from '@/app/components/buttons/buttonAdd/ButtonAdd';
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

export const AddNewCategoryBtn = () => {
  const [open, setOpen] = useState(false);

  const initialState: CategoryFormState = {
    success: false,
    message: '',
    errors: {},
    values: {},
  };

  const [state, action, pending] = useActionState(createCategoryAction, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <ButtonAdd />
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Ноавя категория</DialogTitle>
            <DialogDescription>
              Категории — это список пользовательских групп расходов и доходов (еда, жильё, зарплата
              и т.п.) с типом, цветом и иконкой, которые используются для разметки и аналитики
              транзакций.
            </DialogDescription>
          </DialogHeader>

          <CategoryForm
            initialState={initialState}
            onSubmit={action}
            pending={pending}
            formId={'new_category_form'}
          />

          <div className='flex items-center justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='outline'>Отмена</Button>
            </DialogClose>

            <Button type='submit' disabled={pending} form={'new_category_form'}>
              Создать категорию
              {pending && <Spinner />}
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

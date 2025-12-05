'use client';

import React, { useState } from 'react';

import { CategoryForm } from '@/app/(pages)/(root_layout)/settings/components/categories/CategoryForm';
import { ButtonAdd } from '@/app/components/buttons/buttonAdd/ButtonAdd';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';

export const AddNewCategoryBtn = () => {
  const [open, setOpen] = useState(false);

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

          <CategoryForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </form>
    </Dialog>
  );
};

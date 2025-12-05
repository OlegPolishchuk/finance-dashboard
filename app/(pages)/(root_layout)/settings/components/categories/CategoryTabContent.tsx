import React from 'react';
import { format } from 'date-fns';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { Typography } from '@/app/components/ui/typography';
import { DEFAULT_DATE_FORMAT } from '@/app/constants/constants';
import { fetchCategories } from '@/app/lib/actions/categories.action';
import { getUserSession } from '@/app/lib/actions/user.action';

export const CategoryTabContent = async () => {
  const user = await getUserSession();
  if (!user) return;

  const categories = await fetchCategories(user.id);

  return (
    <div className={'flex flex-col gap-8'}>
      <div className={'flex items-center justify-between'}>
        <Typography variant={'headline-4'}>Категории</Typography>
      </div>

      <Table>
        <TableCaption>
          {categories.length > 0 ? 'Список ваших категорий' : 'У вас еще нет категорий'}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Название</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Цвет</TableHead>
            <TableHead className='text-right'>Дата создания</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell className='font-medium'>{category.name}</TableCell>
              <TableCell>{category.type}</TableCell>
              <TableCell>{category.color}</TableCell>
              <TableCell className='text-right'>
                {format(category.created_at, DEFAULT_DATE_FORMAT)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

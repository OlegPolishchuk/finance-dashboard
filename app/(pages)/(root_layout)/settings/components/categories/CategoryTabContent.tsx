import React from 'react';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';

import { AddNewCategoryBtn } from '@/app/(pages)/(root_layout)/settings/components/addNewCategoryBtn/AddNewCategoryBtn';
import { CategoryListActions } from '@/app/(pages)/(root_layout)/settings/components/categoryListActions/CategoryListActions';
import { Paginator } from '@/app/components/paginator/paginator';
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
import { DEFAULT_CATEGORIES_LIMIT, DEFAULT_DATE_FORMAT, ROUTES } from '@/app/constants/constants';
import { getTotalPagesCount } from '@/app/lib/utils';
import { fetchCategories } from '@/app/services/categorises.service';
import { getUserSession } from '@/app/services/user.service';
import { PaginatedRequestFields } from '@/app/types/types';

interface Props {
  searchParams: Promise<PaginatedRequestFields>;
}

export const CategoryTabContent = async ({ searchParams }: Props) => {
  const user = await getUserSession();
  if (!user) return;

  const params = await searchParams;
  const page = params.page ?? 1;
  const limit = params.limit || DEFAULT_CATEGORIES_LIMIT;

  const { data: categories, totalCount } = await fetchCategories(user.id, { page, limit });
  const totalPages = getTotalPagesCount({ totalCount, limit });

  return (
    <div className={'flex flex-col gap-8'}>
      <div className={'flex items-center justify-between'}>
        <Typography variant={'headline-4'}>Категории</Typography>

        <AddNewCategoryBtn />
      </div>

      <Table>
        {categories.length === 0 && <TableCaption>У вас еще нет категорий</TableCaption>}

        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead className='w-[100px]'>Название</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Цвет</TableHead>
            <TableHead className='text-right'>Дата создания</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className='font-medium'>{category.name}</TableCell>
              <TableCell>{category.type}</TableCell>
              <TableCell className={'flex items-center gap-2'}>
                {category.color}
                <div
                  className={'h-[20px] w-[12px] min-w-[20px] rounded-full'}
                  style={{ background: category.color ?? 'transparent' }}
                ></div>
              </TableCell>
              <TableCell className='text-right'>
                {format(category.created_at, DEFAULT_DATE_FORMAT)}
              </TableCell>
              <TableCell>
                <CategoryListActions category={category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Paginator currentPage={page} totalPages={totalPages} limit={limit} />
    </div>
  );
};

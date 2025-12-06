'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/pagination';

import { generatePaginationLinks } from './generatePages';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
};

export const Paginator = ({ currentPage, totalPages, limit }: PaginatorProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));
    params.set('limit', String(limit));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination className={'w-fit'}>
      <PaginationContent className='flex items-center space-x-2'>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage <= 1}
          />
        </PaginationItem>

        {generatePaginationLinks(+currentPage, totalPages, handleChangePage)}

        <PaginationItem>
          <PaginationNext
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

import { JSX } from 'react';

import { PaginationEllipsis, PaginationItem, PaginationLink } from '@/app/components/ui/pagination';

export const generatePaginationLinks = (
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
) => {
  const pages: JSX.Element[] = [];

  // Меньше либо равно 7 страниц — показываем все
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return pages;
  }

  // Первые две страницы
  for (let i = 1; i <= 2; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
          {i}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  // Текущая страница где-то в середине
  if (currentPage > 3 && currentPage < totalPages - 2) {
    pages.push(<PaginationEllipsis key='ellipsis-left' />);

    pages.push(
      <PaginationItem key={currentPage}>
        <PaginationLink onClick={() => onPageChange(currentPage)} isActive={true}>
          {currentPage}
        </PaginationLink>
      </PaginationItem>,
    );

    pages.push(<PaginationEllipsis key='ellipsis-right' />);
  } else {
    // Если текущая близко к началу — показываем страницу 3
    if (currentPage === 3) {
      pages.push(
        <PaginationItem key={3}>
          <PaginationLink onClick={() => onPageChange(3)} isActive={currentPage === 3}>
            3
          </PaginationLink>
        </PaginationItem>,
      );
      pages.push(<PaginationEllipsis key='ellipsis-right' />);
    }

    // Если текущая близко к концу — показываем страницу totalPages - 2
    if (currentPage === totalPages - 2) {
      pages.push(<PaginationEllipsis key='ellipsis-left' />);
      pages.push(
        <PaginationItem key={totalPages - 2}>
          <PaginationLink
            onClick={() => onPageChange(totalPages - 2)}
            isActive={currentPage === totalPages - 2}
          >
            {totalPages - 2}
          </PaginationLink>
        </PaginationItem>,
      );
    }
  }

  // Последние две страницы
  for (let i = totalPages - 1; i <= totalPages; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
          {i}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return pages;
};

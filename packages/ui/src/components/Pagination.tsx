'use client';

import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex h-8 w-8 items-center justify-center rounded-XS text-body-s2 transition-colors',
  {
    variants: {
      variant: {
        default:
          'hover:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent',
        selected: 'bg-yellow-300 font-bold text-black hover:bg-yellow-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  // Total number of pages
  totalPages: number;
  // Currently active page
  currentPage: number;
  // Function to call when the page changes
  onPageChange: (page: number) => void;
  // Loading state from TanStack Query's useQuery
  isPending?: boolean;
  // Placeholder data state from TanStack Query's useQuery
  isPlaceholderData?: boolean;
  // Maximum number of page number buttons to show
  maxVisiblePages?: number;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  isPending,
  isPlaceholderData,
  maxVisiblePages = 5,
  className,
  ...props
}: PaginationProps) => {
  // Handles page changes, ensuring they are within valid bounds
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Calculates the range of page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Disables all buttons when fetching new data for a better UX
  const isDisabled = isPending || isPlaceholderData;

  return (
    <nav
      className={cn(
        'flex items-center gap-2',
        { 'cursor-not-allowed opacity-50': isDisabled }, // Apply styles when disabled
        className,
      )}
      aria-label='Pagination'
      {...props}
    >
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1 || isDisabled}
        className={buttonVariants()}
        aria-label='Go to first page'
      >
        &laquo;
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isDisabled}
        className={buttonVariants()}
        aria-label='Go to previous page'
      >
        &lsaquo;
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={isDisabled}
          className={buttonVariants({
            variant: currentPage === page ? 'selected' : 'default',
          })}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isDisabled}
        className={buttonVariants()}
        aria-label='Go to next page'
      >
        &rsaquo;
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || isDisabled}
        className={buttonVariants()}
        aria-label='Go to last page'
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;

"use client";

import { ComponentProps, FC } from "react";
import clsx from "clsx";

type PaginationItem = number | "ellipsis";

interface PaginationProps extends ComponentProps<"nav"> {
  rowCount: number;
  pageSize: number;
  activePage?: number;
  onPageChange?: (page: number) => void;
}

const getTotalPages = (rowCount: number, pageSize: number) =>
  pageSize > 0 ? Math.ceil(rowCount / pageSize) : 0;

const getPageItems = (
  activePage: number,
  totalPages: number,
): PaginationItem[] => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PaginationItem[] = [1];

  if (activePage > 3) {
    items.push("ellipsis");
  }

  const start = Math.max(2, activePage - 1);
  const end = Math.min(totalPages - 1, activePage + 1);

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (activePage < totalPages - 2) {
    items.push("ellipsis");
  }

  items.push(totalPages);

  return items;
};

const ChevronLeft: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M7.5 15L12.5 10L7.5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Pagination: FC<PaginationProps> = ({
  rowCount,
  pageSize,
  activePage = 1,
  onPageChange,
  className,
  ...rest
}) => {
  const totalPages = getTotalPages(rowCount, pageSize);

  if (totalPages === 0) {
    return null;
  }

  const pageItems = getPageItems(activePage, totalPages);
  const canGoPrev = activePage > 1;
  const canGoNext = activePage < totalPages;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === activePage) {
      return;
    }

    onPageChange?.(page);
  };

  return (
    <nav
      {...rest}
      aria-label="Pagination"
      className={clsx(
        "inline-flex w-fit items-center gap-2 rounded-xl border border-muted-light bg-background px-4 py-2",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={!canGoPrev}
        onClick={() => handlePageChange(activePage - 1)}
        className={clsx(
          "inline-flex size-8 items-center justify-center rounded-lg text-foreground transition-colors",
          "hover:bg-secondary-main disabled:pointer-events-none disabled:opacity-40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light",
        )}
      >
        <ChevronLeft />
      </button>

      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="inline-flex size-8 items-center justify-center text-sm text-muted-main"
            aria-hidden
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === activePage ? "page" : undefined}
            onClick={() => handlePageChange(item)}
            className={clsx(
              "inline-flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light",
              item === activePage
                ? "bg-primary-main text-primary-foreground"
                : "text-foreground hover:bg-secondary-main",
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={!canGoNext}
        onClick={() => handlePageChange(activePage + 1)}
        className={clsx(
          "inline-flex size-8 items-center justify-center rounded-lg text-foreground transition-colors",
          "hover:bg-secondary-main disabled:pointer-events-none disabled:opacity-40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light",
        )}
      >
        <ChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;

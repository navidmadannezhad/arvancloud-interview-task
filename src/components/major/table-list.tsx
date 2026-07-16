"use client";

import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Table from "@/src/components/ui/table";
import { Pagination, Spinner } from "@/src/components/ui";

interface TableListPaginationProps {
  rowCount: number;
  pageSize: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

interface TableListProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  loading?: boolean;
  pagination?: TableListPaginationProps;
}

const TableLoadingOverlay = () => (
  <div
    className="absolute inset-0 z-10 flex items-center justify-center bg-background/60"
    aria-busy
    aria-label="Loading table data"
  >
    <Spinner />
  </div>
);

const TableList = <T,>({ columns, data, loading = false, pagination }: TableListProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col items-end gap-4">
      <div className="relative w-full">
        <Table table={table} />
        {loading && <TableLoadingOverlay />}
      </div>
      {pagination && (
        <Pagination
          rowCount={pagination.rowCount}
          pageSize={pagination.pageSize}
          activePage={pagination.activePage}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
};

export default TableList;

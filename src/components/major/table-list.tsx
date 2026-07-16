"use client";

import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Table from "@/src/components/ui/table";
import { Pagination } from "@/src/components/ui";

interface TableListPaginationProps {
  rowCount: number;
  pageSize: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

interface TableListProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  pagination?: TableListPaginationProps;
}

const TableList = <T,>({ columns, data, pagination }: TableListProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col items-end gap-4">
      <Table table={table} />
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

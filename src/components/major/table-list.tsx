"use client";

import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Table from "@/src/components/ui/table";

interface TableListProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
}

const TableList = <T,>({ columns, data }: TableListProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <Table table={table} />;
};

export default TableList;

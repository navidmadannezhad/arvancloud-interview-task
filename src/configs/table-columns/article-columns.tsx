import { ColumnDef, Row } from "@tanstack/react-table";
import { Article } from "@/src/types";
import OperationButtons from "@/src/components/major/operation-buttons";
import { useRouter } from "next/navigation";

const truncate = (value: string, maxLength = 60) =>
  value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;

const ArticleOperationButtons = ({ row }: { row: Row<Article> }) => {
  const router = useRouter();
  const handleNavigateToEdit = () => {
    router.push(`/articles/edit/${row.original.id}/`);
  }
  // const handleNavigateToDelete = () => {
  //   router.push(`/articles/${row.original.id}/delete`);
  // }

  return (
    <OperationButtons
        operationOptions={[
          { title: "Edit", onClick: handleNavigateToEdit },
          { title: "Delete", onClick: () => {} },
        ]}
      />
  )
}

export const articleColumns: ColumnDef<Article>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    id: "author",
    header: "Author",
    cell: ({ row }) => `@${row.original.userId}`,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ getValue }) => (getValue<string[]>() ?? []).join(", "),
  },
  {
    id: "excerpt",
    header: "Excerpt",
    cell: ({ row }) => truncate(row.original.body),
  },
  {
    id: "created",
    header: "Created",
    cell: () => null,
  },
  {
    id: "operations",
    header: "",
    cell: ({ row }) => <ArticleOperationButtons row={row} />,
  },
];

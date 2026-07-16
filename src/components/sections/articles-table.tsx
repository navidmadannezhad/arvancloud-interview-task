"use client";

import { FC, useState } from "react";
import TableList from "@/src/components/major/table-list";
import { articleColumns } from "@/src/configs/table-columns/article-columns";
import { Post } from "@/src/types";
import { Card, Pagination } from "@/src/components/ui";

interface ArticlesSectionProps {}

const ArticlesSection: FC<ArticlesSectionProps> = (_props) => {
  const data: Post[] = [];
  const [page, setPage] = useState(1);

  return (
    <Card title="All Posts">
      <Pagination rowCount={20} pageSize={2} activePage={page} onPageChange={(v) => setPage(v)} />
      <TableList<Post> columns={articleColumns} data={data} />
    </Card>
  );
};

export default ArticlesSection;

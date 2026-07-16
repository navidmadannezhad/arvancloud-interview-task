"use client";

import { FC } from "react";
import TableList from "@/src/components/major/table-list";
import { articleColumns } from "@/src/configs/table-columns/article-columns";
import { Post } from "@/src/types";
import { Card } from "@/src/components/ui";

interface ArticlesSectionProps {}

const ArticlesSection: FC<ArticlesSectionProps> = (_props) => {
  const data: Post[] = [];
  return (
    <Card title="All Posts">
      <TableList<Post> columns={articleColumns} data={data} />
    </Card>
  );
};

export default ArticlesSection;

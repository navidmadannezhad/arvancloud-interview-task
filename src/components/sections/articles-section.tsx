"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import TableList from "@/src/components/major/table-list";
import { articleColumns } from "@/src/configs/table-columns/article-columns";
import { Article } from "@/src/types";
import { Card } from "@/src/components/ui";
import { useArticlesList } from "@/src/hooks/article/useArticlesList";
import { useAuthenticatedUser } from "@/src/hooks";
import { DEFAULT_PAGINATION } from "@/src/configs/constants";

interface ArticlesSectionProps {
  page: number;
}

const ArticlesSection: FC<ArticlesSectionProps> = ({ page }) => {
  const router = useRouter();
  const { authUserData, authUserDataIsPending } = useAuthenticatedUser();
  const { articles, articlesLoading, articlesError } = useArticlesList(
    authUserData?.id,
    { page, pageSize: DEFAULT_PAGINATION.pageSize },
  );

  const handlePageChange = (nextPage: number) => {
    router.push(nextPage === 1 ? "/articles" : `/articles/page/${nextPage}`);
  };

  const isLoading = authUserDataIsPending || articlesLoading;
  const posts = articles?.posts ?? [];

  return (
    <Card title="All Posts">
      {articlesError ? (
        <p>Failed to load posts.</p>
      ) : (
        <TableList<Article>
          columns={articleColumns}
          data={posts}
          loading={isLoading}
          pagination={{
            rowCount: articles?.total ?? 0,
            pageSize: DEFAULT_PAGINATION.pageSize,
            activePage: page,
            onPageChange: handlePageChange,
          }}
        />
      )}
    </Card>
  );
};

export default ArticlesSection;

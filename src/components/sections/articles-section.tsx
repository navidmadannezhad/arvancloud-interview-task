"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import TableList from "@/src/components/major/table-list";
import { articleColumns } from "@/src/configs/table-columns/article-columns";
import { Post } from "@/src/types";
import { Card, Spinner } from "@/src/components/ui";
import { useBlogPostsList } from "@/src/hooks/blogpost/useBlogPostsList";
import { useAuthenticatedUser } from "@/src/hooks";
import { DEFAULT_PAGINATION } from "@/src/configs/constants";

interface ArticlesSectionProps {
  page: number;
}

const ArticlesSection: FC<ArticlesSectionProps> = ({ page }) => {
  const router = useRouter();
  const { authUserData, authUserDataIsPending } = useAuthenticatedUser();
  const { blogPosts, blogPostsLoading, blogPostsError } = useBlogPostsList(
    authUserData?.id ?? 0,
    { page, pageSize: DEFAULT_PAGINATION.pageSize },
  );

  const handlePageChange = (nextPage: number) => {
    router.push(nextPage === 1 ? "/articles" : `/articles/page/${nextPage}`);
  };

  const isLoading = authUserDataIsPending || blogPostsLoading;
  const posts = blogPosts?.posts ?? [];

  return (
    <Card title="All Posts">
      {isLoading ? (
        <Spinner />
      ) : blogPostsError ? (
        <p>Failed to load posts.</p>
      ) : (
        <TableList<Post>
          columns={articleColumns}
          data={posts}
          pagination={{
            rowCount: blogPosts?.total ?? 0,
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

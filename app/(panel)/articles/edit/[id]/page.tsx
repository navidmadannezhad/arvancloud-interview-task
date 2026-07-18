import { Suspense } from "react";
import ArticleForm from "@/src/components/article/article-form";
import { Spinner } from "@/src/components/ui";

interface ArticleEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticleEdit({ params }: ArticleEditPageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-48 items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ArticleForm articleID={parseInt(id)} />
    </Suspense>
  );
}

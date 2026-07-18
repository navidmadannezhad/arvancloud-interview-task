import { Suspense } from "react";
import ArticleForm from "@/src/components/article/article-form";
import { Spinner } from "@/src/components/ui";

export default function ArticlesCreate() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-48 items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ArticleForm />
    </Suspense>
  );
}

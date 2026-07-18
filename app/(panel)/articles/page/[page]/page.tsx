import { redirect } from "next/navigation";
import { ArticlesSection } from "@/src/components/article";

interface ArticlesPaginatedPageProps {
  params: Promise<{ page: string }>;
}

export default async function ArticlesPaginatedPage({
  params,
}: ArticlesPaginatedPageProps) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber === 1) {
    redirect("/articles");
  }

  return <ArticlesSection page={pageNumber} />;
}

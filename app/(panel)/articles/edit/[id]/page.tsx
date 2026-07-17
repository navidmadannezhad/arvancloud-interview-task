import ArticleForm from "@/src/components/sections/article-form";

interface ArticleEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticleEdit({ params }: ArticleEditPageProps) {
  const { id } = await params
  return <ArticleForm articleID={parseInt(id)} />;
}

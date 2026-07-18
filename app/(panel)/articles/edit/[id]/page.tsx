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


// TODO - find a way to overcome race condition for /me endpoint
// TODO - check audit
// TODO - configure cache
// TODO - check audit
// TODO - check memory usage
// TODO - set build strategy (standalone and etc)
// TODO - dockerize
// TODO - 404 if article does not exist in edit
// TODO - develop log out with little expiry time

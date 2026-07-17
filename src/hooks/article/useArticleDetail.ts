import { useGetArticleByIDQuery } from "@/src/services/api/article-services";

const useArticleDetail = (articleID?: number) => {
    const { data, isLoading, error } = useGetArticleByIDQuery({ articleID });
    return {
        article: data,
        articleLoading: isLoading,
        articleError: error
    }
}

export { useArticleDetail };
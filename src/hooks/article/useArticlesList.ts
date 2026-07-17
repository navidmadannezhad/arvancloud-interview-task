import { useGetArticlesByUserIDQuery } from "@/src/services/api/article-services";
import { QueryParams } from "@/src/services/api/http-client";

const useArticlesList = (userID: number, queryParams: QueryParams) => {
    const { data, isLoading, error } = useGetArticlesByUserIDQuery({ userID, queryParams });
    return {
        articles: data,
        articlesLoading: isLoading,
        articlesError: error
    }
}

export { useArticlesList };
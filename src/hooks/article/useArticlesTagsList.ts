import { useGetArticleTagsQuery } from "@/src/services/api/article-services";
import { QueryParams } from "@/src/services/api/http-client";

const useArticlesTagsList = (queryParams: QueryParams = {}) => {
    const { data, isLoading, error } = useGetArticleTagsQuery({ queryParams });
    return {
        tags: data,
        tagsLoading: isLoading,
        tagsError: error
    }
}

export { useArticlesTagsList };
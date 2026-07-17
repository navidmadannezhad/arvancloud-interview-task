import { useGetPostTagsQuery } from "@/src/services/api/blogpost-services";
import { QueryParams } from "@/src/services/api/http-client";

const useBlogPostsTagsList = (queryParams: QueryParams = {}) => {
    const { data, isLoading, error } = useGetPostTagsQuery(queryParams);
    return {
        blogPosts: data,
        blogPostsLoading: isLoading,
        blogPostsError: error
    }
}

export { useBlogPostsTagsList };
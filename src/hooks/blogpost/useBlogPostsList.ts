import { useGetPostsByUserIDQuery } from "@/src/services/api/blogpost-services";
import { QueryParams } from "@/src/services/api/http-client";

const useBlogPostsList = (userID: number, queryParams: QueryParams) => {
    const { data, isLoading, error } = useGetPostsByUserIDQuery(userID, queryParams);
    return {
        blogPosts: data,
        blogPostsLoading: isLoading,
        blogPostsError: error
    }
}

export { useBlogPostsList };
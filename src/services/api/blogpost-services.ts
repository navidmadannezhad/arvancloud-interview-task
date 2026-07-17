import { useQuery } from "@tanstack/react-query";
import httpClient, { QueryParams } from "./http-client";
import { GetPostsByUserIDResponse, GetPostTagsResponse } from "@/src/types";
import { getParametrizedUrl } from "@/src/utils/api-utils";

const getPostsByUserID = async (userID: number, queryParams: QueryParams) => {
    const url = getParametrizedUrl(`/api/posts/user/${userID}`, queryParams);
    const response = await httpClient<GetPostsByUserIDResponse>({
        url: url,
        options:{
            method: "GET",
        }
    });
    return response;
}
const getPostsByUserIDQueryOptions = (userID: number, queryParams: QueryParams) => ({
    queryFn: () => getPostsByUserID(userID, queryParams), 
    queryKey: [`getPostsByUserID-${userID}`, queryParams],
})
export const useGetPostsByUserIDQuery = (userID: number, queryParams: QueryParams) => useQuery({
    ...getPostsByUserIDQueryOptions(userID, queryParams),
    enabled: !!userID,
});

const getPostTags = async (queryParams: QueryParams) => {
    const url = getParametrizedUrl("/api/posts/tags", queryParams);
    const response = await httpClient<GetPostTagsResponse>({
        url: url,
        options:{
            method: "GET",
        }
    });
    return response;
}
const getPostTagsQueryOptions = (queryParams: QueryParams) => ({
    queryFn: () => getPostTags(queryParams), 
    queryKey: [`getPostTags`, queryParams],
})
export const useGetPostTagsQuery = (queryParams: QueryParams) => useQuery({
    ...getPostTagsQueryOptions(queryParams),
});
import { useQuery } from "@tanstack/react-query";
import httpClient, { QueryParams } from "./http-client";
import { GetPostsByUserIDResponse } from "@/src/types";
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
export const useGetPostsByUserIDQuery = (userID: number, queryParams: QueryParams) => useQuery(
    getPostsByUserIDQueryOptions(userID, queryParams)
);
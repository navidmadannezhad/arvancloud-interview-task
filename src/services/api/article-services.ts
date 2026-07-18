import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient, { ApiError, QueryParams } from "./http-client";
import { CreateArticleRequestBody, GetArticlesByUserIDResponse, GetArticleTagsResponse, CreateArticleResponse, UpdateArticleByIDRequestBody, UpdateArticleByIDResponse, DeleteArticleByIDResponse, Article } from "@/src/types";
import { getParametrizedUrl } from "@/src/utils/api-utils";

interface GetArticlesByUserIDPayload {
    userID: number;
    queryParams: QueryParams;
}
const getArticlesByUserID = async (payload: GetArticlesByUserIDPayload) => {
    console.log("here")
    console.log([`getArticlesByUserID-${payload?.userID}`, payload?.queryParams])
    const url = getParametrizedUrl(`/api/posts/user/${payload?.userID}`, payload?.queryParams);
    const response = await httpClient<GetArticlesByUserIDResponse>({
        url: url,
        options:{
            method: "GET",
        }
    });
    return response;
}
const getArticlesByUserIDQueryOptions = (payload: GetArticlesByUserIDPayload) => ({
    queryFn: () => getArticlesByUserID(payload), 
    queryKey: [`getArticlesByUserID-${payload?.userID}`, payload?.queryParams],
})
export const useGetArticlesByUserIDQuery = (payload: GetArticlesByUserIDPayload) => useQuery({
    ...getArticlesByUserIDQueryOptions(payload),
    enabled: !!payload?.userID,
});


interface GetArticleByIDPayload {
    articleID?: number;
}
const getArticleByID = async (payload: GetArticleByIDPayload) => {
    const url = getParametrizedUrl(`/api/posts/${payload?.articleID}`, {});
    const response = await httpClient<Article>({
        url: url,
        options:{
            method: "GET",
        }
    });
    return response;
}
const getArticleByIDQueryOptions = (payload: GetArticleByIDPayload) => ({
    queryFn: () => getArticleByID(payload), 
    queryKey: [`getArticleByID-${payload?.articleID}`],
    retry: (_: any, error: ApiError) => {
        if(error?.status === 404) return false;
        return true;
    }
})
export const useGetArticleByIDQuery = (payload: GetArticleByIDPayload) => useQuery<Article, ApiError>({
    ...getArticleByIDQueryOptions(payload),
    enabled: !!payload?.articleID,
});


interface GetArticleTagsPayload {
    queryParams: QueryParams;
}
const getArticleTags = async (payload: GetArticleTagsPayload) => {
    const url = getParametrizedUrl("/api/posts/tags", payload?.queryParams);
    const response = await httpClient<GetArticleTagsResponse>({
        url: url,
        options:{
            method: "GET",
        }
    });
    return response;
}
const getArticleTagsQueryOptions = (payload: GetArticleTagsPayload) => ({
    queryFn: () => getArticleTags(payload), 
    queryKey: [`getArticleTags`, payload?.queryParams],
})
export const useGetArticleTagsQuery = (payload: GetArticleTagsPayload) => useQuery<GetArticleTagsResponse, ApiError>({
    ...getArticleTagsQueryOptions(payload),
    enabled: !!payload?.queryParams,
});


interface CreateArticlePayload {
    data: CreateArticleRequestBody;
}
const createArticle = async (payload: CreateArticlePayload) => {
    const response = await httpClient<CreateArticleResponse>({
        url: "/api/posts/add",
        options:{
            method: "POST",
            body: JSON.stringify(payload.data),
        }
    });
    return response;
}
const createArticleMutationOptions = {
    mutationFn: createArticle,
    mutationKey: ["createArticle"],
}
export const useCreateArticleMutation = () => useMutation<CreateArticleResponse, ApiError, CreateArticlePayload>(createArticleMutationOptions);


interface updateArticleByIDPayload {
    articleID: number;
    data: UpdateArticleByIDRequestBody;
}
const updateArticleByID = async (payload: updateArticleByIDPayload) => {
    const response = await httpClient<UpdateArticleByIDResponse>({
        url: `/api/posts/${payload.articleID}`,
        options:{
            method: "PUT",
            body: JSON.stringify(payload.data),
        }
    });
    return response;
}
const updateArticleByIDMutationOptions = { 
    mutationFn: updateArticleByID,
    mutationKey: [`updateArticleByID`],
}
export const useUpdateArticleByIDMutation = () => useMutation<UpdateArticleByIDResponse, ApiError, updateArticleByIDPayload>(updateArticleByIDMutationOptions);

interface DeleteArticleByIDPayload   {
    articleID: number;
}
const deleteArticleByID = async (payload: DeleteArticleByIDPayload) => {
    const response = await httpClient<DeleteArticleByIDResponse>({
        url: `/api/posts/${payload.articleID}`,
        options:{
            method: "DELETE",
        }
    });
    return response;
}
const deleteArticleByIDMutationOptions = { 
    mutationFn: deleteArticleByID,
    mutationKey: [`deleteArticleByID`],
}
export const useDeleteArticleByIDMutation = () => useMutation<DeleteArticleByIDResponse, ApiError, DeleteArticleByIDPayload>(deleteArticleByIDMutationOptions);
import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient, { ApiError } from "./http-client";
import {
    GetAuthUserResponse,
    LoginResponse,
    LoginUserRequestBody,
} from "@/src/types";

const login = async (data: LoginUserRequestBody) => {
    const response = await httpClient<LoginResponse>({
        url: "/api/auth/login",
        options:{
            method: "POST",
            body: JSON.stringify(data),
        }
    });
    return response;
}
const loginMutationOptions = {
    mutationFn: login,
    mutationKey: ["login"],
}
export const useLoginMutation = () => useMutation<LoginResponse, ApiError, LoginUserRequestBody>(loginMutationOptions);

const getUserData = async () => {
    const response = await httpClient<GetAuthUserResponse>({
        url: "/api/auth/me",
        options:{
            method: "GET",
        }
    });
    return response;
}
export const getUserDataQueryOptions = {
    queryFn: getUserData,
    queryKey: ['getUserData'] as const,
}
export const useGetUserDataQuery = () => useQuery<GetAuthUserResponse, ApiError>({
    ...getUserDataQueryOptions,
    retry: false,
    refetchOnWindowFocus: false,
});
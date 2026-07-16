import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "./http-client";
import { GetAuthUserResponse, LoginUserRequestBody } from "@/src/types";

const login = async (data: LoginUserRequestBody) => {
    const response = await httpClient({
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
export const useLoginMutation = () => useMutation(loginMutationOptions);

const getUserData = async () => {
    const response = await httpClient<GetAuthUserResponse>({
        url: "/api/auth/me",
        options:{
            method: "GET",
        }
    });
    return response;
}
const getUserDataQueryOptions = {
    queryFn: getUserData,
    queryKey: ['getUserData'],
}
export const useGetUserDataQuery = () => useQuery(getUserDataQueryOptions);
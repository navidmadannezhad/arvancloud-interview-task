import { useMutation } from "@tanstack/react-query";
import httpClient from "./http-client";
import { LoginUserRequestBody } from "@/src/types";

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
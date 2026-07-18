import { useMutation } from "@tanstack/react-query";
import httpClient from "./http-client";
import { CreateUserRequestBody, RegisterUserResponse } from "@/src/types";

const createUser = async (data: CreateUserRequestBody) => {
    const response = await httpClient<RegisterUserResponse>({
        url: "/api/users/add",
        options:{
            method: "POST",
            body: JSON.stringify(data),
        }
    });
    return response;
}
const createUserMutationOptions = {
    mutationFn: createUser, 
    mutationKey: ["createUser"],
}
export const useCreateUserMutation = () => useMutation(createUserMutationOptions);
import { useMutation } from "@tanstack/react-query";
import httpClient from "./http-client";
import { CreateUserRequestBody } from "@/src/types";

const createUser = async (data: CreateUserRequestBody) => {
    const response = await httpClient({
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
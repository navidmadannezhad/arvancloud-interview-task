import { object, string, number, array } from 'yup'
import { LoginUserRequestBody, CreateUserRequestBody, CreateArticleRequestBody } from '@/src/types';

export const loginSchema = object<LoginUserRequestBody>({
    username: string().required("Username is required"),
    password: string().min(8, "Password must be at least 8 characters").required("Password is required"),
    expiresInMins: number().optional(),
});

export const registerSchema = object<CreateUserRequestBody>({
    username: string().required("Username is required"),
    email: string().email("Invalid email address").required("Email is required"),
    password: string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export const articleSchema = object<CreateArticleRequestBody>({
    title: string().required("Username is required"),
    body: string().required("Body is required"),
    tags: array(string()).required("Tags are required"),
});
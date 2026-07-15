import { object, string } from 'yup'
import { LoginUserRequestBody, RegisterUserRequestBody } from '@/src/types';

export const loginSchema = object<LoginUserRequestBody>({
    username: string().required("Username is required"),
    password: string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export const registerSchema = object<RegisterUserRequestBody>({
    username: string().required("Username is required"),
    email: string().email("Invalid email address").required("Email is required"),
    password: string().min(8, "Password must be at least 8 characters").required("Password is required"),
});
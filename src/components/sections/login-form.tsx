"use client"

import { FC } from "react";
import { Button, Card } from "@/src/components/ui";
import { FormRawInput } from "@/src/components/major/form";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/configs/validators";
import { InferType } from "yup";

interface LoginFormProps{}
type FormValues = InferType<typeof loginSchema>;

const LoginForm: FC<LoginFormProps> = () => {
    const formContext = useForm<FormValues>({
        resolver: yupResolver(loginSchema),
    });

    const handleSubmit = (data: FormValues) => {
        console.log(data);
    }

    return (
        <Card title="Sign in" className="w-11/12 max-w-sm">
            <FormProvider { ...formContext }>
                <form 
                    className="flex flex-col gap-4" 
                    onSubmit={formContext.handleSubmit(handleSubmit)}
                >
                    <FormRawInput
                        name="username"
                        label="Username"
                        placeholder="Enter your username"
                    />
                    <FormRawInput
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <div className="flex flex-col gap-2">
                        <Button variant="primary" type="submit">Sign in</Button>
                        <p className="text-center text-sm">
                            Don't have an account? <Link href="/register" className="text-primary-main font-bold">Sign up now</Link>
                        </p>
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}

export default LoginForm;

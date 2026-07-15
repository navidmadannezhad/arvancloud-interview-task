"use client"

import { FC } from "react";
import { Button, Card } from "@/src/components/ui";
import { FormRawInput } from "@/src/components/major/form";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/src/configs/validators";
import { InferType } from "yup";

interface RegisterFormProps{}
type FormValues = InferType<typeof registerSchema>;

const RegisterForm: FC<RegisterFormProps> = () => {
    const formContext = useForm<FormValues>({
        resolver: yupResolver(registerSchema),
    });

    const handleSubmit = (data: FormValues) => {
        console.log(data);
    }

    return (
        <Card title="Sign up" className="w-11/12 max-w-sm">
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
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <FormRawInput
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <div className="flex flex-col gap-2">
                        <Button variant="primary" type="submit">Sign up</Button>
                        <p className="text-center text-sm">
                            Have an account? <Link href="/login" className="text-primary-main font-bold">Sign in</Link>
                        </p>
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}

export default RegisterForm;

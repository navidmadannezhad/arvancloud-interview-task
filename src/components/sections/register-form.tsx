"use client"

import { FC } from "react";
import { Button, Card } from "@/src/components/ui";
import { FormRawInput } from "@/src/components/major/form";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/src/configs/validators";
import { InferType } from "yup";
import { useAuth, useToaster } from "@/src/hooks";
import { useRouter } from "next/navigation";
import usePermenantStore from "@/src/services/store/permenant-store";
import { CreateUserRequestBody } from "@/src/types";

interface RegisterFormProps{}

const RegisterForm: FC<RegisterFormProps> = () => {
    const router = useRouter();
    const { setPermenantAuth } = usePermenantStore();
    const formContext = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    });
    const { showSuccessToast, showFailureToast } = useToaster();
    const {
        registerTrigger
    } = useAuth()
    
    const handleSubmit = (data: CreateUserRequestBody) => {
        registerTrigger.mutate(data, {
            onSuccess: () => {
                showSuccessToast({
                    title: "Register successful",
                    description: "You may login now...",
                });

                if(!data.username || !data.password) return;
                setPermenantAuth({
                    loginUsername: data.username,
                    loginPassword: data.password,
                });

                router.push("/login")
            }, 
            onError: () => {
                showFailureToast({
                    title: "Register failed",
                });
            },
        })
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
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <FormRawInput
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <div className="flex flex-col gap-2">
                        <Button loading={registerTrigger.isPending} variant="primary" type="submit">Sign up</Button>
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

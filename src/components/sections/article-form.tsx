"use client"

import { FC } from "react";
import { Button, Card } from "@/src/components/ui";
import { FormRawInput, FormTagsList, FormTextarea } from "@/src/components/major/form";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/configs/validators";
import { useAuth, useToaster } from "@/src/hooks";
import { useRouter } from "next/navigation";
import usePermenantStore from "@/src/services/store/permenant-store";
import { LoginUserRequestBody } from "@/src/types";

interface ArticleFormProps{}

const ArticleForm: FC<ArticleFormProps> = () => {
    const router = useRouter();
    const { auth } = usePermenantStore();
    const formContext = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            username: auth.loginUsername ?? "",
            password: auth.loginPassword ?? "",
        },
    });
    const { showSuccessToast, showFailureToast } = useToaster();
    const {
        loginTrigger
    } = useAuth()
    
    const handleSubmit = (data: Partial<LoginUserRequestBody>) => {
        // WIP -- we got type problem here
        loginTrigger.mutate(data as LoginUserRequestBody, {
            onSuccess: () => {
                showSuccessToast({
                    title: "Login successful",
                    description: "You are now logged in",
                });
                router.push("/articles")
            }, 
            onError: () => {
                showFailureToast({
                    title: "Login failed",
                    description: "Invalid username or password",
                });
            },
        })
    }
    // WIP -- sort tags alphabetically
    return (
        <FormProvider { ...formContext }>
            <form 
                className="flex gap-4" 
                onSubmit={formContext.handleSubmit(handleSubmit)}
            >
                
                <div className="flex-[0.7]">
                    <Card title="New Article">
                        <FormRawInput 
                            name="title" 
                            label="Title" 
                            placeholder="Enter your title" 
                        />
                        <FormRawInput 
                            name="Description" 
                            label="Description" 
                            placeholder="Enter your description" 
                        />
                        <FormTextarea 
                            name="body" 
                            label="Body"
                        />
                        <Button 
                            loading={loginTrigger.isPending} 
                            variant="primary" 
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Card>
                </div>

                <div className="flex-[0.3]">
                    <Card>
                        <FormTagsList 
                            name="tags" 
                            label="Tags" 
                        />
                    </Card>
                </div>
            </form>
        </FormProvider>
    )
}

export default ArticleForm;

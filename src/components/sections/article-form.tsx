"use client"

import { FC, useEffect, useState } from "react";
import { Button, Card } from "@/src/components/ui";
import { FormRawInput, FormTagsList, FormTextarea } from "@/src/components/major/form";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { articleSchema } from "@/src/configs/validators";
import { useArticleDetail, useAuthenticatedUser, useToaster } from "@/src/hooks";
import { useRouter } from "next/navigation";
import { CreateArticleRequestBody, LoginUserRequestBody, UpdateArticleByIDRequestBody } from "@/src/types";
import { useArticleActions } from "@/src/hooks/article/useArticleActions";
import { getQueryClient } from "@/src/configs/queryClient";

interface ArticleFormProps{
    articleID?: number;
}

const ArticleForm: FC<ArticleFormProps> = ({ articleID }) => {
    const editMode = !!articleID;
    const {
        authUserData
    } = useAuthenticatedUser();
    const {
        article: articleDetailResponse
    } = useArticleDetail(articleID);

    useEffect(() => {
        if (editMode && articleDetailResponse) {
            formContext.reset({
                title: articleDetailResponse.title ?? "",
                body: articleDetailResponse.body ?? "",
                tags: articleDetailResponse.tags ?? [],
                userId: articleDetailResponse.userId,
            })
        }
    }, [editMode, articleDetailResponse])

    const router = useRouter();
    const { 
        createArticleTrigger, 
        updateArticleByIDTrigger 
    } = useArticleActions();

    const queryClient = getQueryClient();
    const formContext = useForm<CreateArticleRequestBody | UpdateArticleByIDRequestBody>({
        resolver: yupResolver(articleSchema),
        defaultValues: {
            title: "",
            body: "",
            tags: [],
            userId: authUserData?.id,
        },
    });
    const { showSuccessToast, showFailureToast } = useToaster();
    
    const handleSubmit = (data: CreateArticleRequestBody | UpdateArticleByIDRequestBody) => {
        // WIP -- we got type problem here
        if (editMode) {
            handleUpdateArticle(data);
        } else {
            handleCreateArticle(data);
        }
        
    }

    const handleCreateArticle = (data: Partial<CreateArticleRequestBody>) => {
        createArticleTrigger.mutate({ data: data as CreateArticleRequestBody }, {
            onSuccess: () => {
                showSuccessToast({
                    title: "Article created successfully",
                });
                queryClient.invalidateQueries({ queryKey: ["getArticlesByUserID"] });
                router.push("/articles")
            },
            onError: () => {
                showFailureToast({
                    title: "Article creation failed",
                    description: "Please try again",
                });
            },
        })
    }

    const handleUpdateArticle = (data: Partial<UpdateArticleByIDRequestBody>) => {
        updateArticleByIDTrigger.mutate({ articleID: articleID ?? 0, data: data as UpdateArticleByIDRequestBody }, {
            onSuccess: () => {
                showSuccessToast({
                    title: "Article updated successfully",
                });
                queryClient.invalidateQueries({ queryKey: ["getArticlesByUserID"] });
                router.push("/articles")
            },
            onError: () => {
                showFailureToast({
                    title: "Article creation failed",
                    description: "Please try again",
                });
            },
        })
    }
    // WIP -- sort tags alphabetically
    return (
        <FormProvider { ...formContext }>
            <form 
                className="flex md:flex-row flex-col gap-4" 
                onSubmit={formContext.handleSubmit(handleSubmit)}
            >
                <div className="md:flex-[0.7] flex-1">
                    <Card contentClassName="flex flex-col gap-2" title="New Article">
                        <FormRawInput 
                            name="title" 
                            label="Title" 
                            placeholder="Enter your title" 
                        />
                        <FormRawInput 
                            name="description" 
                            label="Description" 
                            placeholder="Enter your description" 
                        />
                        <FormTextarea 
                            name="body" 
                            label="Body"
                            className="resize-none!"
                        />
                        <Button 
                            loading={
                                createArticleTrigger.isPending || updateArticleByIDTrigger.isPending
                            } 
                            variant="primary" 
                            className="w-fit"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Card>
                </div>

                <div className="md:flex-[0.3] flex-1">
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

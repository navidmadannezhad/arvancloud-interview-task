"use client"

import { FC, useEffect } from "react";
import { Button, Card, Spinner } from "@/src/components/ui";
import { FormRawInput, FormTagsList, FormTextarea } from "@/src/components/major/form";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { articleSchema } from "@/src/configs/validators";
import { useArticleDetail, useAuthenticatedUser } from "@/src/hooks";
import { useRouter } from "next/navigation";
import { CreateArticleRequestBody, UpdateArticleByIDRequestBody } from "@/src/types";
import { useArticleActions } from "@/src/hooks/article/useArticleActions";

interface ArticleFormProps {
  articleID?: number;
}

const ArticleForm: FC<ArticleFormProps> = ({ articleID }) => {
  const editMode = !!articleID;
  const router = useRouter();
  const { authUserData } = useAuthenticatedUser();
  const { article: articleDetailResponse } = useArticleDetail(articleID);
  const {
    createArticleTrigger,
    createArticleLoading,
    updateArticleByIDTrigger,
    updateArticleByIDLoading,
  } = useArticleActions({
    onCreateSuccess: () => router.push("/articles"),
    onCreateError: undefined,
    onUpdateSuccess: () => router.push("/articles"),
    onUpdateError: undefined,
    onDeleteSuccess: undefined,
    onDeleteError: undefined,
  
  });

  const formContext = useForm<CreateArticleRequestBody | UpdateArticleByIDRequestBody>({
    resolver: yupResolver(articleSchema),
    defaultValues: {
      title: "",
      body: "",
      tags: [],
      userId: authUserData?.id,
    },
  });

  useEffect(() => {
    if (editMode && articleDetailResponse) {
      formContext.reset({
        title: articleDetailResponse.title ?? "",
        body: articleDetailResponse.body ?? "",
        tags: articleDetailResponse.tags ?? [],
        userId: articleDetailResponse.userId,
      });
      return;
    }

    if (!editMode && authUserData?.id) {
      formContext.reset({
        title: "",
        body: "",
        tags: [],
        userId: authUserData.id,
      });
    }
  }, [editMode, articleDetailResponse, authUserData?.id, formContext]);

  if (!editMode && !authUserData?.id) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleSubmit = async (
    data: CreateArticleRequestBody | UpdateArticleByIDRequestBody,
  ) => {
    if (editMode && articleID) {
        await updateArticleByIDTrigger({
            articleID,
            data: data as UpdateArticleByIDRequestBody,
        });
    } else {
        await createArticleTrigger({ data: data as CreateArticleRequestBody });
    }
  };

  return (
    <FormProvider {...formContext}>
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
              loading={createArticleLoading || updateArticleByIDLoading}
              disabled={createArticleLoading || updateArticleByIDLoading}
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
            <FormTagsList name="tags" label="Tags" />
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

export default ArticleForm;

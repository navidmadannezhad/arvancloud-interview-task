import { useCreateArticleMutation, useDeleteArticleByIDMutation, useUpdateArticleByIDMutation } from "@/src/services/api/article-services";

const useArticleActions = () => {
    const createArticleTrigger = useCreateArticleMutation();
    const updateArticleByIDTrigger = useUpdateArticleByIDMutation();
    const deleteArticleByIDTrigger = useDeleteArticleByIDMutation();
    
    return {
        createArticleTrigger,
        updateArticleByIDTrigger,
        deleteArticleByIDTrigger,
    }
}

export { useArticleActions };
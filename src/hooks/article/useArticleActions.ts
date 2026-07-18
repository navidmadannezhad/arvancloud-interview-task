import { getQueryClient } from "@/src/configs/queryClient";
import { useCreateArticleMutation, useDeleteArticleByIDMutation, useUpdateArticleByIDMutation } from "@/src/services/api/article-services";
import { useParams, useSearchParams } from "next/navigation";
import { DEFAULT_PAGINATION } from "@/src/configs/constants";
import { useToaster } from "../ui/use-toaster";
import { ARTICLE_MESSAGES } from "@/src/configs/messages";
import { useAuthenticatedUser } from "../auth/useAuthenticatedUser";

interface UseArticleActionsProps {
    onCreateSuccess?: () => void;
    onCreateError?: (error: any) => void;
    onUpdateSuccess?: () => void;
    onUpdateError?: (error: any) => void;
    onDeleteSuccess?: () => void;
    onDeleteError?: (error: any) => void;
}

const useArticleActions = ({
    onCreateSuccess,
    onCreateError,
    onUpdateSuccess,
    onUpdateError,
    onDeleteSuccess,
    onDeleteError,
}: UseArticleActionsProps) => {
    const queryClient = getQueryClient();
    const { showSuccessToast, showFailureToast } = useToaster();
    const searchParams = useSearchParams();
    const params = useParams();
    const { authUserData } = useAuthenticatedUser();
    const createTrigger = useCreateArticleMutation();
    const updateTrigger = useUpdateArticleByIDMutation();
    const deleteTrigger = useDeleteArticleByIDMutation();

    const refetchArticleList = ({ mode }: { mode: "create" | "update" | "delete" }) => {
        let prevPage;

        if(mode === "delete") prevPage = params.id ?? 1;
        else prevPage = isNaN(Number(searchParams.get("fromPage"))) ? Number(searchParams.get("fromPage")) : 1

        queryClient.invalidateQueries({
            queryKey: [
                `getArticlesByUserID-${authUserData?.id}`,
                { page: prevPage, pageSize: DEFAULT_PAGINATION.pageSize }
            ] 
        })
    }
    
    const createArticleTrigger = async (...args: Parameters<typeof createTrigger.mutateAsync>) => {
        let response;
        try{
            response = await createTrigger.mutateAsync(...args);
            showSuccessToast({
                title: ARTICLE_MESSAGES.success.create,
            });
            refetchArticleList({ mode: "create" })
            onCreateSuccess?.();
        } catch (error: any) {
            showFailureToast({
                title: ARTICLE_MESSAGES.error.create,
                description: error?.message ?? ""
            });
            onCreateError?.(error as Error);
        }
        return response;
    }

    const updateArticleByIDTrigger = async (...args: Parameters<typeof updateTrigger.mutateAsync>) => {
        let response;
        try{
            response = await updateTrigger.mutateAsync(...args);
            showSuccessToast({
                title: ARTICLE_MESSAGES.success.update,
            });
            refetchArticleList({ mode: "update" })
            onUpdateSuccess?.();
        } catch (error: any) {
            showFailureToast({
                title: ARTICLE_MESSAGES.error.update,
                description: error?.message ?? ""
            });
            onUpdateError?.(error as Error);
        }
        return response;
    }

    const deleteArticleByIDTrigger = async (...args: Parameters<typeof deleteTrigger.mutateAsync>) => {
        let response;
        try{
            response = await deleteTrigger.mutateAsync(...args);
            showSuccessToast({
                title: ARTICLE_MESSAGES.success.delete,
            });
            refetchArticleList({ mode: "delete" })
            onDeleteSuccess?.();
        } catch (error: any) {
            showFailureToast({
                title: ARTICLE_MESSAGES.error.delete,
                description: error?.message ?? ""
            });
            onDeleteError?.(error as Error);
        }
        return response;
    }

    return {
        createArticleTrigger,
        createArticleLoading: createTrigger.isPending,
        updateArticleByIDTrigger,
        updateArticleByIDLoading: updateTrigger.isPending,
        deleteArticleByIDTrigger,
        deleteArticleByIDLoading: deleteTrigger.isPending,
    }
}

export { useArticleActions };
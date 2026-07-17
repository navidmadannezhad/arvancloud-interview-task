"use client";

import { FC } from "react";
import ModalWrapper from "./modal-wrapper";
import { useArticleActions } from "@/src/hooks/article/useArticleActions";
import { useAuthenticatedUser, useToaster } from "@/src/hooks";
import { getQueryClient } from "@/src/configs/queryClient";
import { useParams } from "next/navigation";
import { DEFAULT_PAGINATION } from "@/src/configs/constants";
import { ARTICLE_MESSAGES } from "@/src/configs/messages";

interface DeleteArticleModalProps {
  open: boolean;
  onClose: () => void;
  articleId?: number;
}

const DeleteArticleModal: FC<DeleteArticleModalProps> = ({ open, onClose, articleId }) => {
  const { deleteArticleByIDTrigger } = useArticleActions();
  const params = useParams();
  const { showSuccessToast, showFailureToast } = useToaster();
  const { authUserData } = useAuthenticatedUser();
  const queryClient = getQueryClient();

  const handleConfirm = () => {
    if (!articleId) {
      return;
    }

    deleteArticleByIDTrigger.mutate(
      { articleID: articleId },
      {
        onSuccess: () => {
          showSuccessToast({
            title: ARTICLE_MESSAGES.success.delete,
          });
          queryClient.invalidateQueries({ 
            queryKey: [`getArticlesByUserID-${authUserData?.id}`, { page: params.id ?? 1, pageSize: DEFAULT_PAGINATION.pageSize }] 
          });
          onClose();
        },
        onError: (error) => {
          showFailureToast({
            title: ARTICLE_MESSAGES.error.delete,
            description: error?.message ?? ""
          });
        },
      },
    );
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      variant="danger"
      title="Delete Article"
      onConfirm={handleConfirm}
      confirmLoading={deleteArticleByIDTrigger.isPending}
    >
      Are you sure you want to delete this article?
    </ModalWrapper>
  );
};

export default DeleteArticleModal;

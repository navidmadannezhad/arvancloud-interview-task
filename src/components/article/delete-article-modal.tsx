"use client";

import { FC } from "react";
import { ModalWrapper } from "@/src/components/major";
import { useArticleActions } from "@/src/hooks/article";

interface DeleteArticleModalProps {
  open: boolean;
  onClose: () => void;
  articleId?: number;
}

const DeleteArticleModal: FC<DeleteArticleModalProps> = ({ open, onClose, articleId }) => {
  const { 
    deleteArticleByIDTrigger,
    deleteArticleByIDLoading
  } = useArticleActions(
    { onDeleteSuccess: () => onClose() }
  );

  const handleConfirm = async () => {
    if (!articleId) {
      return;
    }
    await deleteArticleByIDTrigger({ articleID: articleId })
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      variant="danger"
      title="Delete Article"
      onConfirm={handleConfirm}
      confirmLoading={deleteArticleByIDLoading}
    >
      Are you sure you want to delete this article?
    </ModalWrapper>
  );
};

export default DeleteArticleModal;

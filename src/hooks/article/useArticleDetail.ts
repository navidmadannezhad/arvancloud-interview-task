import { useGetArticleByIDQuery } from "@/src/services/api/article-services";
import { notFound } from "next/navigation";

const useArticleDetail = (articleID?: number) => {
    const { data, isLoading, error } = useGetArticleByIDQuery({ articleID });

    if(error?.status === 404){
        notFound()
    }

    return {
        article: data,
        articleLoading: isLoading,
        articleError: error
    }
}

export { useArticleDetail };
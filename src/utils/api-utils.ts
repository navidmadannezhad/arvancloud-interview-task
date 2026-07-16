import { DEFAULT_PAGINATION } from "@/src/configs/constants";
import { QueryParams } from "@/src/services/api/http-client";

export const getParametrizedUrl = (url: string, params: QueryParams): string => {
  const [baseUrl, existingQuery] = url.split("?");
  const searchParams = new URLSearchParams(existingQuery);

  const { page, pageSize, ...rest } = params;

  if (pageSize != null) {
    searchParams.set("limit", String(pageSize));
  }

  if (page != null) {
    const limit =
      pageSize ??
      searchParams.get("limit") ??
      DEFAULT_PAGINATION.pageSize;

    searchParams.set("skip", String((Number(page) - 1) * Number(limit)));
  }

  Object.entries(rest).forEach(([key, value]) => {
    if (value != null) {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

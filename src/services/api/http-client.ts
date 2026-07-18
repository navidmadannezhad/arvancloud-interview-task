import {
    handleUnauthorizedSession,
    shouldSkipAuthRefresh,
    tryRefreshAccessToken,
    waitForPendingRefresh,
} from "@/src/utils/auth-utils";

export interface HttpClientArgs {
    url: string;
    options?: RequestInit;
    _isAuthRetry?: boolean;
}

export type QueryParamValue = string | number | boolean;
export type QueryParams = Record<string, QueryParamValue | undefined | null>;

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public code?: string,
        public data?: unknown,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

const interceptRequest = (args: HttpClientArgs) => {
    args.options = {
        ...args.options,
        credentials: "include",
        headers: {
            ...args.options?.headers,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    }
    return args;
}

const parseErrorResponse = async (response: Response) => {
    try {
        return await response.json();
    } catch {
        return {};
    }
};

const interceptResponse = async <T>(
    response: Response,
    args: HttpClientArgs,
): Promise<T> => {
    if (response.ok) {
        return response.json() as Promise<T>;
    }

    const status = response.status;
    const isClient = typeof window !== "undefined";
    const canAttemptRefresh =
        isClient &&
        status === 401 &&
        !args._isAuthRetry &&
        !shouldSkipAuthRefresh(args.url);

    if (canAttemptRefresh) {
        const refreshed = await tryRefreshAccessToken();

        if (refreshed) {
            return httpClient<T>({
                ...args,
                _isAuthRetry: true,
            });
        }

        await handleUnauthorizedSession();
    } else if (
        isClient &&
        status === 401 &&
        args._isAuthRetry &&
        !shouldSkipAuthRefresh(args.url)
    ) {
        const pendingRefresh = await waitForPendingRefresh();

        if (pendingRefresh === true) {
            return httpClient<T>({
                ...args,
                _isAuthRetry: true,
            });
        }

        await handleUnauthorizedSession();
    }

    const error = await parseErrorResponse(response);
    throw new ApiError(error?.message ?? "", status);
}

const pureFetch = fetch;
const httpClient = async <T, >(args: HttpClientArgs): Promise<T> => {
    const interceptedArgs = interceptRequest(args);
    const response = await pureFetch(
        interceptedArgs.url, 
        interceptedArgs.options
    );
    return interceptResponse<T>(response, args);
}

export default httpClient;

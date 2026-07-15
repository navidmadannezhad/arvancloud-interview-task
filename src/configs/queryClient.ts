import { QueryClient, environmentManager } from "@tanstack/react-query";

const makeQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
    if (environmentManager.isServer()) {
        return makeQueryClient()
    };
    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient()
    };
    return browserQueryClient;
}
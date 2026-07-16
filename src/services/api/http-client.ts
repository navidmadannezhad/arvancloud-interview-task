export interface HttpClientArgs {
    url: string;
    options?: RequestInit;
}

export type QueryParamValue = string | number | boolean;
export type QueryParams = Record<string, QueryParamValue | undefined | null>;

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

const interceptResponse = async <T>(response: Response): Promise<T> => {
    if(!response.ok)
        throw new Error(response.statusText);   
    const data = await response.json();
    return data;
}

const pureFetch = fetch;
const httpClient = async <T, >(args: HttpClientArgs): Promise<T> => {
    const interceptedArgs = interceptRequest(args);
    const response = await pureFetch(
        interceptedArgs.url, 
        interceptedArgs.options
    );
    const interceptedResponse = interceptResponse<T>(response);
    return interceptedResponse;
}

export default httpClient;
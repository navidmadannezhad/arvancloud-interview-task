interface HttpClientArgs {
    url: string;
    options?: {
        method: string;
        body?: BodyInit;
        headers?: HeadersInit;
        cache?: RequestCache;
    };
}

const httpClient = (args: HttpClientArgs) => {
    return fetch(args.url, {
        method: args.options?.method,
        body: args.options?.body,
        headers: args.options?.headers,
        cache: args.options?.cache,
    })
}

export default httpClient;
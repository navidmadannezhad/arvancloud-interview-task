export const getServerUrl = () => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    if (!serverUrl) {
        throw new Error("NEXT_PUBLIC_SERVER_URL is not set");
    }

    return serverUrl.replace(/\/$/, "");
};

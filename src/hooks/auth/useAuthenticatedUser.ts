import { 
    useGetUserDataQuery,
} from "@/src/services/api/auth-services"

const useAuthenticatedUser = () => {
    const { data, error, isPending } = useGetUserDataQuery();

    return {
        authUserData: data,
        authUserDataError: error,
        authUserDataIsPending: isPending,
    }
}

export { useAuthenticatedUser };
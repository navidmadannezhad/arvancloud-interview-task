import { 
    useLoginMutation 
} from "@/src/services/api/auth-services"
import { useCreateUserMutation } from "@/src/services/api/user-services";

const useAuth = () => {
    const loginTrigger = useLoginMutation();
    const registerTrigger = useCreateUserMutation();
    const logoutTrigger = () => {};

    return {
        registerTrigger,
        loginTrigger,
        logoutTrigger,
    }
}

export { useAuth };
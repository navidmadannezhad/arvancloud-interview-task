import { 
    useLoginMutation 
} from "@/src/services/api/auth-services"
import { useCreateUserMutation } from "@/src/services/api/user-services";
import { useRouter } from "next/navigation";

const useAuthActions = () => {
    const router = useRouter();

    const loginTrigger = useLoginMutation();
    const registerTrigger = useCreateUserMutation();
    const logoutTrigger = () => router.push("/login");

    return {
        registerTrigger,
        loginTrigger,
        logoutTrigger,
    }
}

export { useAuthActions };
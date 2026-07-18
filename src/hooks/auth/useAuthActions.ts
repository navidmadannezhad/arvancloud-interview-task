import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/src/services/api/auth-services";
import { useCreateUserMutation } from "@/src/services/api/user-services";
import { AUTH_MESSAGES } from "@/src/configs/messages";
import { useToaster } from "../ui/use-toaster";
import { LoginResponse, RegisterUserResponse } from "@/src/types";

interface UseAuthActionsProps {
  onLoginSuccess?: (loginResponse: LoginResponse) => void;
  onLoginError?: (error: any) => void;
  onRegisterSuccess?: (registerResponse: RegisterUserResponse) => void;
  onRegisterError?: (error: any) => void;
}

const useAuthActions = ({
  onLoginSuccess,
  onLoginError,
  onRegisterSuccess,
  onRegisterError,
}: UseAuthActionsProps = {}) => {
  const router = useRouter();
  const { showSuccessToast, showFailureToast } = useToaster();
  const loginMutation = useLoginMutation();
  const registerMutation = useCreateUserMutation();

  const loginTrigger = async (...args: Parameters<typeof loginMutation.mutateAsync>) => {
    let response;

    try {
      response = await loginMutation.mutateAsync(...args);
      showSuccessToast({
        title: AUTH_MESSAGES.success.login,
        description: "You are now logged in",
      });
      onLoginSuccess?.(response);
    } catch (error: any) {
      showFailureToast({
        title: AUTH_MESSAGES.error.login,
        description: error?.message ?? "",
      });
      onLoginError?.(error as Error);
    }

    return response;
  };

  const registerTrigger = async (
    ...args: Parameters<typeof registerMutation.mutateAsync>
  ) => {
    let response;

    try {
      response = await registerMutation.mutateAsync(...args);
      showSuccessToast({
        title: AUTH_MESSAGES.success.register,
      });
      onRegisterSuccess?.(response);
    } catch (error: any) {
      showFailureToast({
        title: AUTH_MESSAGES.error.register,
        description: error?.message ?? "",
      });
      onRegisterError?.(error as Error);
    }

    return response;
  };

  const logoutTrigger = () => {
    router.push("/login");
  };

  return {
    loginTrigger,
    loginLoading: loginMutation.isPending,
    registerTrigger,
    registerLoading: registerMutation.isPending,
    logoutTrigger,
  };
};

export { useAuthActions };

import { useRouter } from "next/navigation";
import {
  getUserDataQueryOptions,
  useLoginMutation,
} from "@/src/services/api/auth-services";
import { useCreateUserMutation } from "@/src/services/api/user-services";
import { AUTH_MESSAGES } from "@/src/configs/messages";
import { getQueryClient } from "@/src/configs/queryClient";
import { clearAuthSession } from "@/src/utils/auth-utils";
import { useToaster } from "../ui/use-toaster";
import {
  GetAuthUserResponse,
  LoginResponse,
  RegisterUserResponse,
} from "@/src/types";
import { ApiError } from "@/src/services/api/http-client";

interface UseAuthActionsProps {
  onLoginSuccess?: (loginResponse: LoginResponse) => void;
  onLoginError?: (error: ApiError) => void;
  onRegisterSuccess?: (registerResponse: RegisterUserResponse) => void;
  onRegisterError?: (error: ApiError) => void;
}

const useAuthActions = ({
  onLoginSuccess,
  onLoginError,
  onRegisterSuccess,
  onRegisterError,
}: UseAuthActionsProps = {}) => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const { showSuccessToast, showFailureToast } = useToaster();
  const loginMutation = useLoginMutation();
  const registerMutation = useCreateUserMutation();

  const loginTrigger = async (...args: Parameters<typeof loginMutation.mutateAsync>) => {
    let response;

    try {
      response = await loginMutation.mutateAsync(...args);
      queryClient.setQueryData<GetAuthUserResponse>(
        getUserDataQueryOptions.queryKey,
        response as unknown as GetAuthUserResponse,
      );
      showSuccessToast({
        title: AUTH_MESSAGES.success.login,
        description: "You are now logged in",
      });
      onLoginSuccess?.(response);
    } catch (error: unknown) {
      showFailureToast({
        title: AUTH_MESSAGES.error.login,
        description: (error as ApiError)?.message ?? "",
      });
      onLoginError?.(error as ApiError);
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
    } catch (error: unknown) {
      showFailureToast({
        title: AUTH_MESSAGES.error.register,
        description: (error as ApiError)?.message ?? "",
      });
      onRegisterError?.(error as ApiError);
    }

    return response;
  };

  const logoutTrigger = async () => {
    await clearAuthSession();
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

"use client"

import { FC } from "react";
import { Button, Card } from "@/src/components/ui";
import { FormRawInput } from "@/src/components/major/form";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/configs/validators";
import { useAuthActions } from "@/src/hooks";
import { useRouter } from "next/navigation";
import usePermenantStore from "@/src/services/store/permenant-store";
import { LoginUserRequestBody } from "@/src/types";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const router = useRouter();
  const { auth } = usePermenantStore();
  const { loginTrigger, loginLoading } = useAuthActions({
    onLoginSuccess: () => router.push("/articles"),
  });

  const formContext = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: auth.loginUsername ?? "",
      password: auth.loginPassword ?? "",
    },
  });

  const handleSubmit = async (data: Partial<LoginUserRequestBody>) => {
    await loginTrigger(data as LoginUserRequestBody);
  };

  return (
    <Card title="Sign in" className="w-11/12 max-w-sm">
      <FormProvider {...formContext}>
        <form
          className="flex flex-col gap-4"
          onSubmit={formContext.handleSubmit(handleSubmit)}
        >
          <FormRawInput
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
          <FormRawInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <div className="flex flex-col gap-2">
            <Button loading={loginLoading} variant="primary" type="submit">
              Sign in
            </Button>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary-main font-bold">
                Sign up now
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default LoginForm;

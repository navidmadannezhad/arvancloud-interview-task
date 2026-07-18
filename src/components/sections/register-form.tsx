"use client"

import { FC } from "react";
import { Button, Card } from "@/src/components/ui";
import { FormRawInput } from "@/src/components/major/form";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/src/configs/validators";
import { useAuthActions } from "@/src/hooks";
import { useRouter } from "next/navigation";
import usePermenantStore from "@/src/services/store/permenant-store";
import { CreateUserRequestBody, RegisterUserResponse } from "@/src/types";

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = () => {
  const router = useRouter();
  const { setPermenantAuth } = usePermenantStore();

  const handleRegisterSuccess = (repsonse: RegisterUserResponse) => {
    router.push("/login");
    setPermenantAuth({
      loginUsername: repsonse.username,
      loginPassword: repsonse.password,
    });
  }
  
  const { registerTrigger, registerLoading } = useAuthActions({
    onRegisterSuccess: handleRegisterSuccess,
  });

  const formContext = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const handleSubmit = async (data: CreateUserRequestBody) => {
    await registerTrigger(data);
  };

  return (
    <Card title="Sign up" className="w-11/12 max-w-sm">
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
          />
          <FormRawInput
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <div className="flex flex-col gap-2">
            <Button loading={registerLoading} variant="primary" type="submit">
              Sign up
            </Button>
            <p className="text-center text-sm">
              Have an account?{" "}
              <Link href="/login" className="text-primary-main font-bold">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default RegisterForm;

import { Suspense } from "react";
import { LoginForm } from "@/src/components/auth";
import { Spinner } from "@/src/components/ui";

export default function Login() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Suspense
        fallback={
          <div className="flex min-h-48 items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}

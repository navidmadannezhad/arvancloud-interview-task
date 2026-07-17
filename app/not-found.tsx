"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex flex-col gap-2">
        <p className="text-5xl font-bold tracking-tight text-primary-main">404</p>
        <h1 className="text-lg font-semibold text-foreground">Page not found</h1>
        <p className="text-sm text-muted-main">
          The page or record you are looking for does not exist.
        </p>
      </div>
      <Button variant="primary" onClick={() => router.back()}>
        Go back
      </Button>
    </div>
  );
}

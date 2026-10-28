import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <main className="relative grid min-h-screen place-items-center px-4">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="glow pointer-events-none absolute inset-0" />
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}

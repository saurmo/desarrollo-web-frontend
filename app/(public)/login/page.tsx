'use client';
import { LoginFormView } from "@/src/features/login/components/LoginForm";
import { Loading } from "@/src/features/common/components/Loading";
import { LoginCredentials } from "@/src/features/login/domain/auth";
import { useAuth } from "@/src/features/login/hooks/useAuth";
import { useLoginForm } from "@/src/features/login/hooks/useLoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  // Invoking custom hooks at the top-level orchestration component
  const auth = useAuth();
  
  // Callback passed down to login form hook initializer
  const handleLoginSubmit = (credentials: LoginCredentials) => {
    auth.login(credentials);
  };

  const form = useLoginForm(handleLoginSubmit);
  const router = useRouter();

  // Con sesión (recién iniciada o guardada de antes) → al panel privado
  useEffect(() => {
    if (auth.isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [auth.isAuthenticated, router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-800 relative">
      {/* Background Decorative Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2001000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} 
      />

      {/* Main View Router - Conditional based on Hook state */}
      <main className="w-full flex justify-center z-10">
        {auth.isAuthenticated ? (
          <Loading message="Entrando al panel..." />
        ) : (
          <LoginFormView auth={auth} form={form} />
        )}
      </main>
    </div>
  );
}
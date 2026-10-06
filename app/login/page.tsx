'use client';
import { LoginFormView } from "@/src/features/login/components/LoginForm";
import { LoginLayout } from "@/src/features/login/components/LoginLayout";
import { LoginCredentials } from "@/src/features/login/domain/auth";
import { useAuth } from "@/src/features/login/hooks/useAuth";
import { useLoginForm } from "@/src/features/login/hooks/useLoginForm";
import { KeyRound } from "lucide-react";

export default function LoginPage() {
  // Invoking custom hooks at the top-level orchestration component
  const auth = useAuth();
  
  // Callback passed down to login form hook initializer
  const handleLoginSubmit = (credentials: LoginCredentials) => {
    auth.login(credentials);
  };

  const form = useLoginForm(handleLoginSubmit);

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-slate-800 relative">
      {/* Background Decorative Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2001000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} 
      />

      {/* App Header Badge */}
      <header className="mb-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold backdrop-blur-md mb-2">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Listings</span>
        </div>
      </header>

      {/* Main View Router - Conditional based on Hook state */}
      <main className="w-full flex justify-center z-10">
        {auth.isAuthenticated && auth.user ? (
          <LoginLayout user={auth.user} onLogout={auth.logout} />
        ) : (
          <LoginFormView auth={auth} form={form} />
        )}
      </main>

      {/* Footer credits */}
      <footer className="mt-8 text-center text-xs text-slate-500 z-10">
       Listings
      </footer>
    </div>
  );
}
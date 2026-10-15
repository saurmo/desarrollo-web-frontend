'use client';
import { RegisterFormView } from "@/src/features/register/components/RegisterForm";
import { useRegister } from "@/src/features/register/hooks/useRegister";
import { useRegisterForm } from "@/src/features/register/hooks/useRegisterForm";
import { KeyRound } from "lucide-react";

/**
 * Página /register.
 *
 * Aquí solo se conectan las piezas:
 *  1. useRegister maneja la petición al backend.
 *  2. useRegisterForm maneja los campos; cuando son válidos llama a registration.register.
 *  3. RegisterFormView dibuja todo con lo que le entregan los dos hooks.
 *
 * Es 'use client' porque usa hooks de React (useState), que solo existen en el navegador.
 */
export default function RegisterPage() {
  const registration = useRegister();
  const form = useRegisterForm(registration.register);

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-slate-800 relative">
      <header className="mb-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold backdrop-blur-md mb-2">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Listings</span>
        </div>
      </header>

      <main className="w-full flex justify-center z-10">
        <RegisterFormView registration={registration} form={form} />
      </main>

      <footer className="mt-8 text-center text-xs text-slate-500 z-10">
        Listings
      </footer>
    </div>
  );
}

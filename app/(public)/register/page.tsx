'use client';
import { RegisterFormView } from "@/src/features/register/components/RegisterForm";
import { useRegister } from "@/src/features/register/hooks/useRegister";
import { useRegisterForm } from "@/src/features/register/hooks/useRegisterForm";

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
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-800 relative">

      <main className="w-full flex justify-center z-10">
        <RegisterFormView registration={registration} form={form} />
      </main>
    </div>
  );
}

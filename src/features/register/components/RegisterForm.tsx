'use client';
import { ArrowRight, BadgeCheck, Eye, EyeOff, IdCard, Lock, Mail, Phone, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { Alert } from "../../common/components/Alert";
import { Button } from "../../common/components/Button";
import { Input } from "../../common/components/Input";
import { RoleSelect } from "./RoleSelect";
import { useRegister } from "../hooks/useRegister";
import { useRegisterForm } from "../hooks/useRegisterForm";

/**
 * Vista del formulario de registro.
 *
 * Este componente solo DIBUJA: no guarda estado ni llama a la API.
 * Todo lo que necesita le llega por props desde la página:
 *  - registration: estado de la petición (useRegister) → cargando, error, éxito.
 *  - form: estado del formulario (useRegisterForm) → valores, errores, manejadores.
 */
export function RegisterFormView({
  registration,
  form
}: {
  registration: ReturnType<typeof useRegister>;
  form: ReturnType<typeof useRegisterForm>;
}) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl shadow-emerald-900/10 border border-emerald-100/80 w-full max-w-2xl relative overflow-hidden">
      {/* Decorative Emerald Glow background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/30 mb-4 ring-4 ring-emerald-50">
          <UserPlus className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Crea tu cuenta</h2>
        <p className="text-sm text-slate-500 mt-1">Completa tus datos para registrarte</p>
      </div>

      {/* Error que devolvió el backend (por ejemplo, correo ya registrado) */}
      {registration.error && (
        <div className="mb-6">
          <Alert type="error" title="Error en el registro" message={registration.error} onClose={registration.clearError} />
        </div>
      )}

      {/* Mensaje de éxito: registeredName solo tiene valor después de un registro correcto */}
      {registration.registeredName && (
        <div className="mb-6">
          <Alert
            type="success"
            title="Registro exitoso"
            message={`¡Bienvenido, ${registration.registeredName}! Ya puedes iniciar sesión.`}
          />
        </div>
      )}

      {/* noValidate desactiva la validación del navegador: la hace useRegisterForm */}
      <form onSubmit={form.handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
        <Input
          label="Nombre completo"
          name="name"
          placeholder="Ana María Restrepo"
          value={form.values.name}
          onChange={form.handleChange}
          error={form.errors.name}
          icon={<User className="w-4 h-4" />}
          autoComplete="name"
        />

        <Input
          label="Identificación"
          name="identification"
          inputMode="numeric"
          placeholder="1037600101"
          value={form.values.identification}
          onChange={form.handleChange}
          error={form.errors.identification}
          icon={<IdCard className="w-4 h-4" />}
        />

        <RoleSelect value={form.values.role} onChange={form.handleChange} error={form.errors.role} />

        <Input
          label="Teléfono"
          name="phone"
          type="tel"
          placeholder="3001234567"
          value={form.values.phone}
          onChange={form.handleChange}
          error={form.errors.phone}
          icon={<Phone className="w-4 h-4" />}
          autoComplete="tel"
        />

        <Input
          label="Correo Electrónico"
          name="email"
          type="email"
          placeholder="usuario@udem.edu.co"
          value={form.values.email}
          onChange={form.handleChange}
          error={form.errors.email}
          icon={<Mail className="w-4 h-4" />}
          autoComplete="email"
        />

        <Input
          label="Contraseña"
          name="password"
          type={form.showPassword ? 'text' : 'password'}
          placeholder="••••••••••••"
          value={form.values.password}
          onChange={form.handleChange}
          error={form.errors.password}
          icon={<Lock className="w-4 h-4" />}
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={form.toggleShowPassword}
              className="text-slate-400 hover:text-emerald-700 transition-colors p-1"
              tabIndex={-1}
            >
              {form.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <p className="sm:col-span-2 text-xs text-slate-500 flex items-center gap-1.5 -mt-2">
          <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
          Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.
        </p>

        <Button type="submit" isLoading={registration.isLoading} className="sm:col-span-2 w-full py-3">
          <span className="flex items-center justify-center gap-2">
            Registrarme
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-emerald-700 font-semibold hover:underline">Inicia sesión</Link>
      </p>
    </div>
  );
}

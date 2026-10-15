'use client';
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { Alert } from "../../common/components/Alert";
import { Button } from "../../common/components/Button";
import { Input } from "../../common/components/Input";
import { useAuth } from "../hooks/useAuth";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginFormView({
  auth,
  form
}: {
  auth: ReturnType<typeof useAuth>;
  form: ReturnType<typeof useLoginForm>;
}) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl shadow-emerald-900/10 border border-emerald-100/80 w-full max-w-md relative overflow-hidden">
      {/* Decorative Emerald Glow background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/30 mb-4 ring-4 ring-emerald-50">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Bienvenido de nuevo</h2>
        <p className="text-sm text-slate-500 mt-1">Ingresa tus credenciales para acceder</p>
      </div>

      {/* Backend API Error display */}
      {auth.error && (
        <div className="mb-6">
          <Alert type="error" title="Error de autenticación" message={auth.error} onClose={auth.clearError} />
        </div>
      )}

      {/* Form using custom hooks handles */}
      <form onSubmit={form.handleSubmit} className="space-y-5" noValidate>
        <Input
          label="Correo Electrónico"
          name="email"
          type="email"
          placeholder="usuario@udem.edu.co"
          value={form.credentials.email}
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
          value={form.credentials.password}
          onChange={form.handleChange}
          error={form.errors.password}
          icon={<Lock className="w-4 h-4" />}
          autoComplete="current-password"
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

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
            <input type="checkbox" className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500/40 w-4 h-4" />
            <span>Recordarme</span>
          </label>
          <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-emerald-700 font-semibold hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <Button type="submit" isLoading={auth.isLoading} className="w-full mt-2 py-3">
          <span className="flex items-center justify-center gap-2">
            Iniciar Sesión
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>
      </form>
     
    </div>
  );
}
'use client';
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, RefreshCw, ShieldCheck } from "lucide-react";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useLoginForm } from "../hooks/useLoginForm";

export const Input = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & {
        label: string;
        error?: string;
        icon?: React.ReactNode;
        rightElement?: React.ReactNode;
    }
>(({ label, error, icon, rightElement, className = '', ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-emerald-950 uppercase tracking-wider flex items-center justify-between">
                {label}
            </label>
            <div className="relative flex items-center">
                {icon && (
                    <div className="absolute left-3.5 text-emerald-600/70 pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={`w-full py-2.5 ${icon ? 'pl-10' : 'pl-3.5'} ${rightElement ? 'pr-10' : 'pr-3.5'} bg-white text-slate-900 placeholder-slate-400 border text-sm rounded-xl transition-all duration-200 outline-none focus:ring-2 ${error
                            ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                            : 'border-emerald-200 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300'
                        } ${className}`}
                    {...props}
                />
                {rightElement && (
                    <div className="absolute right-3.5 flex items-center">
                        {rightElement}
                    </div>
                )}
            </div>
            {error && (
                <span className="text-xs font-medium text-red-600 flex items-center gap-1 animate-fadeIn mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error}
                </span>
            )}
        </div>
    );
});
Input.displayName = 'Input';

export function Button({
    children,
    isLoading,
    variant = 'primary',
    className = '',
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium text-sm rounded-xl px-4 py-2.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500/40 active:scale-[0.99]';

    const variants = {
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 border border-emerald-500/30',
        secondary: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-200/60',
        outline: 'border border-emerald-300 hover:border-emerald-500 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/50',
        ghost: 'text-emerald-700 hover:bg-emerald-100/60'
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} disabled={isLoading || props.disabled} {...props}>
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-current" />
                    <span>Procesando...</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
}

export function Alert({
    type = 'error',
    title,
    message,
    onClose
}: {
    type?: 'error' | 'success' | 'info';
    title?: string;
    message: string;
    onClose?: () => void;
}) {
    const styles = {
        error: 'bg-red-50 border-red-200 text-red-900 icon-text-red-600',
        success: 'bg-emerald-50 border-emerald-200 text-emerald-900 icon-text-emerald-600',
        info: 'bg-blue-50 border-blue-200 text-blue-900 icon-text-blue-600'
    };

    return (
        <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all animate-fadeIn ${styles[type]}`}>
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
                {title && <h5 className="font-semibold text-xs uppercase tracking-wider mb-0.5">{title}</h5>}
                <p className="text-slate-700 leading-relaxed">{message}</p>
            </div>
            {onClose && (
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1">
                    ✕
                </button>
            )}
        </div>
    );
}


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

      {/* Quick Demo Presets for Testing */}
      <div className="mt-8 pt-6 border-t border-emerald-100/80 text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Probador de Escenarios (Demo)</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => form.fillDemoCredentials('valid')}
            className="px-2 py-1.5 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-medium border border-emerald-200 transition-colors"
          >
            ✅ Éxito
          </button>
          <button
            type="button"
            onClick={() => form.fillDemoCredentials('invalid')}
            className="px-2 py-1.5 text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg font-medium border border-amber-200 transition-colors"
          >
            ⚠️ Inválido
          </button>
          <button
            type="button"
            onClick={() => form.fillDemoCredentials('serverError')}
            className="px-2 py-1.5 text-xs bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-lg font-medium border border-rose-200 transition-colors"
          >
            ❌ Error 500
          </button>
        </div>
      </div>
    </div>
  );
}
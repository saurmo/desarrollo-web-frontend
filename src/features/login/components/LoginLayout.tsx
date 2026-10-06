'use client';
import { CheckCircle2, Code2, Layers, LogOut, Server, Sparkles } from "lucide-react";
import { Button } from "./LoginForm";
import { User } from "../../users/domain/User";

export 
function LoginLayout({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl shadow-emerald-950/10 border border-emerald-100 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-emerald-100 gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-14 h-14 rounded-2xl object-cover ring-4 ring-emerald-100 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
              <span className="px-2.5 py-0.5 text-[10px] uppercase font-extrabold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                {user.role}
              </span>
            </div>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        <Button variant="outline" onClick={onLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>

      {/* Architecture Showcase */}
      <div className="mt-8 space-y-6">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between shadow-lg shadow-emerald-600/20">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-200 shrink-0" />
            <div>
              <h3 className="font-bold text-base">¡Autenticación con Arquitectura Limpia Exitosa!</h3>
              <p className="text-xs text-emerald-100">El token JWT ha sido almacenado en Cookie + LocalStorage mediante `tokenStorage`.</p>
            </div>
          </div>
        </div>

        {/* Clean Architecture Diagram */}
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 pt-2">
          <Layers className="w-4 h-4 text-emerald-600" />
          Estructura de Capas Ejecutadas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
              <Code2 className="w-4 h-4" />
              1. Domain
            </div>
            <p className="text-xs text-slate-600">Modelos `User`, `LoginCredentials` y `AuthToken`. Reglas del negocio puras sin librerías externas.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
              <Server className="w-4 h-4" />
              2. Infrastructure
            </div>
            <p className="text-xs text-slate-600">`authService.login()` realizando la llamada HTTP simulada y `tokenStorage` gestionando cookies/storage.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
              <Sparkles className="w-4 h-4" />
              3. Hooks & UI
            </div>
            <p className="text-xs text-slate-600">`useLoginForm` encapsula validaciones; `useAuth` maneja el estado global. La vista solo renderiza.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
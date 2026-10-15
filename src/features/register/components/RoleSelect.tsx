'use client';
import { AlertCircle, Users } from "lucide-react";
import { RegisterRole } from "../domain/register";

/**
 * Opciones del selector. El value es lo que se envía al backend;
 * el label es lo que ve el usuario.
 */
const ROLE_OPTIONS: { value: RegisterRole; label: string }[] = [
  { value: 'user', label: 'Usuario' },
  { value: 'owner', label: 'Propietario' }
];

interface RoleSelectProps {
  /** Rol seleccionado actualmente (viene del estado del formulario). */
  value: RegisterRole;
  /** Se llama cuando el usuario cambia la opción. */
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Mensaje de error del campo, si lo hay. */
  error?: string;
}

/**
 * Selector del rol del usuario, con el mismo estilo del componente Input.
 * El atributo name="role" es clave: el hook useRegisterForm lo usa para saber qué campo actualizar.
 */
export function RoleSelect({ value, onChange, error }: RoleSelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor="role" className="text-xs font-semibold text-emerald-950 uppercase tracking-wider">
        Rol
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-emerald-600/70 pointer-events-none">
          <Users className="w-4 h-4" />
        </div>
        <select
          id="role"
          name="role"
          value={value}
          onChange={onChange}
          className={`w-full py-2.5 pl-10 pr-3.5 bg-white text-slate-900 border text-sm rounded-xl transition-all duration-200 outline-none focus:ring-2 ${error
            ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
            : 'border-emerald-200 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300'
            }`}
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {error && (
        <span className="text-xs font-medium text-red-600 flex items-center gap-1 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </span>
      )}
    </div>
  );
}

'use client';
import { User, UserRole } from "../domain/User";

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

// Estilos visuales según el rol del usuario
const roleStyles: Record<UserRole, { label: string; badgeClass: string; avatarBg: string }> = {
  admin: {
    label: 'Admin',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    avatarBg: 'bg-purple-600',
  },
  owner: {
    label: 'Owner',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    avatarBg: 'bg-amber-600',
  },
  user: {
    label: 'User',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    avatarBg: 'bg-blue-600',
  },
};

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const roleConfig = roleStyles[user.role] ?? roleStyles.user;

  // Extracción de iniciales para el avatar
  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition-all duration-200 hover:border-slate-700 hover:shadow-slate-900/50 flex flex-col justify-between">
      <div>
        {/* Encabezado: Avatar, Nombre e Identificación */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-inner ${roleConfig.avatarBg}`}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-100" title={user.name}>
                {user.name}
              </h3>
              <p className="text-xs text-slate-400">ID: {user.identification}</p>
            </div>
          </div>

          {/* Badge de Rol */}
          <span
            className={`inline-flex shrink-0 items-center rounded-md border px-2.5 py-0.5 text-xs font-medium capitalize ${roleConfig.badgeClass}`}
          >
            {roleConfig.label}
          </span>
        </div>

        {/* Información de contacto */}
        <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3 text-xs text-slate-300">
          {/* Email */}
          <div className="flex items-center gap-2 truncate text-slate-300">
            <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate" title={user.email}>{user.email}</span>
          </div>

          {/* Teléfono */}
          <div className="flex items-center gap-2 text-slate-300">
            <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{user.phone || 'Sin teléfono'}</span>
          </div>

          {/* Fecha de registro */}
          {formattedDate && (
            <div className="flex items-center gap-2 text-slate-400">
              <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      {(onEdit || onDelete) && (
        <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-800/80 pt-3">
          {onEdit && (
            <button
              onClick={() => onEdit(user)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(user.id)}
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </div>
  );
};
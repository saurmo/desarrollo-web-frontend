'use client';
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { UserRole } from "../../users/domain/User";
import { useSession } from "../context/SessionContext";

/**
 * Protege una página del panel por rol.
 *
 * El menú ya oculta las opciones que el rol no puede usar, pero eso no basta:
 * cualquiera puede escribir la URL a mano. Este componente revisa el rol antes de mostrar la página.
 *
 * Importante: esto es experiencia de usuario. La protección real la hace la API, respondiendo 403.
 */
export function RoleGuard({ roles, children }: { roles: UserRole[]; children: React.ReactNode }) {
    const { user } = useSession();

    if (!roles.includes(user.role)) {
        return (
            <div role="alert" className="mx-auto mt-16 max-w-md rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6 text-center">
                <ShieldAlert className="mx-auto h-10 w-10 text-amber-400" />
                <h2 className="mt-3 text-lg font-semibold text-white">No tienes permiso para ver esta página</h2>
                <p className="mt-1 text-sm text-slate-300">Tu rol ({user.role}) no tiene acceso a esta sección.</p>
                <Link href="/dashboard" className="mt-4 inline-block rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                    Volver al panel
                </Link>
            </div>
        );
    }
    return <>{children}</>;
}

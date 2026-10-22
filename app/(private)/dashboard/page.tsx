'use client';
import { useSession } from "@/src/features/dashboard/context/SessionContext";

/** /dashboard: página de inicio del panel, visible para todos los roles. */
export default function DashboardPage() {
  const { user } = useSession();

  return (
    <section className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-white">Hola, {user.name}</h1>
      <p className="mt-1 text-sm text-slate-400">
        Entraste con el rol <span className="font-semibold text-emerald-400">{user.role}</span>. En el menú ves las secciones que tu rol puede usar.
      </p>
    </section>
  );
}

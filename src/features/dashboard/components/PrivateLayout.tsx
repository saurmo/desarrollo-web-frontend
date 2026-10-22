'use client';
import { KeyRound, LayoutDashboard, LogOut, Menu, Tags, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "../../common/components/Loading";
import { useAuth } from "../../login/hooks/useAuth";
import { SessionContext } from "../context/SessionContext";
import { DASHBOARD_MENU } from "../domain/menu";

/** Ícono de cada opción del menú, según su ruta. */
const ICONS: Record<string, React.ReactNode> = {
    "/dashboard": <LayoutDashboard className="h-4 w-4" />,
    "/dashboard/users": <Users className="h-4 w-4" />,
    "/dashboard/categories": <Tags className="h-4 w-4" />,
};

/**
 * Estructura común del panel privado para todos los roles:
 *  1. Verifica que haya sesión; si no, lleva al login.
 *  2. Muestra el menú lateral solo con las opciones que el rol puede ver.
 *  3. Comparte la sesión con las páginas a través de SessionContext.
 */
export function PrivateLayout({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setMenuOpen] = useState(false);

    // Sin sesión → al login. Se espera a que useAuth termine de leer el token guardado.
    useEffect(() => {
        if (auth.isSessionLoaded && !auth.isAuthenticated) {
            router.replace("/login");
        }
    }, [auth.isSessionLoaded, auth.isAuthenticated, router]);

    /** Cierra la sesión y vuelve a la página de inicio pública. */
    const handleLogout = () => {
        auth.logout();
        router.replace("/login");
    };

    if (!auth.isSessionLoaded || !auth.isAuthenticated || !auth.user) {
        return <Loading message="Verificando sesión..." fullScreen />;
    }

    const user = auth.user;
    // El menú se filtra por rol: cada usuario solo ve las opciones que puede usar
    const menu = DASHBOARD_MENU.filter((item) => item.roles.includes(user.role));

    const menuLinks = menu.map((item) => {
        const isActive = pathname === item.href;
        return (
            <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${isActive
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
            >
                {ICONS[item.href]}
                {item.label}
            </Link>
        );
    });

    return (
        <SessionContext.Provider value={{ user, logout: handleLogout }}>
            <div className="flex flex-1">
                {/* Menú lateral: fijo en escritorio, desplegable en móvil */}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-emerald-500/10 bg-slate-950/95 p-4 backdrop-blur-md transition-transform md:static md:translate-x-0 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="mb-8 flex items-center justify-between">
                        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                            <KeyRound className="h-4 w-4" aria-hidden="true" />
                            Listings
                        </Link>
                        <button type="button" onClick={() => setMenuOpen(false)} className="rounded-lg p-1 text-slate-400 md:hidden" aria-label="Cerrar menú">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-1" aria-label="Menú del panel">
                        {menuLinks}
                    </nav>
                </aside>

                {/* Fondo oscuro detrás del menú abierto en móvil */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />
                )}

                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Encabezado con el usuario y cerrar sesión */}
                    <header className="flex items-center justify-between gap-4 border-b border-emerald-500/10 bg-slate-950/60 px-4 py-3 backdrop-blur-md">
                        <button type="button" onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-slate-300 hover:bg-white/5 md:hidden" aria-label="Abrir menú">
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="ml-auto flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-white">{user.name}</p>
                                <p className="text-xs uppercase tracking-wider text-emerald-400">{user.role}</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-3 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
                            >
                                <LogOut className="h-4 w-4" />
                                Salir
                            </button>
                        </div>
                    </header>

                    <main className="flex-1 p-4 sm:p-6">{children}</main>
                </div>
            </div>
        </SessionContext.Provider>
    );
}

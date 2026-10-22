'use client';
import { KeyRound, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/** Enlaces principales de la barra. Agregar una página pública es agregar un elemento aquí. */
const NAV_LINKS = [
    { href: "/", label: "Inicio" },
];

/**
 * Barra de navegación pública.
 *
 * Es 'use client' porque usa dos hooks del navegador:
 *  - usePathname: para resaltar el enlace de la página actual.
 *  - useState: para abrir y cerrar el menú en pantallas pequeñas.
 */
export function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setMenuOpen] = useState(false);

    /** Un enlace está activo si coincide exactamente con la ruta actual. */
    const isActive = (href: string) => pathname === href;

    /** Clases del enlace según si está activo o no. */
    const linkClass = (href: string) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive(href)
            ? "bg-emerald-500/15 text-emerald-300"
            : "text-slate-300 hover:bg-white/5 hover:text-white"
        }`;

    /** Cierra el menú móvil al navegar. */
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="sticky top-0 z-30 border-b border-emerald-500/10 bg-slate-950/70 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3" aria-label="Navegación principal">
                {/* Marca: la misma insignia que se usaba en el login */}
                <Link href="/" onClick={closeMenu} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                    <KeyRound className="h-4 w-4" aria-hidden="true" />
                    Listings
                </Link>

                {/* Enlaces en escritorio */}
                <div className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className={linkClass(link.href)} aria-current={isActive(link.href) ? "page" : undefined}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Acciones de sesión en escritorio */}
                <div className="hidden items-center gap-2 md:flex">
                    <Link href="/login" className="rounded-xl border border-emerald-500/30 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/10">
                        Ingresar
                    </Link>
                    <Link href="/register" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700">
                        Registrarse
                    </Link>
                </div>

                {/* Botón del menú en móvil */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="rounded-lg p-2 text-slate-300 hover:bg-white/5 hover:text-white md:hidden"
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            {/* Menú desplegable en móvil */}
            {isMenuOpen && (
                <div className="flex flex-col gap-1 border-t border-emerald-500/10 px-4 py-3 md:hidden">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} onClick={closeMenu} className={linkClass(link.href)}>
                            {link.label}
                        </Link>
                    ))}
                    <div className="mt-2 flex gap-2">
                        <Link href="/login" onClick={closeMenu} className="flex-1 rounded-xl border border-emerald-500/30 px-4 py-2 text-center text-sm font-medium text-emerald-300">
                            Ingresar
                        </Link>
                        <Link href="/register" onClick={closeMenu} className="flex-1 rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white">
                            Registrarse
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

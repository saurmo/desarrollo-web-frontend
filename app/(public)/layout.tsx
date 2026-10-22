import { Navbar } from "@/src/features/common/components/Navbar";

/**
 * Layout público: landing, login y registro.
 * Agrega la barra de navegación y el pie de página.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <footer className="border-t border-emerald-500/10 py-6 text-center text-xs text-slate-500">
        Listings · Desarrollo Web 2026-2
      </footer>
    </>
  );
}

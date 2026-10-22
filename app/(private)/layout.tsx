import { PrivateLayout } from "@/src/features/dashboard/components/PrivateLayout";

/**
 * Layout privado: todo lo que está dentro de app/(private) exige sesión.
 * Un solo layout para todos los roles; lo que cambia por rol es el menú (DASHBOARD_MENU)
 * y las páginas protegidas con <RoleGuard>.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <PrivateLayout>{children}</PrivateLayout>;
}

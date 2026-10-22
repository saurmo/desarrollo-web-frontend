import { UserRole } from "../../users/domain/User";

export interface MenuItem {
    href: string;
    label: string;
    /** Roles que pueden ver la opción y entrar a la página. */
    roles: UserRole[];
}

/**
 * Opciones del menú del panel privado.
 * Para agregar un CRUD nuevo: crear la página en app/(private)/dashboard/<recurso>/page.tsx
 * y agregar aquí su opción con los roles que pueden usarla.
 */
export const DASHBOARD_MENU: MenuItem[] = [
    { href: "/dashboard", label: "Inicio", roles: ["admin", "owner", "user"] },
    { href: "/dashboard/users", label: "Usuarios", roles: ["admin"] },
    { href: "/dashboard/categories", label: "Categorías", roles: ["admin"] },
];

'use client';
import { createContext, useContext } from "react";
import { User } from "../../users/domain/User";

export interface Session {
    user: User;
    logout: () => void;
}

/**
 * Contexto con la sesión del usuario dentro del panel privado.
 *
 * El layout privado lee la sesión una sola vez y la comparte con todo lo que tiene dentro:
 * el menú, el encabezado y cada página. Así ninguna página tiene que volver a leer el token.
 */
export const SessionContext = createContext<Session | null>(null);

/** Hook para leer la sesión desde cualquier componente del panel privado. */
export function useSession(): Session {
    const session = useContext(SessionContext);
    if (!session) {
        throw new Error("useSession solo se puede usar dentro del layout privado");
    }
    return session;
}

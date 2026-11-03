/**
 * Rate limiter de ventana fija, en memoria.
 *
 * Cada cliente (por ejemplo, una IP) tiene un contador que se reinicia cuando termina su ventana.
 * Es la misma idea que usa express-rate-limit en el backend, escrita a mano para verla completa.
 *
 * Limitación: el Map vive en la memoria del proceso. En Vercel cada instancia lleva su propia
 * cuenta y se reinicia con cada despliegue; para un límite exacto se usa un store compartido (Redis).
 */
export interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
    /** Segundos que faltan para que se reinicie el contador. */
    retryAfterSeconds: number;
}

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
    const clients = new Map<string, { count: number; resetAt: number }>();

    return function check(key: string): RateLimitResult {
        const now = Date.now();
        let entry = clients.get(key);
        if (!entry || entry.resetAt <= now) {
            entry = { count: 0, resetAt: now + windowMs };
            clients.set(key, entry);
        }
        entry.count++;

        // Limpieza: sin ella, el Map crecería con cada IP que alguna vez visitó el sitio
        if (clients.size > 10_000) {
            clients.forEach((value, client) => { if (value.resetAt <= now) clients.delete(client); });
        }

        return {
            allowed: entry.count <= limit,
            limit,
            remaining: Math.max(0, limit - entry.count),
            retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
        };
    };
}

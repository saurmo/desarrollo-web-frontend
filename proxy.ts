import { NextResponse, type NextRequest } from 'next/server'
import { createRateLimiter } from './src/features/common/rate-limit/rate-limiter'

/**
 * Proxy (en Next.js 15 y anteriores se llamaba middleware.ts): corre ANTES de cada petición
 * a las páginas del frontend. Aquí limita cuántas páginas puede pedir una misma IP por minuto.
 *
 * Esto protege al servidor de Next (en Vercel, cada página renderizada consume ejecución).
 * NO protege la API: el navegador llama a la API directamente, y ella tiene su propio rate limit.
 *
 * El límite es generoso porque Next pide páginas por adelantado (prefetch de los <Link>)
 * y cada una cuenta como una petición.
 */
const checkRateLimit = createRateLimiter({ limit: 300, windowMs: 60 * 1000 })

export function proxy(request: NextRequest) {
  // Detrás de Vercel la IP real viene en x-forwarded-for (el primer valor de la lista)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'local'
  const result = checkRateLimit(ip)

  if (!result.allowed) {
    return new NextResponse('Hiciste demasiadas peticiones. Espera un momento y recarga la página.', {
      status: 429,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Retry-After': String(result.retryAfterSeconds),
      },
    })
  }

  // Mismo formato de headers que usa el backend, para verlos en DevTools → Network
  const response = NextResponse.next()
  response.headers.set('RateLimit', `"pages"; r=${result.remaining}; t=${result.retryAfterSeconds}`)
  return response
}

// No contar los archivos estáticos (JS, CSS, imágenes): una sola página carga decenas
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}

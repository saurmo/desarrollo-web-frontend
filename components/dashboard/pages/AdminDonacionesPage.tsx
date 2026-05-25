'use client';

import { useTodasDonaciones } from '@/src/application/donaciones/useTodasDonaciones';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

function receiptHref(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.startsWith('http') ? url : `${API_BASE}${url}`;
}

export default function AdminDonacionesPage() {
  const { donaciones, loading, error } = useTodasDonaciones();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Todas las donaciones</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {loading ? 'Cargando...' : `${donaciones.length} donaciones registradas`}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">Cargando donaciones...</div>
        ) : donaciones.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No hay donaciones registradas todavía.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-5 py-3">Fecha</th>
                  <th className="px-5 py-3">Donante</th>
                  <th className="px-5 py-3">Correo</th>
                  <th className="px-5 py-3">Monto</th>
                  <th className="px-5 py-3">Descripción</th>
                  <th className="px-5 py-3">Comprobante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {donaciones.map((d) => {
                  const href = receiptHref(d.receiptUrl);
                  return (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(d.createdAt).toLocaleDateString('es-CO')}
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-800">
                        {d.donor ? `${d.donor.name} ${d.donor.lastName}` : 'Anónimo'}
                      </td>
                      <td className="px-5 py-3 text-gray-500">{d.donor?.email ?? '—'}</td>
                      <td className="px-5 py-3 font-semibold text-amber-700 whitespace-nowrap">
                        {formatCOP(Number(d.total))}
                      </td>
                      <td className="px-5 py-3 text-gray-700 max-w-[240px]">
                        <span className="line-clamp-2">{d.description ?? '—'}</span>
                      </td>
                      <td className="px-5 py-3">
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 hover:text-amber-900 font-medium underline underline-offset-2"
                          >
                            Ver
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

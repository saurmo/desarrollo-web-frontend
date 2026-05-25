'use client';

import Link from 'next/link';
import { useAuth } from '@/src/application/auth/useAuth';
import { useMisDonaciones } from '@/src/application/donaciones/useMisDonaciones';

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

export default function DonantePage() {
  const { usuario } = useAuth();
  const { donaciones, loading, error } = useMisDonaciones();

  const total = donaciones.reduce((acc, d) => acc + Number(d.total), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hola, {usuario?.name ?? 'donante'} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Aquí puedes ver el historial de tus donaciones a Fundación Theobroma.
          </p>
        </div>
        <Link
          href="/dashboard/donante/nueva"
          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva donación
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-amber-200 p-5">
          <p className="text-sm font-medium text-gray-600 mb-1">Donaciones realizadas</p>
          <p className="text-2xl font-bold text-gray-900">{donaciones.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-5">
          <p className="text-sm font-medium text-gray-600 mb-1">Total aportado</p>
          <p className="text-2xl font-bold text-amber-700">{formatCOP(total)}</p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-5">
          <p className="text-sm font-medium text-gray-600 mb-1">Última donación</p>
          <p className="text-2xl font-bold text-gray-900">
            {donaciones[0]
              ? new Date(donaciones[0].createdAt).toLocaleDateString('es-CO')
              : '—'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Historial</h2>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">Cargando donaciones...</div>
        ) : error ? (
          <div className="m-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : donaciones.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            Aún no has realizado ninguna donación.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-5 py-3">Fecha</th>
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
                      <td className="px-5 py-3 text-gray-500">
                        {new Date(d.createdAt).toLocaleDateString('es-CO')}
                      </td>
                      <td className="px-5 py-3 font-semibold text-amber-700">
                        {formatCOP(Number(d.total))}
                      </td>
                      <td className="px-5 py-3 text-gray-700 max-w-[280px]">
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

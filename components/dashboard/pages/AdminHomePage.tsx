'use client';

import Link from 'next/link';
import { useAuth } from '@/src/application/auth/useAuth';
import { useTodasDonaciones } from '@/src/application/donaciones/useTodasDonaciones';

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminHomePage() {
  const { usuario } = useAuth();
  const { donaciones, loading } = useTodasDonaciones();

  const total = donaciones.reduce((acc, d) => acc + Number(d.total), 0);
  const donantesUnicos = new Set(donaciones.map((d) => d.userId).filter(Boolean)).size;
  const recientes = donaciones.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Panel administrativo · {usuario?.name ?? ''}
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Vista global de todas las donaciones registradas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-amber-200 p-5">
          <p className="text-sm font-medium text-gray-600 mb-1">Donaciones totales</p>
          <p className="text-2xl font-bold text-gray-900">
            {loading ? '…' : donaciones.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-5">
          <p className="text-sm font-medium text-gray-600 mb-1">Monto recaudado</p>
          <p className="text-2xl font-bold text-amber-700">
            {loading ? '…' : formatCOP(total)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-5">
          <p className="text-sm font-medium text-gray-600 mb-1">Donantes únicos</p>
          <p className="text-2xl font-bold text-gray-900">
            {loading ? '…' : donantesUnicos}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Donaciones recientes</h2>
          <Link
            href="/dashboard/admin/donaciones"
            className="text-sm text-amber-700 hover:underline font-medium"
          >
            Ver todas
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="px-5 py-3">Donante</th>
                <th className="px-5 py-3">Monto</th>
                <th className="px-5 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recientes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {d.donor ? `${d.donor.name} ${d.donor.lastName}` : 'Anónimo'}
                  </td>
                  <td className="px-5 py-3 font-semibold text-amber-700">
                    {formatCOP(Number(d.total))}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(d.createdAt).toLocaleDateString('es-CO')}
                  </td>
                </tr>
              ))}
              {!loading && recientes.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-8 text-center text-gray-400">
                    Aún no hay donaciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

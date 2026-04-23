'use client';

import Link from 'next/link';
import { useAuth } from '@/src/application/auth/useAuth';

const stats = [
  {
    label: 'Total donaciones',
    valor: '$4.820.000',
    cambio: '+12% este mes',
    positivo: true,
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600 bg-amber-100',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Donantes activos',
    valor: '348',
    cambio: '+23 nuevos',
    positivo: true,
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600 bg-orange-100',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Meta del mes',
    valor: '68%',
    cambio: '$3.400.000 de $5.000.000',
    positivo: true,
    color: 'bg-stone-50 border-stone-200',
    iconColor: 'text-stone-600 bg-stone-100',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: 'Plántulas financiadas',
    valor: '2.140',
    cambio: '-8% vs mes anterior',
    positivo: false,
    color: 'bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-700 bg-yellow-100',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
  },
];

const donacionesRecientes = [
  { id: '001', donante: 'Carlos Mora', monto: '$50.000', fecha: '23 abr 2025', estado: 'Completada' },
  { id: '002', donante: 'Lucía Vargas', monto: '$100.000', fecha: '22 abr 2025', estado: 'Completada' },
  { id: '003', donante: 'Andrés Patiño', monto: '$25.000', fecha: '21 abr 2025', estado: 'Pendiente' },
  { id: '004', donante: 'María Ospina', monto: '$30.000', fecha: '20 abr 2025', estado: 'Completada' },
  { id: '005', donante: 'José Betancur', monto: '$60.000', fecha: '19 abr 2025', estado: 'Completada' },
];

export default function DashboardHome() {
  const { usuario } = useAuth();

  return (
    <div className="space-y-6">

      {/* Bienvenida */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido, {usuario?.name ?? 'usuario'} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Panel de gestión · Fundación Theobroma
          </p>
        </div>
        <Link
          href="/dashboard/donaciones"
          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva donación
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`bg-white rounded-xl border p-5 ${s.color}`}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-medium text-gray-600">{s.label}</p>
              <div className={`p-2 rounded-lg ${s.iconColor}`}>{s.icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.valor}</p>
            <p className={`text-xs mt-1 ${s.positivo ? 'text-green-600' : 'text-red-500'}`}>
              {s.cambio}
            </p>
          </div>
        ))}
      </div>

      {/* Progreso meta mensual */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">Meta mensual — Abril 2025</h2>
          <span className="text-sm font-bold text-amber-700">68%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className="bg-amber-500 h-3 rounded-full transition-all" style={{ width: '68%' }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>$3.400.000 recaudados</span>
          <span>Meta: $5.000.000</span>
        </div>
      </div>

      {/* Tabla donaciones recientes */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Donaciones recientes</h2>
          <Link
            href="/dashboard/donaciones"
            className="text-sm text-amber-700 hover:underline font-medium"
          >
            Ver todas
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">Donante</th>
                <th className="px-5 py-3">Monto</th>
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donacionesRecientes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-400">{d.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{d.donante}</td>
                  <td className="px-5 py-3 font-semibold text-amber-700">{d.monto}</td>
                  <td className="px-5 py-3 text-gray-500">{d.fecha}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        d.estado === 'Completada'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {d.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

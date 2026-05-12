'use client';

import { useState, FormEvent, useRef } from 'react';
import { useAuth } from '@/src/application/auth/useAuth';
import { useCrearDonacion } from '@/src/application/donaciones/useCrearDonacion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

function comprobanteLabel(url: string): string {
  const lower = url.toLowerCase();
  if (lower.endsWith('.pdf')) return 'Ver PDF';
  return 'Ver imagen';
}

export default function DonacionesPage() {
  const { usuario } = useAuth();
  const { crear, loading, error, donacion } = useCrearDonacion();

  const [form, setForm] = useState({
    total: '',
    descripcion: '',
    vincularUsuario: true,
  });
  const [archivo, setArchivo] = useState<File | null>(null);
  const [exito, setExito] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === 'checkbox'
        ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
        : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setExito(false);
    };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setArchivo(file);
    setExito(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await crear({
      total: Number(form.total),
      descripcion: form.descripcion || undefined,
      user_id: form.vincularUsuario && usuario ? usuario.id : undefined,
      archivo: archivo ?? undefined,
    });
    if (success) {
      setExito(true);
      setForm({ total: '', descripcion: '', vincularUsuario: true });
      setArchivo(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const comprobanteHref =
    donacion?.comprobante_url != null && donacion.comprobante_url !== ''
      ? donacion.comprobante_url.startsWith('http')
        ? donacion.comprobante_url
        : `${API_BASE}${donacion.comprobante_url}`
      : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Donaciones</h1>
        <p className="text-gray-500 text-sm mt-0.5">Registra una nueva donación a la fundación</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Formulario */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-5">Nueva donación</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1">
                Monto (COP) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  id="total"
                  type="number"
                  min={1000}
                  step={1000}
                  required
                  value={form.total}
                  onChange={set('total')}
                  placeholder="50000"
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              {form.total && (
                <p className="text-xs text-amber-700 mt-1">{formatCOP(Number(form.total))}</p>
              )}
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <textarea
                id="descripcion"
                rows={3}
                value={form.descripcion}
                onChange={set('descripcion')}
                placeholder="Ej: Donación mensual al programa de reforestación"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="comprobante" className="block text-sm font-medium text-gray-700 mb-1">
                Comprobante <span className="text-gray-400 font-normal">(PDF o imagen, opcional)</span>
              </label>
              <input
                ref={fileInputRef}
                id="comprobante"
                type="file"
                accept=".pdf,application/pdf,image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-amber-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-amber-800 hover:file:bg-amber-100"
              />
              {archivo && (
                <p className="text-xs text-gray-500 mt-1 truncate" title={archivo.name}>
                  Seleccionado: {archivo.name}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                id="vincular"
                type="checkbox"
                checked={form.vincularUsuario}
                onChange={set('vincularUsuario')}
                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="vincular" className="text-sm text-gray-600">
                Vincular a mi usuario ({usuario?.email ?? '—'})
              </label>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-lg">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {exito && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2.5 rounded-lg">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ¡Donación registrada exitosamente!
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white font-medium text-sm py-2.5 rounded-lg transition"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Registrando...
                </>
              ) : (
                'Registrar donación'
              )}
            </button>
          </form>
        </div>

        {/* Tabla: última donación registrada */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
          <h2 className="font-semibold text-gray-800 mb-5">Última donación registrada</h2>
          {donacion ? (
            <div className="space-y-4">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left font-medium px-3 py-2 border-b border-gray-200">ID</th>
                    <th className="text-left font-medium px-3 py-2 border-b border-gray-200">Monto</th>
                    <th className="text-left font-medium px-3 py-2 border-b border-gray-200">Descripción</th>
                    <th className="text-left font-medium px-3 py-2 border-b border-gray-200">Comprobante</th>
                    <th className="text-left font-medium px-3 py-2 border-b border-gray-200">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-3 py-2.5 border-b border-gray-100 font-mono text-xs text-gray-700 align-top">
                      {donacion.id}
                    </td>
                    <td className="px-3 py-2.5 border-b border-gray-100 font-bold text-amber-700 align-top whitespace-nowrap">
                      {formatCOP(Number(donacion.total))}
                    </td>
                    <td className="px-3 py-2.5 border-b border-gray-100 text-gray-700 align-top max-w-[140px]">
                      <span className="line-clamp-3">{donacion.descripcion ?? '—'}</span>
                    </td>
                    <td className="px-3 py-2.5 border-b border-gray-100 align-top">
                      {comprobanteHref ? (
                        <a
                          href={comprobanteHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-700 hover:text-amber-900 font-medium underline underline-offset-2"
                        >
                          {comprobanteLabel(donacion.comprobante_url ?? '')}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 border-b border-gray-100 text-gray-700 align-top whitespace-nowrap">
                      {new Date(donacion.created_at).toLocaleDateString('es-CO')}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <span className="text-green-700 text-sm font-medium">✓ Donación confirmada</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-sm">Ninguna donación registrada aún</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

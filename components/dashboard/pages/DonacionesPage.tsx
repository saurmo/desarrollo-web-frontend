'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/src/application/auth/useAuth';
import { useCrearDonacion } from '@/src/application/donaciones/useCrearDonacion';

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DonacionesPage() {
  const { usuario } = useAuth();
  const { crear, loading, error, donacion } = useCrearDonacion();

  const [form, setForm] = useState({
    total: '',
    descripcion: '',
    vincularUsuario: true,
  });
  const [exito, setExito] = useState(false);

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === 'checkbox'
        ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
        : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setExito(false);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await crear({
      total: Number(form.total),
      descripcion: form.descripcion || undefined,
      user_id: form.vincularUsuario && usuario ? usuario.id : undefined,
    });
    if (success) {
      setExito(true);
      setForm({ total: '', descripcion: '', vincularUsuario: true });
    }
  };

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

        {/* Última donación registrada */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-5">Última donación registrada</h2>
          {donacion ? (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">ID</span>
                <span className="font-mono text-gray-700 text-xs">{donacion.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Monto</span>
                <span className="font-bold text-amber-700">{formatCOP(Number(donacion.total))}</span>
              </div>
              {donacion.descripcion && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Descripción</span>
                  <span className="text-gray-700 text-right max-w-[60%]">{donacion.descripcion}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fecha</span>
                <span className="text-gray-700">
                  {new Date(donacion.created_at).toLocaleDateString('es-CO')}
                </span>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
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

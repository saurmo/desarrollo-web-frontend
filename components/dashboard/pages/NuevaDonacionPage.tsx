'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCrearDonacion } from '@/src/application/donaciones/useCrearDonacion';

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function NuevaDonacionPage() {
  const router = useRouter();
  const { crear, loading, error } = useCrearDonacion();
  const [form, setForm] = useState({ total: '', descripcion: '' });
  const [archivo, setArchivo] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await crear({
      total: Number(form.total),
      description: form.descripcion || undefined,
      archivo: archivo ?? undefined,
    });
    if (ok) {
      setForm({ total: '', descripcion: '' });
      setArchivo(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      router.push('/dashboard/donante');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nueva donación</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Tu donación quedará vinculada automáticamente a tu cuenta.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
      >
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
              onChange={(e) => setForm((p) => ({ ...p, total: e.target.value }))}
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
            onChange={(e) => setForm((p) => ({ ...p, descripcion: e.target.value }))}
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
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-amber-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-amber-800 hover:file:bg-amber-100"
          />
          {archivo && (
            <p className="text-xs text-gray-500 mt-1 truncate" title={archivo.name}>
              Seleccionado: {archivo.name}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push('/dashboard/donante')}
            className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white font-medium text-sm py-2.5 rounded-lg"
          >
            {loading ? 'Registrando...' : 'Registrar donación'}
          </button>
        </div>
      </form>
    </div>
  );
}

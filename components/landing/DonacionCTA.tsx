'use client';

import { useState } from 'react';
import Link from 'next/link';

const montos = [15000, 30000, 60000, 120000];

const impactoPorMonto: Record<number, string> = {
  15000: 'financia 5 plántulas de cacao nativo',
  30000: 'cubre el kit de herramientas para un agricultor',
  60000: 'paga una jornada de capacitación técnica',
  120000: 'apoya a una familia cacaotera durante un mes',
};

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DonacionCTA() {
  const [seleccionado, setSeleccionado] = useState(30000);
  const [personalizado, setPersonalizado] = useState('');

  const montoFinal = personalizado ? Number(personalizado) : seleccionado;
  const impacto = personalizado ? 'apoya directamente a familias cacaoteras' : impactoPorMonto[seleccionado];

  return (
    <section id="donar" className="py-24" style={{ background: 'linear-gradient(135deg, #3b1a08 0%, #5c2a0e 60%, #7c3f1a 100%)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block text-amber-300 text-sm font-semibold uppercase tracking-widest mb-3">
          Apoya a los cacaoteros
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Tu donación sabe a futuro
        </h2>
        <p className="text-amber-200 text-lg mb-10">
          Cada peso que donas llega directo al campo. Apoyamos a familias que cultivan
          el mejor cacao del mundo con dignidad y sostenibilidad.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {montos.map((monto) => (
            <button
              key={monto}
              onClick={() => { setSeleccionado(monto); setPersonalizado(''); }}
              className={`py-3 px-3 rounded-xl font-semibold text-sm transition-all border-2 ${
                seleccionado === monto && !personalizado
                  ? 'bg-amber-400 border-amber-400 text-[#3b1a08]'
                  : 'bg-transparent border-amber-800 text-amber-100 hover:border-amber-400 hover:text-white'
              }`}
            >
              {formatCOP(monto)}
            </button>
          ))}
        </div>

        {impacto && !personalizado && (
          <p className="text-amber-300 text-sm mb-6 italic">
            🌱 {formatCOP(seleccionado)} {impacto}
          </p>
        )}

        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 font-medium text-sm">$</span>
            <input
              type="number"
              min={5000}
              placeholder="Otro monto (COP)"
              value={personalizado}
              onChange={(e) => { setPersonalizado(e.target.value); setSeleccionado(0); }}
              className="w-full pl-8 pr-4 py-3 rounded-xl bg-[#4a2010] border-2 border-amber-800 text-white placeholder-amber-600 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#3b1a08] font-bold text-base px-10 py-4 rounded-full transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Donar {montoFinal > 0 ? formatCOP(montoFinal) : ''}
        </Link>

        <p className="text-amber-700 text-xs mt-4">
          Pago seguro · Certificado de donación · Deducible de impuestos en Colombia
        </p>
      </div>
    </section>
  );
}

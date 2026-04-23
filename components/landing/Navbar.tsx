'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Misión', href: '#mision' },
  { label: 'Programas', href: '#programas' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fdf6ec]/95 backdrop-blur border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍫</span>
            <span className="font-bold text-[#3b1a08] text-lg leading-tight">
              Theo<span className="text-amber-600">broma</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors"
            >
              Iniciar sesión
            </Link>
            <a
              href="#donar"
              className="text-sm font-semibold bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-full transition-colors"
            >
              Donar ahora
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-amber-100"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#fdf6ec] border-t border-amber-100 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-700 hover:text-amber-800 py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <hr className="border-amber-100" />
          <Link href="/login" className="text-sm font-medium text-stone-700 py-1">
            Iniciar sesión
          </Link>
          <a
            href="#donar"
            className="text-sm font-semibold text-center bg-amber-700 text-white py-2 rounded-full"
            onClick={() => setOpen(false)}
          >
            Donar ahora
          </a>
        </div>
      )}
    </header>
  );
}

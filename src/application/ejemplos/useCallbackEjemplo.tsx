'use client';

/**
 * EJEMPLO useCallback
 *
 * Problema: cada render del padre recrea las funciones, lo que obliga a los
 * hijos memorizados (React.memo) a re-renderizarse aunque sus datos no cambien.
 *
 * Solución: useCallback devuelve la MISMA referencia de función entre renders
 * siempre que sus dependencias no cambien.
 */

import { memo, useCallback, useState } from 'react';

// ─── Componente hijo ─────────────────────────────────────────────────────────

interface BotonProps {
  label: string;
  onClick: () => void;
}

// React.memo evita re-renders si las props no cambian.
// Sin useCallback en el padre, onClick es siempre una nueva referencia → re-render igual.
const Boton = memo(({ label, onClick }: BotonProps) => {
  console.log(`Boton "${label}" renderizado`);
  return <button onClick={onClick}>{label}</button>;
});
Boton.displayName = 'Boton';

// ─── Componente padre ─────────────────────────────────────────────────────────

export function EjemploSinCallback() {
  const [contador, setContador] = useState(0);
  const [otro, setOtro] = useState(0);

  // ❌ Sin useCallback: nueva función en CADA render del padre.
  //    Aunque "otro" no cambió, el Boton de incrementar se re-renderiza.
  const incrementar = () => setContador((c) => c + 1);

  return (
    <div style={{ border: '1px solid red', padding: 16, marginBottom: 16 }}>
      <h3>Sin useCallback ❌</h3>
      <p>Contador: {contador}</p>
      <p>Otro estado: {otro}</p>
      <Boton label="Incrementar contador" onClick={incrementar} />
      <button onClick={() => setOtro((o) => o + 1)} style={{ marginLeft: 8 }}>
        Cambiar otro estado
      </button>
      <p style={{ fontSize: 12, color: 'gray' }}>
        Abre la consola: "Boton renderizado" aparece aunque sólo cambie "otro".
      </p>
    </div>
  );
}

export function EjemploConCallback() {
  const [contador, setContador] = useState(0);
  const [otro, setOtro] = useState(0);

  // ✅ Con useCallback: la función sólo se recrea cuando cambia su dependencia.
  //    Si sólo cambia "otro", el Boton de incrementar NO se re-renderiza.
  const incrementar = useCallback(() => setContador((c) => c + 1), []);

  return (
    <div style={{ border: '1px solid green', padding: 16 }}>
      <h3>Con useCallback ✅</h3>
      <p>Contador: {contador}</p>
      <p>Otro estado: {otro}</p>
      <Boton label="Incrementar contador" onClick={incrementar} />
      <button onClick={() => setOtro((o) => o + 1)} style={{ marginLeft: 8 }}>
        Cambiar otro estado
      </button>
      <p style={{ fontSize: 12, color: 'gray' }}>
        Abre la consola: "Boton renderizado" sólo aparece cuando cambia el contador.
      </p>
    </div>
  );
}

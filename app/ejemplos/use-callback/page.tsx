import {
  EjemploConCallback,
  EjemploSinCallback,
} from '@/src/application/ejemplos/useCallbackEjemplo';

export default function UseCallbackPage() {
  return (
    <main style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>useCallback — ventajas y desventajas</h1>

      <section style={{ marginBottom: 32 }}>
        <h2>¿Qué hace?</h2>
        <p>
          <code>useCallback(fn, deps)</code> memoriza una función y devuelve la{' '}
          <strong>misma referencia</strong> entre renders mientras las dependencias no cambien.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Cuándo SÍ usarlo ✅</h2>
        <ul>
          <li>La función se pasa como prop a un hijo envuelto en <code>React.memo</code>.</li>
          <li>La función es dependencia de un <code>useEffect</code> y no quieres ejecutarlo en cada render.</li>
        </ul>

        <h2>Cuándo NO usarlo ❌</h2>
        <ul>
          <li>Funciones que no se pasan a hijos memorizados — useCallback añade overhead sin beneficio.</li>
          <li>Lógica que sí debe actualizarse en cada render.</li>
          <li>
            <strong>Premature optimization</strong>: memoizar todo por defecto complica el código
            sin mejora medible.
          </li>
        </ul>
      </section>

      <section>
        <h2>Demo — abre la consola del navegador</h2>
        <EjemploSinCallback />
        <EjemploConCallback />
      </section>
    </main>
  );
}

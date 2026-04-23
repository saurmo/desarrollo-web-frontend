import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import DonacionCTA from '@/components/landing/DonacionCTA';

const stats = [
  { valor: '3.200+', label: 'Familias cacaoteras' },
  { valor: '5.800 ha', label: 'En producción sostenible' },
  { valor: '22', label: 'Variedades nativas preservadas' },
  { valor: '14 años', label: 'En el territorio' },
];

const programas = [
  {
    emoji: '🌱',
    colorFondo: 'bg-amber-50 border-amber-100',
    colorBadge: 'text-amber-800 bg-amber-100',
    titulo: 'Semillas y viveros',
    descripcion:
      'Producimos y distribuimos plántulas de cacao fino de aroma seleccionadas genéticamente. Cada agricultor recibe asistencia técnica para la siembra, el manejo agroforestal y la transición a sistemas libres de agroquímicos.',
    meta: '200.000 plántulas en 2025',
  },
  {
    emoji: '🤝',
    colorFondo: 'bg-orange-50 border-orange-100',
    colorBadge: 'text-orange-800 bg-orange-100',
    titulo: 'Comercio justo',
    descripcion:
      'Conectamos directamente a las familias con chocolateros artesanales y exportadores especializados, eliminando intermediarios. Los agricultores reciben hasta un 40% más por su cosecha que en el mercado convencional.',
    meta: '18 contratos directos activos',
  },
  {
    emoji: '📚',
    colorFondo: 'bg-stone-50 border-stone-100',
    colorBadge: 'text-stone-700 bg-stone-100',
    titulo: 'Escuela cacaotera',
    descripcion:
      'Formamos a agricultores en post-cosecha, fermentación, secado y control de calidad para que su cacao alcance estándares de exportación premium. También capacitamos a jóvenes rurales para que hereden el oficio con dignidad.',
    meta: '850 agricultores formados',
  },
];

const testimonios = [
  {
    nombre: 'Doña Carmen Palacios',
    rol: 'Cacaotera, San Vicente del Caguán – Caquetá',
    texto:
      'Antes vendía mi cacao a mitad de precio y nadie sabía de dónde venía. Hoy tengo un contrato con una chocolatería en Bogotá que pone mi nombre en la etiqueta. Eso no tiene precio.',
  },
  {
    nombre: 'José Alirio Mena',
    rol: 'Agricultor, Tumaco – Nariño',
    texto:
      'Gracias a la Escuela Cacaotera aprendí a fermentar bien. Mi cacao pasó de calidad corriente a premium en una sola cosecha. Mis hijos ya no quieren irse al pueblo: quieren quedarse a trabajar la tierra.',
  },
  {
    nombre: 'Lucía Vargas',
    rol: 'Técnica agroforestal, Arauca',
    texto:
      'El programa de viveros cambió la región. Ahora los cacaotales conviven con árboles maderables y frutales. Es cacao con sombra, como debe ser, y la tierra lo agradece.',
  },
];

const regiones = [
  { nombre: 'Tumaco', dept: 'Nariño', familias: 820 },
  { nombre: 'San Vicente del Caguán', dept: 'Caquetá', familias: 640 },
  { nombre: 'Arauca', dept: 'Arauca', familias: 510 },
  { nombre: 'Tibú', dept: 'Norte de Santander', familias: 470 },
  { nombre: 'Apartadó', dept: 'Antioquia', familias: 390 },
  { nombre: 'El Bagre', dept: 'Antioquia', familias: 370 },
];

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      {/* Hero */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{ background: 'linear-gradient(135deg, #1c0a03 0%, #3b1a08 55%, #5c2a0e 100%)' }}
      >
        <div className="absolute top-32 right-16 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-24 left-8 w-96 h-96 bg-orange-900/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-500/30 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Fundación sin ánimo de lucro · Colombia
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            El alimento de los dioses
            <br />
            <span className="text-amber-400">cultivado con dignidad.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-amber-200 leading-relaxed mb-10">
            <strong className="text-white">Fundación Theobroma</strong> acompaña a familias cacaoteras
            colombianas en la transición hacia un cacao sostenible, de alta calidad y con precio justo,
            convirtiendo el campo en una oportunidad real de vida digna.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#donar"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#3b1a08] font-bold text-base px-8 py-3.5 rounded-full transition-all shadow-lg hover:shadow-amber-400/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Apoyar a los cacaoteros
            </a>
            <a
              href="#mision"
              className="inline-flex items-center gap-2 border border-amber-700/60 hover:border-amber-400 text-amber-200 hover:text-white font-semibold text-base px-8 py-3.5 rounded-full transition-all"
            >
              Nuestra misión
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-amber-900/60 pt-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-amber-400">{s.valor}</div>
                <div className="text-amber-300/70 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión */}
      <section id="mision" className="py-24 bg-[#fdf6ec]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-amber-700 text-sm font-semibold uppercase tracking-widest">
                Quiénes somos
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#3b1a08] leading-snug">
                Theobroma: el alimento de los dioses, al alcance de quienes lo cultivan
              </h2>
              <p className="mt-5 text-stone-600 leading-relaxed">
                Colombia posee algunas de las variedades de cacao más finas del planeta, pero durante
                décadas sus cultivadores han recibido precios de commodity. <strong>Fundación Theobroma</strong>
                {' '}nació en 2011 para revertir esa inequidad: acompañamos a familias en regiones
                históricamente afectadas por el conflicto armado a transformar su cacao en un producto
                de clase mundial.
              </p>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Trabajamos con comunidades campesinas, afrocolombianas e indígenas en 6 departamentos,
                integrando asistencia técnica, acceso a mercados premium y formación empresarial para
                que el cacao sea, de verdad, una alternativa de paz y prosperidad.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center bg-white border border-amber-100 rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-extrabold text-amber-700">+40%</div>
                  <div className="text-stone-500 text-xs mt-1">Más ingreso vs. mercado convencional</div>
                </div>
                <div className="text-center bg-white border border-amber-100 rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-extrabold text-amber-700">95%</div>
                  <div className="text-stone-500 text-xs mt-1">De la donación va al territorio</div>
                </div>
                <div className="text-center bg-white border border-amber-100 rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-extrabold text-amber-700">6</div>
                  <div className="text-stone-500 text-xs mt-1">Departamentos con presencia</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col items-center text-center">
                <span className="text-4xl mb-3">🫘</span>
                <div className="font-bold text-amber-900 text-base">Cacao fino</div>
                <p className="text-stone-500 text-xs mt-1">Variedades nativas de aroma y sabor excepcionales</p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col items-center text-center mt-6">
                <span className="text-4xl mb-3">⚖️</span>
                <div className="font-bold text-orange-900 text-base">Precio justo</div>
                <p className="text-stone-500 text-xs mt-1">Contratos directos con compradores de especialidad</p>
              </div>
              <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 flex flex-col items-center text-center">
                <span className="text-4xl mb-3">🌿</span>
                <div className="font-bold text-stone-800 text-base">Agroforestal</div>
                <p className="text-stone-500 text-xs mt-1">Cacao bajo sombra con biodiversidad y suelo sano</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col items-center text-center mt-6">
                <span className="text-4xl mb-3">🕊️</span>
                <div className="font-bold text-yellow-900 text-base">Paz</div>
                <p className="text-stone-500 text-xs mt-1">Alternativa real en territorios afectados por el conflicto</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programas */}
      <section id="programas" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-amber-700 text-sm font-semibold uppercase tracking-widest">
              Lo que hacemos
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#3b1a08]">
              Del grano a la taza con dignidad
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-stone-500 text-lg">
              Tres programas integrados que acompañan al agricultor en toda la cadena de valor del cacao.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programas.map((p) => (
              <div
                key={p.titulo}
                className={`rounded-2xl p-8 border hover:shadow-md hover:-translate-y-1 transition-all ${p.colorFondo}`}
              >
                <span className="text-5xl">{p.emoji}</span>
                <h3 className="mt-5 text-xl font-bold text-[#3b1a08]">{p.titulo}</h3>
                <p className="mt-3 text-stone-500 text-sm leading-relaxed">{p.descripcion}</p>
                <div className={`mt-6 inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${p.colorBadge}`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Meta 2025: {p.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa de regiones */}
      <section className="py-16 bg-[#fdf6ec]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-amber-700 text-sm font-semibold uppercase tracking-widest">Presencia territorial</span>
            <h2 className="mt-3 text-2xl font-bold text-[#3b1a08]">Donde el cacao nos une</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {regiones.map((r) => (
              <div key={r.nombre} className="bg-white border border-amber-100 rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">📍</div>
                <div className="font-semibold text-[#3b1a08] text-sm">{r.nombre}</div>
                <div className="text-stone-400 text-xs">{r.dept}</div>
                <div className="mt-2 text-amber-700 font-bold text-sm">{r.familias}</div>
                <div className="text-stone-400 text-xs">familias</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="impacto" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-amber-700 text-sm font-semibold uppercase tracking-widest">
              Voces del campo
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#3b1a08]">
              El cacao habla por ellos
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonios.map((t) => (
              <div key={t.nombre} className="bg-[#fdf6ec] border border-amber-100 rounded-2xl p-7">
                <svg className="w-8 h-8 text-amber-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.748-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.966z" />
                </svg>
                <p className="text-stone-700 text-sm leading-relaxed italic">{t.texto}</p>
                <div className="mt-5">
                  <div className="font-semibold text-[#3b1a08] text-sm">{t.nombre}</div>
                  <div className="text-amber-700 text-xs">{t.rol}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Campaña de plántulas */}
          <div
            className="rounded-2xl p-8 text-white"
            style={{ background: 'linear-gradient(135deg, #3b1a08 0%, #5c2a0e 100%)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold">Campaña "100.000 Plántulas" · 2025</h3>
                <p className="text-amber-300 text-sm mt-1">
                  Meta: distribuir 100.000 plántulas de cacao nativo a pequeños agricultores
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-extrabold text-amber-400">73.400</div>
                <div className="text-amber-300 text-sm">de 100.000 plántulas</div>
              </div>
            </div>
            <div className="w-full bg-black/30 rounded-full h-3">
              <div className="bg-amber-400 h-3 rounded-full" style={{ width: '73.4%' }} />
            </div>
            <p className="text-amber-600 text-xs mt-3">
              73% completado · Faltan 26.600 plántulas · Una donación de $15.000 planta 5 árboles
            </p>
          </div>
        </div>
      </section>

      <DonacionCTA />

      {/* Footer */}
      <footer id="contacto" className="bg-[#1c0a03] text-amber-900 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🍫</span>
                <span className="font-bold text-amber-200 text-lg">
                  Theo<span className="text-amber-500">broma</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-amber-800">
                Apoyamos a familias cacaoteras colombianas con asistencia técnica, comercio justo y formación para un cacao de clase mundial.
              </p>
              <p className="text-xs mt-4 text-amber-900">
                NIT 900.654.123-8 · Entidad sin ánimo de lucro
              </p>
            </div>

            <div>
              <h4 className="text-amber-300 font-semibold text-sm mb-4">Navegación</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                {['Inicio', 'Misión', 'Programas', 'Impacto', 'Donar'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-amber-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-amber-300 font-semibold text-sm mb-4">Programas</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>Semillas y viveros</li>
                <li>Comercio justo</li>
                <li>Escuela cacaotera</li>
                <li>Agroforestería</li>
              </ul>
            </div>

            <div>
              <h4 className="text-amber-300 font-semibold text-sm mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>📍 Medellín, Antioquia</li>
                <li>📧 hola@theobroma.org.co</li>
                <li>📞 +57 (4) 312 8800</li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Portal de administración
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-950 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-900">
            <span>© 2025 Fundación Theobroma. Todos los derechos reservados.</span>
            <span>Hecho con 🍫 por y para los cacaoteros de Colombia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

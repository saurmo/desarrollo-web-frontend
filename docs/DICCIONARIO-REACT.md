# Diccionario de React y Next.js

Conceptos que usamos en este proyecto, explicados con ejemplos de nuestro propio código. Cada entrada responde tres preguntas: **qué es**, **para qué sirve** y **dónde lo usamos**.

## Índice

**Lo básico de React**
[Componente](#componente) · [JSX](#jsx) · [Props](#props) · [children](#children) · [key](#key) · [Renderizado condicional](#renderizado-condicional) · [Eventos](#eventos)

**Hooks de React**
[Reglas de los hooks](#reglas-de-los-hooks) · [useState](#usestate) · [useEffect](#useeffect) · [useCallback](#usecallback) · [useContext, createContext y Provider](#usecontext-createcontext-y-provider) · [Hooks personalizados](#hooks-personalizados) · [forwardRef](#forwardref)

**Formularios**
[Input controlado](#input-controlado)

**Next.js**
[App Router: page.tsx y layout.tsx](#app-router-pagetsx-y-layouttsx) · [Grupos de rutas: (public) y (private)](#grupos-de-rutas-public-y-private) · ['use client'](#use-client) · [Suspense](#suspense) · [usePathname](#usepathname) · [useRouter](#userouter) · [useSearchParams](#usesearchparams) · [Link](#link) · [Image](#image) · [Variables NEXT_PUBLIC_](#variables-next_public_)

---

## Lo básico de React

### Componente

**Qué es:** una función que retorna lo que se debe dibujar en pantalla. Su nombre empieza con mayúscula.

**Para qué sirve:** dividir la interfaz en piezas reutilizables. Un botón, una tarjeta o una página completa son componentes.

```tsx
export function Loading({ message = "Cargando..." }: LoadingProps) {
    return <p>{message}</p>;
}

// Se usa como si fuera una etiqueta HTML:
<Loading message="Cargando categorías..." />
```

**Dónde lo usamos:** en todo el proyecto. Los componentes reutilizables viven en `src/features/common/components/` (`Button`, `Input`, `Modal`, `Loading`…).

---

### JSX

**Qué es:** la sintaxis parecida a HTML que escribimos dentro de los componentes. No es HTML: se convierte en llamadas de JavaScript.

**Diferencias que debes recordar:**

| HTML | JSX |
|---|---|
| `class="..."` | `className="..."` |
| `for="..."` | `htmlFor="..."` |
| `onclick="..."` | `onClick={...}` |
| `style="color: red"` | `style={{ color: 'red' }}` |

Todo lo que va entre llaves `{ }` es JavaScript: `{user.name}`, `{isLoading ? ... : ...}`.

---

### Props

**Qué es:** los datos que un componente padre le entrega a un componente hijo. Son como los parámetros de una función.

**Regla clave:** las props son de **solo lectura**. El hijo no debe modificarlas; si algo tiene que cambiar, lo cambia el padre.

```tsx
// El padre decide qué mostrar...
<CategoryTable categories={categories.data} onEdit={openForm} onDelete={confirmDelete} />

// ...y el hijo solo lo recibe y lo dibuja
export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) { ... }
```

Una prop también puede ser una **función** (`onEdit`, `onDelete`). Así el hijo le avisa al padre que algo pasó, sin saber qué hará el padre con eso.

---

### children

**Qué es:** una prop especial con todo lo que se escribe **entre** la etiqueta de apertura y la de cierre de un componente.

```tsx
<RoleGuard roles={['admin']}>
  <CategoriesView />          {/* ← esto es children */}
</RoleGuard>
```

**Dónde lo usamos:** en los layouts (`{children}` es la página actual), en `Modal` (el contenido del modal) y en `RoleGuard` (la página que protege).

---

### key

**Qué es:** un identificador único que se pone a cada elemento cuando se dibuja una lista con `.map()`.

**Para qué sirve:** React lo usa para saber qué elemento es cuál entre un render y otro. Sin `key`, si la lista se reordena o se borra un elemento, React puede mezclar el estado de las filas.

```tsx
{categories.map((category) => (
    <tr key={category.id}>...</tr>
))}
```

> Usa el `id` del registro, **no** el índice del arreglo: el índice cambia cuando se elimina un elemento.

**Truco que usamos:** cambiar el `key` de un componente obliga a React a crearlo de cero. En `CategoriesView` el modal tiene `key={dialog.category?.id ?? "nueva"}` para que el formulario arranque con los valores de la categoría que se abrió.

---

### Renderizado condicional

**Qué es:** mostrar una cosa u otra según el estado.

```tsx
// Con if y return temprano
if (isLoading) return <Loading />;

// Con el operador ternario: una cosa u otra
{isLoading ? <Loading /> : <CategoryTable ... />}

// Con &&: mostrar algo solo si se cumple la condición
{successMessage && <Alert type="success" message={successMessage} />}
```

> Cuidado con `&&` y los números: `{lista.length && <Tabla />}` dibuja un `0` cuando la lista está vacía. Usa `lista.length > 0 && ...`.

---

### Eventos

**Qué es:** funciones que React ejecuta cuando el usuario hace algo: `onClick`, `onChange`, `onSubmit`.

```tsx
<button onClick={() => openForm(null)}>Nueva categoría</button>
```

Dos métodos del evento que usamos mucho:

| Método | Para qué |
|---|---|
| `event.preventDefault()` | En un `onSubmit`, evita que el navegador recargue la página (lo que hace un `<form>` por defecto). |
| `event.stopPropagation()` | Evita que el clic "suba" al elemento padre. En `Modal`, un clic dentro de la tarjeta no debe cerrar el modal. |

> Pasa la función, **no la ejecutes**: `onClick={guardar}` está bien; `onClick={guardar()}` la ejecuta al dibujar el botón.

---

## Hooks de React

Los **hooks** son funciones que empiezan con `use` y le dan "poderes" a un componente: guardar estado, ejecutar efectos, leer un contexto…

### Reglas de los hooks

1. **Solo se llaman en el nivel superior** del componente o de otro hook. Nunca dentro de un `if`, un `for` o una función interna.
2. **Solo se llaman desde componentes o hooks**, no desde funciones normales ni servicios.

React identifica cada hook por el **orden** en que se llama. Si un `if` hace que un hook se salte, el orden cambia y React mezcla los valores.

```tsx
// ❌ Mal
if (isAdmin) { const [x, setX] = useState(0) }

// ✅ Bien: el hook siempre se llama; la condición va después
const [x, setX] = useState(0)
if (!isAdmin) return null
```

---

### useState

**Qué es:** el hook que le da **memoria** a un componente. Guarda un valor y, cuando ese valor cambia, React vuelve a dibujar el componente.

```tsx
const [isMenuOpen, setMenuOpen] = useState(false);
//     ↑ valor actual  ↑ función para cambiarlo    ↑ valor inicial
```

**Tres cosas importantes:**

**1. Cambiar el estado no lo cambia "de inmediato".** El nuevo valor se ve en el siguiente render.

```tsx
setContador(contador + 1)
setContador(contador + 1)   // contador sigue valiendo lo mismo en esta línea → suma 1, no 2
```

**2. Si el nuevo valor depende del anterior, usa la forma de función:**

```tsx
setMenuOpen((open) => !open)            // en Navbar
setReloadKey((key) => key + 1)          // en useCategories
```

**3. Los objetos y arreglos no se modifican: se reemplazan por una copia.**

```tsx
// ❌ Mal: React no se entera del cambio
values.name = "Playa"

// ✅ Bien: copia (...prev) y cambia solo el campo
setValues((prev) => ({ ...prev, [field]: value }))   // en useCategoryForm
```

**Valor inicial calculado:** si calcularlo cuesta trabajo, pásale una función y React la ejecuta solo la primera vez:

```tsx
const [values, setValues] = useState(() => toFormValues(category))
```

---

### useEffect

**Qué es:** el hook para ejecutar código **después** de que el componente se dibuja: pedir datos a la API, escuchar el teclado, leer el `localStorage`…

```tsx
useEffect(() => {
    // 1. Lo que se ejecuta
    return () => {
        // 2. Limpieza (opcional)
    };
}, [dependencias]);   // 3. Cuándo se vuelve a ejecutar
```

**El arreglo de dependencias decide cuándo se ejecuta:**

| Dependencias | Cuándo se ejecuta |
|---|---|
| `[]` | Una sola vez, al montar el componente |
| `[page]` | Al montar y cada vez que cambia `page` |
| sin arreglo | Después de **cada** render (casi nunca es lo que quieres) |

**La función de limpieza** se ejecuta antes de volver a ejecutar el efecto y cuando el componente desaparece. Sirve para quitar listeners o ignorar respuestas viejas.

**Ejemplo del proyecto — cargar datos sin respuestas desordenadas** (`useCategories`):

```tsx
useEffect(() => {
    let isActive = true;
    const load = async () => {
        const data = await categoryService.getAll({ page, limit: PAGE_SIZE, name });
        if (isActive) setCategories(data);   // solo si este efecto sigue vigente
    };
    load();
    return () => { isActive = false };       // si cambia la página, se ignora la respuesta vieja
}, [page, name, reloadKey]);
```

Si el usuario pasa rápido de la página 2 a la 3 y la respuesta de la 2 llega tarde, la limpieza ya marcó `isActive = false` y esa respuesta no pisa los datos de la página 3.

**Errores comunes:**

- **El efecto no puede ser `async`.** Declara una función `async` adentro y llámala, como `load()` en el ejemplo.
- **Ciclo infinito:** un efecto sin dependencias que hace `setState` provoca un render, que ejecuta el efecto, que hace `setState`…
- **Olvidar una dependencia:** si el efecto usa `page` y no está en el arreglo, no se vuelve a ejecutar cuando `page` cambia.

---

### useCallback

**Qué es:** un hook que **memoriza una función** para que sea la misma entre renders, mientras no cambien sus dependencias.

**Por qué importa:** en cada render, todas las funciones declaradas dentro de un componente se crean de nuevo. Para JavaScript, dos funciones con el mismo código son **distintas** (`() => {} !== () => {}`). Eso importa cuando la función está en las dependencias de un `useEffect`: el efecto creería que cambió y se volvería a ejecutar en cada render.

```tsx
// En useAuth
const logout = useCallback(() => {
    tokenStorage.clear();
    setState({ isLoading: false, error: null, user: null, isAuthenticated: false });
}, []);   // sin dependencias: siempre es la misma función
```

**Cuándo usarlo:**

- Cuando la función está en las dependencias de un `useEffect`.
- Cuando se pasa a un componente hijo optimizado con `React.memo`.

**Cuándo no hace falta:** en la mayoría de los manejadores de eventos (`onClick={() => ...}`). Agregarlo en todas partes no hace la app más rápida.

> Ejemplo para analizar: `Modal` tiene un `useEffect` que depende de `onClose`. Como `closeDialog` en `CategoriesView` no usa `useCallback`, el listener de Escape se quita y se vuelve a poner en cada render. Funciona, pero es justo el caso que `useCallback` resuelve.

---

### useContext, createContext y Provider

**El problema:** el panel privado necesita el usuario de la sesión en muchos lugares: el menú, el encabezado, cada página. Pasarlo por props de componente en componente ("prop drilling") se vuelve inmanejable.

**La solución:** un **contexto**, una especie de "variable compartida" para todos los componentes que están dentro de él.

Son tres piezas:

| Pieza | Qué hace | En el proyecto |
|---|---|---|
| `createContext()` | Crea el contexto | `SessionContext` en `dashboard/context/SessionContext.tsx` |
| `<Contexto.Provider value={...}>` | Comparte un valor con todo lo que tiene dentro | `PrivateLayout` envuelve el panel con `<SessionContext.Provider value={{ user, logout }}>` |
| `useContext(Contexto)` | Lee ese valor desde cualquier componente de adentro | `useSession()`, que usa `useContext(SessionContext)` |

```tsx
// 1. Crear el contexto (null = todavía no hay sesión)
export const SessionContext = createContext<Session | null>(null);

// 2. Compartir el valor (PrivateLayout)
<SessionContext.Provider value={{ user, logout: handleLogout }}>
    {children}
</SessionContext.Provider>

// 3. Leerlo desde cualquier página del panel
const { user } = useSession();
```

**`useSession` en lugar de `useContext` directo:** envolvemos `useContext` en un hook propio que además avisa con un error claro si se usa fuera del panel privado. Así cada página escribe `useSession()` y no tiene que importar el contexto.

> Cuando el `value` del Provider cambia, **todos** los componentes que lo leen se vuelven a dibujar. Por eso en un contexto va información que cambia poco, como la sesión.

---

### Hooks personalizados

**Qué es:** una función nuestra que empieza con `use` y usa otros hooks adentro.

**Para qué sirve:** sacar la lógica de los componentes. El componente queda solo dibujando y la lógica se puede reutilizar.

| Hook | Responsabilidad |
|---|---|
| `useAuth` | La sesión: login, logout y leer el token guardado |
| `useLoginForm`, `useRegisterForm`, `useCategoryForm` | Los campos de un formulario y su validación |
| `useCategories`, `useListings`, `useUsers` | Cargar una lista desde la API |
| `useCategoryActions` | Crear, editar y eliminar, con su estado de carga y error |
| `useSession` | Leer la sesión dentro del panel |

> Un hook personalizado **no comparte estado** entre componentes: cada componente que llama `useAuth()` tiene su propia copia. Para compartir estado se usa un contexto.

---

### forwardRef

**Qué es:** permite que un componente reciba una `ref` y la pase a un elemento HTML interno.

**Para qué sirve:** que el padre pueda acceder al `<input>` real, por ejemplo para darle foco con `ref.current.focus()`.

**Dónde lo usamos:** en `common/components/Input.tsx`.

---

## Formularios

### Input controlado

**Qué es:** un campo cuyo valor lo maneja React con estado, no el navegador.

```tsx
<input
    name="name"
    value={values.name}           // React decide qué se muestra
    onChange={handleChange}       // cada tecla actualiza el estado
/>
```

**Dos reglas:**

1. Un input con `value` **necesita** `onChange`. Sin él, el usuario no puede escribir: React lo vuelve a dibujar siempre con el mismo valor.
2. El atributo `name` debe coincidir con la propiedad del estado. Así un solo `handleChange` sirve para todos los campos: `[event.target.name]: event.target.value`.

**Por qué usarlo:** el valor siempre está en el estado, listo para validarlo mientras se escribe y para enviarlo a la API.

---

## Next.js

### App Router: page.tsx y layout.tsx

En Next.js **las carpetas de `app/` son las rutas**:

| Archivo | Crea |
|---|---|
| `app/(public)/page.tsx` | La página `/` |
| `app/(public)/login/page.tsx` | La página `/login` |
| `app/(private)/dashboard/categories/page.tsx` | La página `/dashboard/categories` |

Archivos con nombre especial:

| Archivo | Para qué |
|---|---|
| `page.tsx` | El contenido de una ruta. Sin `page.tsx`, la carpeta no es una ruta. |
| `layout.tsx` | La estructura que envuelve a todas las páginas de esa carpeta y de sus subcarpetas. Recibe la página como `children`. No se vuelve a montar al navegar entre páginas que lo comparten. |
| `not-found.tsx` | La página que se muestra cuando la ruta no existe (404). |

Los layouts se **anidan**: la página de categorías se dibuja dentro de `app/(private)/layout.tsx`, que a su vez se dibuja dentro de `app/layout.tsx`.

---

### Grupos de rutas: (public) y (private)

**Qué es:** una carpeta con el nombre **entre paréntesis** agrupa páginas **sin aparecer en la URL**.

```
app/
├── layout.tsx              → html, fuentes y fondo: TODAS las páginas
├── (public)/
│   ├── layout.tsx          → barra de navegación pública + pie de página
│   ├── page.tsx            → /
│   ├── login/page.tsx      → /login           (no /public/login)
│   └── register/page.tsx   → /register
└── (private)/
    ├── layout.tsx          → exige sesión + menú lateral
    └── dashboard/
        ├── page.tsx        → /dashboard
        ├── users/          → /dashboard/users
        └── categories/     → /dashboard/categories
```

**Para qué sirve:** darle un layout distinto a cada grupo de páginas. Las públicas comparten la barra de navegación; las privadas comparten el menú lateral y la verificación de sesión. Una página nueva hereda el layout de la carpeta donde se crea, sin repetir código.

> El layout privado protege la **experiencia**: si no hay sesión, lleva al login. La protección **real** la hace la API, respondiendo 401 o 403.

---

### 'use client'

**Qué es:** una línea al inicio del archivo que marca el componente como **de cliente**: se ejecuta en el navegador.

En el App Router, los componentes son **de servidor por defecto**: se ejecutan en el servidor y al navegador solo llega el HTML.

| Necesita `'use client'` | No lo necesita |
|---|---|
| Usa hooks (`useState`, `useEffect`, `useContext`…) | Solo recibe props y dibuja |
| Tiene eventos (`onClick`, `onChange`…) | Un `layout.tsx` que exporta `metadata` |
| Usa APIs del navegador (`localStorage`, `window`) | |

**Ejemplo:** `Loading` no tiene hooks ni eventos, así que funciona en los dos lados. `Navbar` usa `useState` y `usePathname`, así que necesita `'use client'`.

---

### Suspense

**Qué es:** un componente de React que muestra un contenido de reemplazo (`fallback`) mientras lo que tiene dentro todavía no está listo.

```tsx
<Suspense fallback={<Loading />}>
    <CategoriesView />
</Suspense>
```

**Para qué lo usamos en Next.js:** los componentes que leen la URL con `useSearchParams()` deben ir dentro de un `<Suspense>`. Los parámetros de la URL solo se conocen cuando llega la petición del navegador; con `Suspense`, Next puede preparar el resto de la página y mostrar el `fallback` mientras tanto.

Qué pasa si se omite (según la documentación de Next.js 16):

- En una **página estática**, `next build` falla con el error *"Missing Suspense boundary with useSearchParams"*.
- En una página dinámica no falla, pero toda la página se dibuja en el navegador en lugar de enviarse ya armada desde el servidor.

La documentación lo **recomienda siempre** para que el resto de la página pueda prepararse en el servidor.

**Dónde lo usamos:** en `app/(public)/page.tsx` y en las páginas de `dashboard/users` y `dashboard/categories`.

---

### usePathname

**Qué es:** un hook de `next/navigation` que retorna la **ruta actual**, sin el dominio ni los parámetros.

```tsx
const pathname = usePathname();   // en /dashboard/categories?page=2 → "/dashboard/categories"
```

**Dónde lo usamos:** en `Navbar` y en el menú de `PrivateLayout`, para resaltar la opción de la página actual:

```tsx
const isActive = pathname === item.href;
```

---

### useRouter

**Qué es:** un hook de `next/navigation` para **navegar desde código**, sin que el usuario haga clic en un enlace.

| Método | Qué hace |
|---|---|
| `router.push('/ruta')` | Navega y agrega la página al historial (el botón "atrás" vuelve) |
| `router.replace('/ruta')` | Navega **reemplazando** la página actual en el historial |
| `router.back()` | Vuelve a la página anterior |

**Cuándo usar `replace`:** en las redirecciones. En `PrivateLayout`, si no hay sesión se hace `router.replace("/login")`: si fuera `push`, el botón "atrás" llevaría otra vez a la página privada, que volvería a redirigir al login.

> Importa `useRouter` desde `next/navigation`, no desde `next/router` (ese es del Pages Router, la versión anterior de Next).

---

### useSearchParams

**Qué es:** un hook de `next/navigation` para **leer** los parámetros de la URL (lo que va después del `?`).

```tsx
// URL: /dashboard/categories?page=2&name=playa
const searchParams = useSearchParams();
const page = Number(searchParams.get("page") ?? 1);   // 2
const name = searchParams.get("name") ?? "";          // "playa"
```

**Para qué sirve guardar la página y la búsqueda en la URL:** si el usuario recarga, comparte el link o usa "atrás", vuelve a ver exactamente lo mismo.

**Es de solo lectura.** Para cambiar un parámetro se arma una copia y se navega con el router:

```tsx
const params = new URLSearchParams(searchParams);   // copia con los parámetros actuales
params.set("page", "3");                            // cambia solo page; name se conserva
router.push(`${pathname}?${params.toString()}`);
```

> Si escribes `new URLSearchParams()` sin argumento, partes de cero y se pierden los demás parámetros, como la búsqueda.

Recuerda: un componente que usa `useSearchParams` debe ir dentro de [`Suspense`](#suspense).

---

### Link

**Qué es:** el componente de Next.js para enlaces internos. Reemplaza a `<a href>`.

```tsx
<Link href="/dashboard/categories">Categorías</Link>
```

**Diferencia con `<a>`:** `Link` navega sin recargar toda la página (solo cambia lo necesario) y precarga las páginas enlazadas. Un `<a href>` interno recarga todo y se pierde el estado de React.

| Usa `Link` | Usa `router.push` |
|---|---|
| El usuario hace clic en un enlace visible | La navegación es consecuencia de una lógica (después de guardar, de iniciar sesión…) |

---

### Image

**Qué es:** el componente de Next.js para imágenes. Reemplaza a `<img>`.

**Para qué sirve:** optimiza automáticamente las imágenes (tamaño, formato y carga diferida), lo que mejora la velocidad de la página.

**Dónde lo usamos:** en `ListingCard`. Las imágenes de dominios externos deben estar permitidas en `next.config.ts`.

Hay dos formas de permitirlas:

| Opción | Cómo funciona |
|---|---|
| `images.domains: ['images.unsplash.com']` | La que usa este proyecto: permite un nombre de dominio completo. Es simple, pero no permite restringir protocolo, puerto ni ruta. |
| `images.remotePatterns` | Más precisa: se puede limitar el protocolo (`https`), el dominio y la ruta. Es la recomendada para proyectos reales. |

---

### Variables NEXT_PUBLIC_

**Qué es:** las variables de entorno que empiezan con `NEXT_PUBLIC_` se incluyen en el código que llega al navegador.

```ts
// src/features/common/config.ts
export const API_BASE_URL = process.env['NEXT_PUBLIC_API_HOST'] || "http://localhost:3001/api"
```

**Regla de seguridad:** todo lo que lleva `NEXT_PUBLIC_` lo puede ver **cualquier usuario** en las herramientas del navegador.

| ✅ Puede ser `NEXT_PUBLIC_` | ❌ Nunca debe estar en el frontend |
|---|---|
| La URL de la API | `JWT_SECRET` |
| | La cadena de conexión a la base de datos |
| | Contraseñas o llaves privadas |

Si cambias una variable `NEXT_PUBLIC_`, reinicia `npm run dev`: su valor se fija al compilar.

---

> **Sobre este documento:** los conceptos de Next.js se verificaron contra la documentación instalada con el proyecto (`node_modules/next/dist/docs/`, Next.js 16.3). Si algo no coincide con lo que ves, esa carpeta es la fuente más confiable.

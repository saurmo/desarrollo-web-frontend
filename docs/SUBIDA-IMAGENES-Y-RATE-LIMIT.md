# Subida de imágenes y rate limit (frontend)

Este documento explica la pantalla **Panel → Propiedades** (`/dashboard/listings`), que crea
propiedades con fotos, y el rate limit del frontend. La parte del backend (bucket S3 de
Supabase, multer y `express-rate-limit`) está en el README de `desarrollo-web-backend`.

---

## 1. El recorrido de una foto

```
<input type="file">           el usuario elige una foto de 5 MB y 4000 px
   │
   ▼
usePhotoSelection             valida el tipo (JPG, PNG, WEBP) y la cantidad
   │  compressImage()         la reduce a 1600 px en WEBP (~300–500 KB) con un <canvas>
   ▼                          URL.createObjectURL() → vista previa sin subir nada todavía
ListingFormModal              el usuario llena los campos y pulsa "Crear propiedad"
   │
   ▼
listingService.create()       arma un FormData: campos de texto + archivos en "photos"
   │  apiRequest()            con FormData NO pone Content-Type: lo arma el navegador
   ▼
POST /api/listings            la API sube las fotos al bucket y guarda las URLs en la base
```

| Archivo | Qué hace |
|---|---|
| `src/features/common/utils/compress-image.ts` | Reduce la imagen en el navegador |
| `src/features/listings/hooks/usePhotoSelection.ts` | Fotos elegidas: validación, compresión y vista previa |
| `src/features/listings/hooks/useListingForm.ts` | Campos de texto y sus validaciones (las mismas del DTO) |
| `src/features/listings/hooks/useListingActions.ts` | Crear, agregar fotos y eliminar |
| `src/features/listings/services/linting.service.ts` | Arma el `FormData` y llama a la API |
| `src/features/listings/components/PhotoPicker.tsx` | Caja para elegir fotos con vista previa |
| `src/features/listings/components/ListingsAdminView.tsx` | Une todo: tabla, modales y mensajes |

## 2. Conceptos clave

**`multipart/form-data`.** JSON solo transporta texto. Para enviar archivos se usa `FormData`:

```ts
const form = new FormData();
form.append("name", "Cabaña en Guatapé");
form.append("price", "250000");        // todo viaja como texto
form.append("photos", archivo1);       // el mismo nombre varias veces = arreglo de archivos
form.append("photos", archivo2);
await fetch(url, { method: "POST", body: form });   // ¡sin Content-Type!
```

Si escribes `Content-Type: multipart/form-data` a mano, falta el `boundary` (el separador entre
campos) y la API no puede leer el cuerpo. Con `FormData`, el navegador pone el header completo.

**¿Por qué reducir la foto en el navegador?**
- Vercel rechaza peticiones de más de **4.5 MB**: dos fotos de celular ya lo superan.
- Subir 400 KB en lugar de 5 MB es mucho más rápido con datos móviles.
- El canvas copia solo los píxeles: se eliminan los metadatos EXIF, **incluida la ubicación GPS** de la foto.

**Vista previa con `URL.createObjectURL(file)`.** Crea una URL `blob:` local para mostrar la
imagen antes de subirla. Esa memoria no se libera sola: hay que llamar `URL.revokeObjectURL`
al quitar la foto o al cerrar el modal (lo hace `usePhotoSelection`). Se usa `<img>` y no
`next/image`, porque Next no puede optimizar una URL `blob:`.

**`next/image` y `remotePatterns`.** `next/image` solo muestra imágenes externas de los
orígenes declarados en `next.config.ts`. Por eso está el bucket de Supabase
(`*.supabase.co/storage/v1/object/public/**`). La opción `domains` está obsoleta.

**Validar en los dos lados.** El frontend revisa tipo, tamaño y cantidad para avisar rápido;
la API revisa lo mismo porque cualquiera puede saltarse el frontend con Postman o curl.

| Regla | Valor |
|---|---|
| Tipos | JPG, PNG, WEBP |
| Peso por imagen (ya reducida) | 1 MB |
| Imágenes por petición | 4 |
| Fotos por propiedad | 10 |

## 3. Rate limit

Hay dos capas, y cada una protege algo distinto:

| Dónde | Archivo | Protege | Límite |
|---|---|---|---|
| Backend | `desarrollo-web-backend/src/interface/middlewares/rate-limit.middleware.ts` | La API: login, subidas, consultas | 300/15 min por IP; login 10 fallos/15 min; subidas 30/hora por usuario |
| Frontend | `proxy.ts` + `src/features/common/rate-limit/rate-limiter.ts` | El servidor de Next (las páginas) | 300 páginas/min por IP |

**El `proxy.ts` no protege la API**: el navegador llama a la API directamente, sin pasar por
Next. En Next.js 16, `middleware.ts` se llama **`proxy.ts`** y va en la raíz del proyecto,
al lado de `app/`. El límite es alto porque los `<Link>` piden páginas por adelantado
(*prefetch*) y cada una cuenta.

**Cuando la API responde 429**, `getApiErrorMessage` (en `api-error.ts`) muestra el mensaje de
la API y lee el header `Retry-After` para decir cuánto esperar:

> Demasiados intentos fallidos de inicio de sesión. Podrás intentar de nuevo en 15 minutos.

El frontend solo puede leer `Retry-After` porque la API lo expone en CORS
(`exposedHeaders` en `app.ts`). Sin eso, `response.headers.get("Retry-After")` devuelve `null`.

**Limitación de los dos rate limits:** los contadores viven en memoria. Se reinician con cada
despliegue y, en Vercel, cada instancia lleva su propia cuenta. Para un límite exacto entre
instancias se necesita un *store* compartido como Redis.

## 4. Ejercicios

1. Muestra en `ListingCard` un contador "1/3" sobre la foto actual.
2. Permite borrar una foto de una propiedad: endpoint `DELETE /api/listings/:id/photos` en el
   backend (que borre también el archivo del bucket con `IFileStorage.remove`) y un botón en el frontend.
3. Muestra una barra de progreso mientras suben las fotos. Pista: `fetch` no informa el
   progreso de subida; `XMLHttpRequest` sí (`xhr.upload.onprogress`).
4. Abre DevTools → Network, crea una propiedad y revisa la petición: el `Content-Type` con su
   `boundary`, los campos del formulario y los headers `RateLimit` de la respuesta.

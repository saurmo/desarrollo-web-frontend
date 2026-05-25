# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [Unreleased]

### Added — Roles, protección de rutas y vistas separadas

- Dashboard del **donante** en `app/dashboard/donante/`:
  - `/dashboard/donante` — lista de donaciones propias (componente `DonantePage`) con totales y últimos aportes.
  - `/dashboard/donante/nueva` — formulario para registrar una donación (componente `NuevaDonacionPage`); el `userId` lo asigna el backend desde el JWT.
- Dashboard del **admin** en `app/dashboard/admin/`:
  - `/dashboard/admin` — vista general con métricas (componente `AdminHomePage`).
  - `/dashboard/admin/donaciones` — tabla con todas las donaciones e info de cada donante (componente `AdminDonacionesPage`).
  - `/dashboard/admin/usuarios` — gestión de usuarios existente, ahora bajo el subárbol del admin.
- `DashboardLayout` filtra los ítems del sidebar según `role` del JWT y muestra "Donante" o "Administrador" como subtítulo.
- Hooks de aplicación nuevos:
  - `useMisDonaciones()` — `GET /api/v1/donations/mine`.
  - `useTodasDonaciones()` — `GET /api/v1/donations`.
- `useAuth()` ahora expone `isAdmin`, `isDonante` y `ready`; decodifica el rol del JWT.

### Added — `proxy.ts` (Next.js 16)

- Reemplaza `middleware.ts` siguiendo la convención de Next 16 (Middleware → Proxy).
- Decodifica el JWT desde la cookie `auth_token` para chequeos optimistas de rol:
  - `/dashboard/admin/*` → redirige a `/dashboard/donante` si el rol no es `admin`.
  - `/dashboard/donante/*` → redirige a `/login` si el rol no es `donante` ni `admin`.
  - `/dashboard` → redirige a `/dashboard/admin` o `/dashboard/donante` según rol.
- Verifica expiración (`exp`) del token y redirige a `/login` si está vencido o ausente.
- **Nota de seguridad:** el proxy no valida la firma del JWT (corre en edge sin acceso a `jsonwebtoken`); la autorización real la sigue haciendo el backend en cada request. El proxy solo evita renderizar UI que no le corresponde al usuario.

### Changed — Alineación con backend refactorizado

- Endpoints actualizados a las nuevas rutas en inglés:
  - `/api/v1/login` → `/api/v1/auth/login`.
  - `/api/v1/register` → `/api/v1/auth/register`.
  - `/api/v1/donaciones` → `/api/v1/donations`.
  - `/api/v1/usuarios` → `/api/v1/users`.
- Modelos del dominio en inglés:
  - `Usuario`: `nombre/apellidos` → `name/lastName`; agrega `role`, `profilePhoto`, `createdAt`.
  - `LoginResponse` y `RegisterResponse` incluyen el `user` completo (no solo el token).
  - `DonacionRequest` ya no acepta `user_id` (el backend lo deriva del JWT).
  - `DonacionResponse` con `userId`, `description`, `receiptUrl`, `createdAt` en inglés; tipos auxiliares `DonacionWithDonor` y `DonacionDonor`.
- `useLogin` y `useRegister` devuelven el `UserRole` recibido (en lugar de un booleano) para que los formularios redirijan al dashboard correcto.
- `LoginForm` y `RegisterForm` redirigen a `/dashboard/admin` o `/dashboard/donante` según el rol.
- `tokenStorage` extiende la duración de la cookie a 24h (alineado con `expiresIn: '1d'` del backend) y maneja SSR (`window === 'undefined'` → `null`).
- `UsuariosPage` reescrita: usa `useUsuarios()` con la API en inglés, muestra `role` con badge y soporta editar/eliminar.
- `ListaUsuarios` / `ItemUsuario` desacoplados del modelo `Usuario` del dominio (usan el tipo local `UsuarioExterno` para `jsonplaceholder`).

### Removed

- `middleware.ts` (renombrado a `proxy.ts` por convención de Next 16).
- `app/dashboard/page.tsx`, `app/dashboard/donaciones/`, `app/dashboard/usuarios/` (sustituidos por las rutas separadas por rol).
- `components/dashboard/DashboardHome.tsx`, `components/dashboard/pages/DonacionesPage.tsx` (reemplazados por `DonantePage`, `NuevaDonacionPage`, `AdminHomePage`, `AdminDonacionesPage`).

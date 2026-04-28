# API Documentation

**Base URL:** `http://localhost:3001/api/v1`  
**Formato de respuestas:** JSON  
**Autenticación:** JWT Bearer Token _(actualmente desactivada en el servidor — todas las rutas son públicas)_

---

## Autenticación

Los endpoints de auth devuelven un `token` JWT. Una vez implementada la protección de rutas, ese token debe enviarse en el header de cada petición protegida:

```
Authorization: Bearer <token>
```

El token tiene una duración de **1 hora**.

---

## Endpoints

### Auth

#### `POST /login`

Inicia sesión con email y contraseña.

**Request body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Response `200 OK`:**
```json
{
  "data": {
    "token": "<jwt>"
  }
}
```

**Response `401 Unauthorized`:**
```json
{
  "message": "Credenciales inválidas"
}
```

---

#### `POST /register`

Registra un nuevo usuario y devuelve el token junto con los datos del usuario creado.

**Request body:**
```json
{
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "email": "juan@ejemplo.com",
  "password": "contraseña",
  "acepta_terminos": true
}
```

**Response `201 Created`:**
```json
{
  "data": {
    "token": "<jwt>",
    "usuario": {
      "id": "uuid",
      "nombre": "Juan",
      "apellidos": "Pérez García",
      "email": "juan@ejemplo.com",
      "acepta_terminos": true,
      "created_at": "2026-04-28T12:00:00.000Z",
      "updated_at": "2026-04-28T12:00:00.000Z"
    }
  }
}
```

**Response `409 Conflict`:**
```json
{
  "message": "El correo ya está registrado"
}
```

---

### Usuarios

#### `GET /usuarios`

Devuelve la lista de todos los usuarios. La contraseña nunca se incluye en las respuestas.

**Response `200 OK`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Juan",
      "apellidos": "Pérez García",
      "email": "juan@ejemplo.com",
      "created_at": "2026-04-28T12:00:00.000Z"
    }
  ]
}
```

---

#### `POST /usuarios`

Crea un nuevo usuario directamente (sin devolver token, a diferencia de `/register`).

**Request body:**
```json
{
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "email": "juan@ejemplo.com",
  "password": "contraseña",
  "acepta_terminos": true
}
```

**Response `201 Created`:**
```json
{
  "data": {
    "id": "uuid",
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "email": "juan@ejemplo.com",
    "acepta_terminos": true,
    "created_at": "2026-04-28T12:00:00.000Z",
    "updated_at": "2026-04-28T12:00:00.000Z"
  }
}
```

**Response `409 Conflict`:**
```json
{
  "message": "El correo ya está registrado"
}
```

---

#### `GET /usuarios/:id`

Devuelve un usuario por su ID.

**URL params:**
| Param | Tipo | Descripción |
|-------|------|-------------|
| `id`  | UUID | ID del usuario |

**Response `200 OK`:**
```json
{
  "data": {
    "id": "uuid",
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "email": "juan@ejemplo.com",
    "created_at": "2026-04-28T12:00:00.000Z"
  }
}
```

**Response `404 Not Found`:**
```json
{
  "message": "Usuario no encontrado"
}
```

---

#### `PUT /usuarios/:id`

Actualiza parcialmente un usuario. Todos los campos del body son opcionales.

**URL params:**
| Param | Tipo | Descripción |
|-------|------|-------------|
| `id`  | UUID | ID del usuario |

**Request body** _(todos opcionales)_**:**
```json
{
  "nombre": "Juan Carlos",
  "apellidos": "Pérez García",
  "email": "nuevo@ejemplo.com"
}
```

**Response `200 OK`:**
```json
{
  "data": {
    "id": "uuid",
    "nombre": "Juan Carlos",
    "apellidos": "Pérez García",
    "email": "nuevo@ejemplo.com",
    "created_at": "2026-04-28T12:00:00.000Z",
    "updated_at": "2026-04-28T12:30:00.000Z"
  }
}
```

**Response `404 Not Found`:**
```json
{
  "message": "Usuario no encontrado"
}
```

---

#### `DELETE /usuarios/:id`

Elimina un usuario por su ID.

**URL params:**
| Param | Tipo | Descripción |
|-------|------|-------------|
| `id`  | UUID | ID del usuario |

**Response `200 OK`:**
```json
{
  "message": "Usuario eliminado correctamente"
}
```

**Response `404 Not Found`:**
```json
{
  "message": "Usuario no encontrado"
}
```

---

### Productores

#### `POST /productores`

Crea un nuevo productor.

**Request body:**
```json
{
  "nombre": "Empresa S.A.",
  "nro_empleados": 50
}
```

**Response `200 OK`:**
```json
{
  "data": {
    "id": "uuid",
    "nombre": "Empresa S.A.",
    "nro_empleados": 50,
    "created_at": "2026-04-28T12:00:00.000Z"
  },
  "message": "Productor creado"
}
```

---

### Donaciones

#### `POST /donaciones`

Registra una nueva donación.

**Request body:**
```json
{
  "user_id": "uuid",
  "total": 100.50,
  "descripcion": "Donación mensual"
}
```

> Todos los campos son opcionales. `user_id` debe ser el UUID de un usuario existente si se proporciona.

**Response `200 OK`:**
```json
{
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "total": "100.50",
    "descripcion": "Donación mensual",
    "created_at": "2026-04-28T12:00:00.000Z"
  },
  "message": "Donación creada"
}
```

---

## Códigos de estado

| Código | Significado |
|--------|-------------|
| `200`  | OK — operación exitosa |
| `201`  | Created — recurso creado |
| `401`  | Unauthorized — credenciales inválidas |
| `404`  | Not Found — recurso no encontrado |
| `409`  | Conflict — el recurso ya existe (ej. email duplicado) |
| `500`  | Internal Server Error |

---

## Estructura de respuesta

Todas las respuestas siguen el mismo patrón:

**Éxito:**
```json
{
  "data": { },
  "message": "mensaje opcional"
}
```

**Error:**
```json
{
  "message": "descripción del error"
}
```

---

## Variables de entorno requeridas

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
SECRET_KEY="clave-secreta-para-jwt"
```

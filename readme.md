

- Hacer un login en la parte grafica, donde use un hook que invoque un api http://localhost:3001/api/v1/login, donde en la respuesta de retornar un json con un data, y dentro del data un token de jwt para guardar en localstorage y enviarlo en otras peticiones. Usar clean arquitectura, fetch o axios para el llamado al pi
 
-  Crear en la pagina principal una landing con información sobre una fundación de cacao que se llame 

-  Necesito hacer una pagina para el registro de usuarios, con los campos nombre, apellidos, correo, contraseña, acepta terminos y condiciones

```sql
CREATE TABLE usuarios (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre      VARCHAR(100)  NOT NULL,
  apellidos   VARCHAR(150)  NOT NULL,
  email       VARCHAR(255)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  acepta_terminos BOOLEAN   NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Índice para búsquedas por email (login)
CREATE INDEX idx_usuarios_email ON usuarios (email);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_usuarios_updated_at
  BEFORE UPDATE ON usuarios
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

```



Mi proyecto usar clean architecture tanto en desarrollo-web-front como en desarrollo-web-backend
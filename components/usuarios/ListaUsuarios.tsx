'use client';

import { useEffect, useState } from 'react';
import ItemUsuario from './ItemUsuario';

export interface UsuarioExterno {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuarioExterno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error al cargar los usuarios: {error}</div>;
  }

  if (usuarios.length === 0) {
    return <div>No hay usuarios</div>;
  }

  return (
    <div>
      <h1>Lista de Usuarios {usuarios.length}</h1>
      <ul className="list-disc list-inside">
        {usuarios.map((usuario) => (
          <ItemUsuario usuario={usuario} key={usuario.id} />
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;

import { UsuarioExterno } from './ListaUsuarios';

const ItemUsuario = (params: { usuario: UsuarioExterno }) => {
  return (
    <li className="list-item" id={params.usuario.id.toString()}>
      <p>{params.usuario.name}</p> <code>{params.usuario.email}</code>
    </li>
  );
};

export default ItemUsuario;

import ListaUsuarios from "@/components/usuarios/ListaUsuarios";

const UsuariosPage = () => {
    
    return (
        <div className="flex flex-col flex-1 items-center justify-start">
            <h1 className="text-2xl font-bold pt-10">Página de Usuarios</h1>
            <ListaUsuarios />
        </div>
    )
}

export default UsuariosPage;
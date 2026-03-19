import Activo from "@/components/Activo";
import Contador from "@/components/Contador";
import Nombre from "@/components/Nombre";

const EstadosPage = () => {

    return (
        <div className="flex flex-col flex-1 items-center justify-start">
            <h1>Estados</h1>
            <br />
            <h2>Ejemplo deContador</h2>
            <Contador />
            <br />
            <h2>Ejemplo de Nombre</h2>
            <Nombre />
            <br />
            <h2>Ejemplo de Activo</h2>
            <Activo />
        </div>
    )
}

export default EstadosPage;
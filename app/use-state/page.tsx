// Pagina de ejemplos 
import Contador from "@/components/use-state/Contador";
import Nombre from "@/components/use-state/Nombre";
import Activo from "@/components/use-state/Activo";

const UseStatePage = () => {

    return (
        <div className="flex flex-col flex-1 items-center justify-start">
            <h1 className="text-2xl font-bold pt-10">Página de ejemplos de Use State</h1>
            <Contador />
            <br />
            <Contador />
            <br />
            <Nombre />
            <br />
            <Activo />
        </div>
    )

    
}

export default UseStatePage;
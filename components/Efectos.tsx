'use client';

import { useEffect } from "react";

const Efectos = () => {

    

    // Ejecuta el efecto cuando el componente se monta (mount)
    useEffect(() => {
        console.log("Se cargó el componente");
    }, []);


    return (
        <div>
            <p>Componente de Efecto</p>
        </div>
    )
}

export default Efectos;

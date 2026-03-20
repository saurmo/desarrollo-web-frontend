"use client";
import { useState, useEffect } from "react";


const Contador = () => {

    const [contador, setContador] = useState(0);

        useEffect(() => {
            console.log("El contador ha cambiado a: ", contador);
        }, [contador]);

    return (
        <div>
            <h1>Componente Contador</h1>

            <div className="flex gap-2">
                {/* Botones para sumar y restar */}
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={ ()=> setContador(contador + 1) }>Sumar</button>
                <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onClick={() => setContador(contador - 1)}>Restar</button>
                <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600" onClick={() => setContador(0)}>Reset</button>
            </div>
            {/* Mostrar el valor actual del contador */}
            <p>Valor actual: {contador}</p>
        </div>
    )
}

export default Contador;
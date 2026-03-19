"use client";
import { useEffect, useState } from "react";


const Contador = () => {

    const [contador, setContador] = useState(0);

    useEffect(() => {
        console.log("Se cambió el valor del contador");
    }, [contador]);


    return (
        <div>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={() => setContador(contador + 1)} >Contador</button>
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={() => setContador(0)} >Reset</button>
            </div>
            <p>Contador: {contador}</p>
        </div>
    )

}

export default Contador;


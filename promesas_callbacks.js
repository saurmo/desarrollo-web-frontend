
const imprimir = (mensaje) => {
    console.log(mensaje);
}

imprimir("Hola mundo")

const estudiantes = ["Juan", "Carlos", "Sara", "Maria"]

// estudiantes.forEach((estudiante) => {
//     imprimir(estudiante)
// })
function imprimirEstudiante(estudiante) {
    imprimir(estudiante)
}
estudiantes.forEach(imprimirEstudiante)

estudiantes.forEach((x) => imprimir(x))

// for (let index = 0; index < estudiantes.length; index++) {
//     imprimir(estudiantes[index])
// }

function consultarUniversidad(callbackEstudiantes) {
    const universidades = [{ id: 1, nombre: "udem" }, { id: 2, nombre: "udea" }]
    universidades.forEach(x => {
        const estudiantes = callbackEstudiantes(x.id)
        console.log(x.nombre, estudiantes);
    })
}

function consultarEstudiantes(idUniversidad) {
    return [
        { u: 1, id: 1, nombre: "Juan" },
        { u: 2, id: 2, nombre: "Sara" }
    ].filter(x => x.u == idUniversidad)
}
function main() {
    // Consulta de universidad
    // const u=1;
    // consultarUniversidad(consultarEstudiantes)
    // consultarEstudiantes(u)
    consultarUniversidad((idU) => {
        console.log(idU, consultarEstudiantes(idU));

    })
}
main()


const consultarUniversidad2 = () => {
    return new Promise((resolve) => {
        setTimeout(resolve([{ id: 1, nombre: "udem" }, { id: 2, nombre: "udea" }]), 1000)

    })
}

consultarUniversidad2().then(resultado => console.log("resultado", resultado))
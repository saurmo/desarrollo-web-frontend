// Ejemplos de javascript
// Comentario de linea
/**
 * Comentario de bloque
 */
console.log("Hola Mundo")
console.log("-------");
let nombre = "Juan"
let apellido = "Pardo"
const edad = 55;
const esEstudiante = false
const altura = 1.70
//List -> Array
const semestres = []
// Diccionarios -> Objecto -> JSON (Javascript Object Notation)  
const materiaPreferida = { nombre: "Calculo", id: 0 }
// null - undefined
const universidad = null
const carrera = undefined;

console.log("Tipo de dato de nombre:" + typeof nombre);
console.log("Tipo de dato de edad:" + typeof edad);

console.log("---- Conversión de string a number ---");
const precioMatricula = "5000000.5"
console.log("Entero " + parseInt(precioMatricula));
console.log("Flotante " + parseFloat(precioMatricula));

console.log("---- == & === ---");
console.log("Doble igual: ", "45" == 45); //  TRUE  // VALOR
console.log("Triple igual: ", "45" === 45); //  FALSE // VALOR Y TIPO

console.log("---- concatenacion ---");
console.log(nombre + " " + apellido);
console.log(`${nombre} ${apellido}`);

console.log("---- operador ternario  ( exp ? verdadero : falso ) ---");
console.log(edad >= 18 ? "Es mayor de edad" : "Es menor de edad");
let condition = edad > 18
if (condition) { }
if (condition) { } else { }

console.log("--- condicionales --- ");
const dia = "LUNESJASD"
switch (dia) {
    case "LUNES":
        console.log("LUNES");
        break;
    case "MARTES":
        console.log("MARTES");
        break;
    default:
        console.log("NO ES VALIDO");
        break;
}

console.log("--- CICLOS --- ");
for (let index = 0; index < 10; index++) { }
// while (condition) {
// }
console.log("--- for of --- ");
for (const item of [1, 2, 3]) {
    console.log(item);
}
console.log("--- for in --- ");
for (const key in materiaPreferida) {
    console.log(key);
}
console.log("--- forEach --- ");
[1, 2, 3].forEach(element => {
    console.log(element);
});

console.log('-- FUNCIONES --');
// Funcion clásica de js
function imprimirNombre(nombre) {
    console.log(nombre);
}
// Llamar la funcion imprimirNombre
imprimirNombre(nombre)

const imprimirNombreApellido = (nombre, apellido) => {
    console.log(`${nombre} ${apellido}`);
}
// Llamar imprimirNombreApellido
imprimirNombreApellido(nombre, apellido)


const crearNombreCompleto = (nombre, apellido) => {
    console.log("-- GLOBAL SCOPE FAKE -- ");
    console.log(nombre, apellido);
    let name = nombre
    if (nombre.length > 3) {
        let name = nombre[0] + " " + apellido
        console.log("94 " + name);
    }
    console.log("92 " + name);


}

const botonesHtm = document.getElementsByTagName('button')
console.log(botonesHtm);
crearNombreCompleto(nombre, apellido)


// ARRAY 
let estudiantes = []

// Agregar un elemento
// estudiantes.push(5)
// estudiantes.push(null)
// estudiantes.push({})
// estudiantes.push(()=>{ console.log(); })
estudiantes.push({ "nombre": "Juan", id: 123 })
estudiantes.push({ "nombre": "Maria", id: 1234 })
estudiantes.push({ "nombre": "Maria", id: 12344 })


estudiantes.forEach((x) => console.log(x.nombre))

for (let i = 0; i < estudiantes.length; i++) {
   if(estudiantes[i].nombre == "Maria"){
    console.log(estudiantes[i].id);
   }
}
const maria = estudiantes.find(x=>x.nombre == "Maria")
console.log(estudiantes);


const marias = estudiantes.filter(x=>x.nombre == "Maria")
marias[0].id

estudiantes = estudiantes.map(x=> { return {...x, edad:null } })
console.log(estudiantes);
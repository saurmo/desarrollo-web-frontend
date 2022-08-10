
// Tipos de declaracion de variables
// const, var, let

// Tipos de datos
// string, number, undefined, boolean, null, Simbol, Object, "Array"

const edad = 80;
const edad2 = "80";
const mensaje = "Hola Mundo!";
const es_cliente = true

// Impresion
console.log("Imprimir")
console.log("Hola Mundo Dllo-Web")
console.log("-");

// Type of
console.log("Type of");
console.log("typeof edad: " + typeof edad)
console.log("typeof edad2: " + typeof edad2)
console.log("typeof edad2: " + typeof es_cliente)
console.log("-");

// Doble y triple igual en javascript
console.log("Doble y triple igual en javascript");
console.log("80==80 ", 80 == 80)
console.log("edad==edad2 ", edad == edad2) // Valor
console.log("edad===edad2 ", edad === edad2) // Valor y tipo de dato
console.log("-");

// Concatenacion
console.log("Concatenacion");
const nombre = "Juan"
const apellido = "Perez"
console.log(nombre + " " + apellido);
console.log(`Nombre completo: ${nombre} ${apellido}`);
const num1 = 1
let num2 = "1"
console.log(num1 + num2);
num2 = 1
console.log(num1 + num2);

// Funciones
// Función clásica
function sumar(num1, num2) {
    return num1 + num2;
}
// Arrow function
const restar = (num1, num2) => {
    return num1 - num2
}

// Objetos
// JavaScript Object Notation (JSON)
// propiedad : valor
const estudiante = {
    nombre: "CARLOS",
    apellido: "",
    nombreCompleto: () => {
        return `${this.nombre} ${this.apellido}`
    }
}

// Array 
const myArray = ["Sandra", 23, true, estudiante, () => { return "Hola" }]




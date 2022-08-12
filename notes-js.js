// NOTAS SOBRE JAVASCRIPT

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
console.log("-");

// Conversión
console.log("Conversión");
let estatura = "1.65"
console.log('estatura="1.65"  ', parseFloat(estatura), typeof parseFloat(estatura));
console.log('estatura="1.65"  ', parseInt(estatura), typeof parseFloat(estatura));
console.log("-");

// Operador ternario
console.log("Operador ternario: condicion ? result_true : result_false ");
if (edad >= 18) {
    console.log("Mayor de edad");
} else {
    console.log("c de edad");
}
edad >= 18 ? console.log("Mayor de edad") : console.log("Menor de edad")
console.log("-");

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

// Formas de crear un json
let productos = {}
productos.nombre = "" // DOT- Punto
productos["precio"] = 0 // Braket Notation

//Nombre de la propiedad: x-header-js
productos["x-header-js"] = null

// Ejemplo de productos 
let productos2 = new Object();

// Ejemplo de productos 
let productos3 = {
    nombre: "",
    tipo: "",
    precio: 0,
    fecha_cosecha: null,
    fecha_vencimiento: null,
    porcentaje_dto: 0,
    descripcion: "",
    historial: [
        {
            fecha: "",
            precio: 0
        },
        {
            fecha: "",
            precio: 0
        }
    ],
    resumen_inventario: {
        cant_disponible: 0,
        cant_vendida_mes: 0,
        cant_negocioacion: 0,
    }
};

let productos4 = {}
producto.nombre = ""
producto.tipo = ""
producto.precio = 0
producto.fecha_cosecha = null
producto.fecha_vencimiento = null
producto.porcentaje_dto = 0
producto.descripcion = ""
producto.historial = [
    {
        fecha: "",
        precio: 0
    },
    {
        fecha: "",
        precio: 0
    }
]
producto.resumen_inventario = {
    cant_disponible: 0,
    cant_vendida_mes: 0,
    cant_negocioacion: 0,
}

let productos5 = {}
producto["nombre"] = ""
producto["tipo"] = ""
producto["precio"] = 0
producto["fecha_cosecha"] = null
producto["fecha_vencimiento"] = null
producto["porcentaje_dto"] = 0
producto["descripcion"] = ""
producto["historial"] = [
    {
        fecha: "",
        precio: 0
    },
    {
        fecha: "",
        precio: 0
    }
]
producto["resumen_inventario"] = {
    cant_disponible: 0,
    cant_vendida_mes: 0,
    cant_negocioacion: 0,
}


// Ejemplo
const estudiante = {
    nombre: "CARLOS",
    apellido: "",
    nombreCompleto: () => {
        return `${this.nombre} ${this.apellido}`
    }
}

// Array 
const myArray = ["Sandra", 23, true, estudiante, () => { return "Hola" }]


// Hoisting
// Conversión
console.log("Hoisting");
calcularSalario()
function calcularSalario() {
    console.log("calcularSalario");
    return ""
}
console.log("-");

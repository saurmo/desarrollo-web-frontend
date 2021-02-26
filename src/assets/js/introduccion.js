////======= INTRODUCCION JS =============

//1. Imprimir en consola
// console.log("Página de contacto - Desde el ARCHIVO");
// console.error("Esto es un error");

//2. Tipos de variables: let, var, const
const VERSION_CODIGO = "1.0.0";

//3. Formas de crear una función
//3.1 Función nativa
function name(params) {}
//3.2 Función nombrada (Función lambda)
const name2 = (params) => {};
//3.3 Funciones en un objeto
const objetoFunciones = {
  name() {},
  name2() {},
  name3() {},
};

//4. Formas de agregar comentarios
//4.1 Comentarios de linea Doble (//)
//4.2 Comentarios de bloque /** contenido */
/**
 * Este es el comentario de la función sumar
 * @param {*} nro_a Párametro a
 * @param {*} nro_b Párametro b
 */
const sumar = (nro_a, nro_b) => {};

//5. Tipos de datos
//5.1 Entero:Numero, String:Cadena de texto, Double:Decimal, Bool:[true, false]
//5.2 Array:[]
//5.3 Object (JSON): {}

//6. JSON
//6.1 Crear un json por propiedades:   nombre_clave:valor
//6.1 Crear un json con el nombre de la variable:  let nombre=""; let info= { nombre }

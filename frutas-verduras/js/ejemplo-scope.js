
// SCOPE GLOBAL
let edad = 15

let funciones = {
    // SCOPE BLOQUE
    edad: 50,
    calcularEdad: function() {
        // SCOPE FUNCION
        console.log("calcularEdad", this.edad);

    }
}

function calcularSalario() {
    // SCOPE FUNCION
    console.log("calcularSalario", edad);

    return function () {
        let edad = 40
        console.log("Funcion interna de calcular salario + antiguedad", edad);
    }
}

funciones.calcularEdad()
calcularSalario()
calcularSalario()()
console.log("sin funcion", edad);



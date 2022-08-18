
console.log("Gestión de productos");

function createProduct() {
    console.log("Create Product");

    const name = document.getElementById("nombre").value
    const type = document.getElementById("tipo").value
    const value = document.getElementById("precio").value
    const date = document.getElementById("fecha_cosecha").value
    const dto = document.getElementById("descuento").value
    const expired_date = document.getElementById("fecha_vencimiento").value
    const description = document.getElementById("descripcion").value

    const product = {
        name,
        type,
        value,
        date,
        dto,
        expired_date,
        description,
    }
    localStorage.setItem("product", JSON.stringify(product))
    console.log(product);
    document.getElementById("mensaje").innerText="Producto Agregado"
    document.getElementById("mensaje").style.color="red"
}
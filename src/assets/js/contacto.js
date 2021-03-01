console.log("--------DESPUES DEL CONTENIDO--------");
console.log("Página de contacto");

let title = document.getElementById("title");
title.innerText = "Tienda el Olimpo";

const obtenerDatos = () => {
  let tagNombre = document.getElementById("txtNombre");
  let tagCorreo = document.getElementById("txtCorreo");
  let tagMensaje = document.getElementById("txtMensaje");

  let nombre = tagNombre.value;
  let correo = tagCorreo.value;
  let mensaje = tagMensaje.value;

  //Crear objeto con la informació de contacto
  let info_contacto = { nombre, correo, mensaje };
  //info_contacto.nombre = nombre;
  //   info_contacto.nombre_correo = nombre + correo;
  console.log(info_contacto);
  //Limpiar campos
  tagNombre.value = "";
  tagCorreo.value = "";
  tagMensaje.value = "";

  return info_contacto;
};

// obtenerDatos();
console.log("--------FIN DESPUES DEL CONTENIDO--------");

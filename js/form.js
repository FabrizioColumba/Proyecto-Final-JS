
let productos = [];

let formulario;

let tabla;
let errores;

function inicializarElementos() {
  formulario = document.getElementById("formulario");
  inputNombre = document.getElementById("nombre");
  inputApellido = document.getElementById("apellido");
  inputMail = document.getElementById("mail");
  inputCantidad = document.getElementById("cantidad");
  tabla = document.getElementById("tablaProductos");
  errores = document.querySelector(".errores");
  errores.style.display = "none";
}
inicializarElementos();

formulario.onsubmit = (event) => {
  event.preventDefault();

  let nuevoProducto = new Producto(
    inputNombre.value,
    inputApellido.value,
    inputMail.value,
    inputCantidad.value
  );
  if (
    inputNombre.value != "" &&
    inputMail.value != "" &&
    inputCantidad.value != "" &&
    inputApellido.value != ""
  ) {
    productos.push(nuevoProducto);

    productos.reverse();
    limpiarTabla();
    agregarProductosTabla();
    errores.style.display = "none";
    formulario.reset();
  } else {
    errores.style.display = "block";
  }
};

function limpiarTabla() {
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }
}

function agregarProductosTabla() {
  productos.forEach((producto) => {
    let tabla = document.querySelector(".tabla");
    let filaTabla = document.createElement("tr");

    filaTabla.innerHTML = `
        <td>${producto.nombre} </td>
        <td>${producto.apellido} </td>
        <td>${producto.mail} </td>
        <td>${producto.cantidad} </td>
        `;

    tabla.append(filaTabla);
  });
}
let nombre = localStorage.getItem("nombre");
let apellido = localStorage.getItem("apellido");
let mail = localStorage.getItem("mail");
let cantidad = localStorage.getItem("cantidad");
document.getElementById("nombre").value = nombre;
document.getElementById("apellido").value = apellido;
document.getElementById("mail").value = mail;
document.getElementById("mensaje").value = cantidad;

function enviarFormulario() {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let mail = document.getElementById("mail").value;
  let cantidad = document.getElementById("cantidad").value;
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("mail", mail);
  localStorage.setItem("cantidad", cantidad);
}

let inputNombre;
let inputApellido;
let inputMail;
let inputCantidad;

class Producto {
  constructor(nombre, apellido, mail, cantidad){
      this.nombre = nombre;
      this.apellido = apellido;
      this.mail = mail;
      this.cantidad = cantidad;
  }
}

const btn = document.querySelector('#myBtn')
btn.addEventListener('click', () => {
  
  Swal.fire({
    title: "Bienvenido/a",
    text:"Se ha completado tu registro",
    icon: "Suceess",
    confirmButtonText: "Aceptar",
  })
});
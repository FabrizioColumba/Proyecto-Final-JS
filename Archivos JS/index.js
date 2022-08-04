/*Dejo estos datos para la futura pestaña de crear cuenta*/
// formulario.onsubmit = (event) => {
//   event.preventDefault();

//   let nuevoProducto = new Producto(
//     inputNombre.value,
//     inputCategoria.value,
//     inputPrecioVenta.value,
//     inputCantidad.value
//   );
//   if (
//     inputNombre.value != "" &&
//     inputPrecioVenta.value != "" &&
//     inputCantidad.value != "" &&
//     inputCategoria.value != ""
//   ) {
//     productos.push(nuevoProducto);

//     productos.reverse();
//     limpiarTabla();
//     agregarProductosTabla();
//     errores.style.display = "none";
//     formulario.reset();
//   } else {
//     errores.style.display = "block";
//   }
// };

// function limpiarTabla() {
//   while (tabla.rows.length > 1) {
//     tabla.deleteRow(1);
//   }
// }

// function agregarProductosTabla() {
//   productos.forEach((producto) => {
//     let tabla = document.querySelector(".tabla");
//     let filaTabla = document.createElement("tr");

//     filaTabla.innerHTML = `
//         <td>${producto.nombre} </td>
//         <td>${producto.categoria} </td>
//         <td>${producto.precioVenta} </td>
//         <td>${producto.cantidad} </td>
//         `;

//     tabla.append(filaTabla);
//   });
// }
// let nombre = localStorage.getItem("nombre");
// let categoria = localStorage.getItem("categoria");
// let precioVenta = localStorage.getItem("precioVenta");
// let cantidad = localStorage.getItem("cantidad");
// document.getElementById("nombre").value = nombre;
// document.getElementById("categoria").value = categoria;
// document.getElementById("precioVenta").value = precioVenta;
// document.getElementById("cantidad").value = cantidad;

// function enviarFormulario() {
//   let nombre = document.getElementById("nombre").value;
//   let categoria = document.getElementById("categoria").value;
//   let precioVenta = document.getElementById("precioVenta").value;
//   let cantidad = document.getElementById("cantidad").value;
//   localStorage.setItem("nombre", nombre);
//   localStorage.setItem("categoria", categoria);
//   localStorage.setItem("precioVenta", precioVenta);
//   localStorage.setItem("cantidad", cantidad);
// }
function manejeElClick() {
  Swal.fire({
    title: "Estas seguro que quieres finalizar tu compra?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isCanceled) {
      Swal.fire({
        title: "Compra cancelada",
        icon: "success",
        text: "Su compra ha sido cancelada",
      });
    }
  });
}
const addToShoppingCartButtons = document.querySelectorAll(".addToCart");
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener("click", addToCartClicked);
});

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  ".shoppingCartItemsContainer"
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest(".item");

  const itemTitle = item.querySelector(".item-title").textContent;
  const itemPrice = item.querySelector(".item-price").textContent;
  const itemImage = item.querySelector(".item-image").src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".shoppingCartItemQuantity"
      );
      elementQuantity.value++;
      $(".toast").toast("show");
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement("div");
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCartItem);

  shoppingCartRow
    .querySelector(".shoppingCartItemQuantity")
    .addEventListener("change", quantityChanged);

  updateShoppingCartTotal();
}
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      ".shoppingCartItemPrice"
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace("US$", "")
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      ".shoppingCartItemQuantity"
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}US$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".shoppingCartItem").remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = "";
  updateShoppingCartTotal();
}

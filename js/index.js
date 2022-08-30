const productcontainer = document.getElementById("productos")
fetch('./products.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((producto)  => {
      let div = document.createElement('div');
      div.setAttribute('class', 'col-12 col-md-6');
      div.innerHTML = `
      <div class="item shadow mb-4">
        <h3 class="item-title">${producto.nombre}</h3>
        <img class="item-image" src="${producto.imagen}">
        <div class="item-details">
            <h4 class="item-price">${producto.precio}</h4>
            <button class="item-button btn btn-primary addToCart"  >AÑADIR AL CARRITO</button>
        </div>
      <div>
      `
      productcontainer.appendChild(div);

    })
  })
  .then(() => {
    const addToShoppingCartButtons = document.querySelectorAll(".addToCart");
    addToShoppingCartButtons.forEach((addToCartButton) => {
      addToCartButton.addEventListener("click", addToCartClicked);
    });
  });


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




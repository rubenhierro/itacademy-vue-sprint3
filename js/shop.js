// If you have time, you can move this variable "products" to a json file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var modal = document.getElementById("modal");
var cartList = document.getElementById("cartList");
var cartItems = document.getElementById("cartItems");
var msgEmpty = document.getElementById("msg-empty");
var btnClean = document.getElementById("btn-clean");

modal.addEventListener("click", (e) => {
  adminProduct(e.target);
});

// var total = 0;

// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
  //   cartList.push(products[id - 1]);
}

// Exercise 2
function cleanCart() {
  cart = [];
  // cartList.length = 0;
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    cart[i].subtotalWithDiscount
      ? (total += cart[i].subtotalWithDiscount)
      : (total += cart[i].subtotal);
  }

  return total;
}

// Exercise 4
function generateCart() {
  // Using the "cartlist" array that contains all the items in the shopping cart,
  // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
  //   let cart = [];
  //   for (let i = 0; i < cartList.length; i++) {
  //     if (cart.length > 0) {
  //       for (let j = 0; j < cart.length; j++) {
  //         var exists = false;
  //         if (cartList[i].id == cart[j].id) {
  //           cart[j].quantity++;
  //           exists = true;
  //         }
  //       }
  //       if (exists == false) {
  //         cart.push(cartList[i]);
  //         cart[cart.length - 1].quantity = 1;
  //       }
  //     } else {
  //       cart.push(cartList[i]);
  //       cart[0].quantity = 1;
  //     }
  //   }
}

// Exercise 5
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  //   let cart = generateCart();

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == 1) {
      if (cart[i].quantity >= 3) {
        cart[i].subtotalWithDiscount = cart[i].quantity * 10;
      } else {
        cart[i].subtotalWithDiscount = null;
      }
    }
    if (cart[i].id == 3) {
      if (cart[i].quantity >= 10) {
        cart[i].subtotalWithDiscount = (
          (cart[i].quantity * cart[i].price * 2) /
          3
        ).toFixed(2);
      } else {
        cart[i].subtotalWithDiscount = null;
      }
    }
    cart[i].subtotal = cart[i].price * cart[i].quantity;
  }
}

// ** Nivell II **

// Exercise 7
function addToCart(id) {
  // Refactor previous code in order to simplify it
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array or update its quantity in case it has been added previously.

  if (cart.length > 0) {
    var exists = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == products[id - 1].id) {
        cart[i].quantity++;
        exists = true;
      }
    }
    if (exists == false) {
      cart.push(products[id - 1]);
      cart[cart.length - 1].quantity = 1;
    }
  } else {
    cart.push(products[id - 1]);
    cart[0].quantity = 1;
  }

  applyPromotionsCart();
}

// Exercise 8
function removeFromCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array

  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        if (cart[i].quantity >= 2) {
          cart[i].quantity--;
        } else {
          cart.splice(i, 1);
        }
      }
    }
    applyPromotionsCart();
  }
}

function deleteFromCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart.splice(i, 1);
    }
  }
}

// Exercise 9

function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
  cartItems.innerHTML = "";
  cartList.appendChild(cartItems);

  if (cart.length > 0) {
    showVisibility(btnClean);
    hideVisibility(msgEmpty);
    for (let i = 0; i < cart.length; i++) {
      const element = document.createElement("div");
      element.innerHTML = `
              <div class="card text-dark bg-light mb-4">
                  <div class="card-header">
                    <h6 class="fs-4 fst-italic text-uppercase">${
                      cart[i].name
                    }</h6>
                  </div>
                  <div class="card-body">
                      Quantity: ${cart[i].quantity} <br>
                      Price: $${cart[i].price} <br>
                      ${
                        cart[i].subtotalWithDiscount > 0
                          ? `<del><span class="text-danger">Subtotal: $` +
                            cart[i].subtotal +
                            `</span></del>`
                          : `Subtotal: $` + cart[i].subtotal
                      } <br>
                      ${
                        cart[i].subtotalWithDiscount > 0
                          ? `Subtotal with discount: $` +
                            cart[i].subtotalWithDiscount
                          : ""
                      } <br>
                      <div class="row mt-2 p-2 justify-content-end">
                        <a href="#" class="btn btn-outline-secondary text-center" name="add" data-product-id="${
                          cart[i].id
                        }"> + add</a>
  
                        <a href="#" class="btn btn-outline-secondary text-center" name="remove" data-product-id="${
                          cart[i].id
                        }"> - remove</a>
  
                        <a href="#" class="btn btn-outline-danger text-center" name="delete" data-product-id="${
                          cart[i].id
                        }">Delete</a>
                      </div>
                  </div>
              </div>
          `;
      cartItems.appendChild(element);
    }
    const total = calculateTotal();
    const element = document.createElement("div");
    element.innerHTML = `
            <div class="card text-dark bg-light text-center mb-4">
              <div class="card-header">
                <h6>TOTAL</h6>
              </div>
              <div class="m-3">$${total}</div>
            </div>
        `;
    cartItems.appendChild(element);
  } else {
    hideVisibility(btnClean);
    showVisibility(msgEmpty);
  }
}

function adminProduct(element) {
  if (element.name == "add") {
    addToCart(parseInt(element.getAttribute("data-product-id")));
    printCart();
  }
  if (element.name == "remove") {
    removeFromCart(parseInt(element.getAttribute("data-product-id")));
    printCart();
  }
  if (element.name == "delete") {
    deleteFromCart(parseInt(element.getAttribute("data-product-id")));
    printCart();
  }
  if (element.name == "clean") {
    cleanCart();
    printCart();
  }
}

function showVisibility(element) {
  element.classList.contains("d-none")
    ? element.classList.remove("d-none")
    : "";
}

function hideVisibility(element) {
  element.classList.add("d-none");
}

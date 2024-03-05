// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional

const getProducts = async () => {
    const request = await fetch('./js/products.json');
    const response = await request.json();
    return response;
}
// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

const count_product = document.getElementById("count_product");

// Exercise 1
async function buy(id) {
  const products = await getProducts();
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array
  const productInCart = cart.some((product) => product.id === id);
  if (!productInCart) {
    const newProduct = products.find((product) => product.id === id);
    newProduct.quantity = 1;
    cart = [...cart, newProduct];
  } else {
    cart.map((product) => product.id === id && product.quantity++);
  }
  count_product.innerHTML = cart.length;

}

// Exercise 2
function cleanCart() {
  cart = [];
  printCart();
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  let totalCart = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].subtotalWithDiscount) {
      totalCart +=
        cart[i].price * cart[i].quantity - cart[i].subtotalWithDiscount;
    } else {
      totalCart += cart[i].price * cart[i].quantity;
    }
  }
  total = totalCart;
}

// Exercise 4
function applyPromotionsCart(cart) {
  // Apply promotions to each item in the array "cart"
  cart.map((product) => {
    if (product.offer && product.quantity >= product.offer.number) {
      product.subtotalWithDiscount =
        Math.round(
          (product.offer.percent / 100) * product.price * product.quantity * 100
        ) / 100;
    } else {
      product.subtotalWithDiscount = 0;
    }
  });
}

// Exercise 5
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom

  applyPromotionsCart(cart);

  const cart_list = document.getElementById("cart_list");
  const total_price = document.getElementById("total_price");

  cart_list.innerHTML = "";

  cart
    .map((product) => {
      cart_list.innerHTML += /*html*/ `
        <tr>
            <th scope="row">${product.name}</th>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                ${
                  product.subtotalWithDiscount
                    ? `$${product.subtotalWithDiscount}`
                    : ""
                }
            </td>
            <td><button type="button" class="btn btn-danger" onclick="removeFromCart(${
              product.id
            })">-</button></td>
        </tr>
        `;
    })
    .join("");

  calculateTotal();
  total_price.innerHTML = total;
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
  cart = cart
    .map((product) => {
      if (product.id === id) {
        product.quantity--;
      }
      if (product.quantity <= 0) {
        return null;
      }
      return product;
    })
    .filter((product) => product !== null);
  count_product.innerHTML = cart.length;
  printCart();
}

function open_modal() {
  printCart();
}

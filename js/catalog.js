/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let products = Product.allProducts[i];
    let option = document.createElement('option');
    option.innerText = products.name;
    selectElement.appendChild(option);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.

function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// TODO: Add the selected item and quantity to the cart
// TODO: suss out the item picked from the select list
// TODO: get the quantity
// TODO: using those, add one item to the Cart

function addSelectedItemToCart() {
  let item = document.getElementById('items').value;
  let quantity = document.getElementById('quantity').value;
  cart.addItem(item, quantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
let count = 0;
let itemCount = document.getElementById('itemCount');
function updateCounter() {
  count = 0;
  let countArray = [];
  for (let i = 0; i < cart.items.length; i++) {
    let quantity = cart.items[i].quantity;
    countArray.push(Number(quantity));
    count += countArray[i];
  }
  itemCount.innerText = `:   ${count} Items`;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div

// TODO: Get the item and quantity from the form
// TODO: Add a new element to the cartContents div with that information
function updateCartPreview() {
  let product = null;
  let cartContents = document.getElementById('cartContents');
  let item = document.getElementById('items').value;
  let quantity = document.getElementById('quantity').value;
  let cartPreview = document.createElement('div');
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (item === Product.allProducts[i].name) {
      product = Product.allProducts[i];
    }
  }
  cartPreview.innerText = `You added ${quantity}: ${item} to your cart.`;
  cartContents.appendChild(cartPreview);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();

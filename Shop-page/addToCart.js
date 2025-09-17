export const Cart = JSON.parse(localStorage.getItem('cart')) || []

export function addToCart(addproduct) {
  let currentCart = JSON.parse(localStorage.getItem('cart')) || [];

  currentCart.push(addproduct)

  let addToLocalStorage = localStorage.setItem('cart', JSON.stringify(currentCart))

  // console.log(addproduct);
}
// console.log(Cart);
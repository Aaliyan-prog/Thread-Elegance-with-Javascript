export const checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || []

export function cartForCheckout (addCheckoutProduct) {
  const currentCheckoutProduct = JSON.parse(localStorage.getItem('checkoutCart')) || [];
  console.log("Current checkoutCart in function:", currentCheckoutProduct);
  
  console.log(addCheckoutProduct);

  const matchProduct = currentCheckoutProduct.find(product => product.id === addCheckoutProduct.id)

  if (matchProduct){
    matchProduct.quantity += addCheckoutProduct.quantity
  } else{
    currentCheckoutProduct.push(addCheckoutProduct);
  }

  console.log(matchProduct);
  

  localStorage.setItem('checkoutCart', JSON.stringify(currentCheckoutProduct))
}
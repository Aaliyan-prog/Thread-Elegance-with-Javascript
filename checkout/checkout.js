import { checkoutCart } from "./addToCartForCheckout.js";

const buyNowSection = document.querySelector('.buyNow-sections')
const finalPriceTable = document.querySelector('.final-table-price')

let checkoutHTML = '';
let checkoutTableHTML = '';
let checkoutTotalTableHTML = '';

console.log(checkoutCart);


checkoutCart.forEach((checkoutProduct) => {
  checkoutHTML += `<div class="buyNow-items">
          <div class="Remove-class">
            <h1 class="Remove-class-icon" id="${checkoutProduct.id}"><i class="fa-solid fa-x"></i></h1>
          </div>
          <div class="Image-class">
            <img src='../${checkoutProduct.image}' alt="">
          </div>
          <div class="pro-name">
            <h1>${checkoutProduct.name}</h1>
          </div>
          <div class="Brand-class">
            <h1>${checkoutProduct.brand}</h1>
          </div>
          <div class="Price-class">
            <h1 class="checkout-price" id="${checkoutProduct.id}">$${checkoutProduct.price * checkoutProduct.quantity}</h1>
          </div>
          <div class="quantity-product">
            <div class="count-col">
              <div class="quan-btn">
                <button class="increment-button" data-btn-id="${checkoutProduct.id}">+</button>
                <p class="counter-quantities" id='${checkoutProduct.id}'>${checkoutProduct.quantity}</p>
                <button class="decrement-button" data-btn-id="${checkoutProduct.id}">-</button>
              </div>
            </div>
          </div>
        </div>`

  buyNowSection.innerHTML = checkoutHTML
})

CounterEventListener()

function CounterEventListener () {
  const counterValue = document.querySelectorAll('.counter-quantities')
  const checkoutPrice = document.querySelectorAll('.checkout-price')
  const incrementButton = document.querySelectorAll('.increment-button');
  const decrementButton = document.querySelectorAll('.decrement-button');
  const checkoutCartChange = JSON.parse(localStorage.getItem('checkoutCart'))
  let changeCheckout = checkoutCartChange

  let checkoutQuantity = changeCheckout.quantity
  console.log(changeCheckout);
  console.log(checkoutQuantity);

  incrementButton.forEach(incBtn => {
    incBtn.addEventListener('click', function(){
      let incbttn = incBtn.nextElementSibling
      const filterValue = changeCheckout.filter(checkoutfilter => incbttn.id === checkoutfilter.id)
      console.log(filterValue);

      if(filterValue.length > 0){
        let filterQuantityValue = filterValue[0].quantity
        let filterPriceValue = filterValue[0].price
        // console.log(typeof(filterQuantityValue), typeof(filterValue[0].quantity), filterQuantityValue)
        filterQuantityValue++
        filterValue[0].quantity = filterQuantityValue;
        let price = filterPriceValue * filterValue[0].quantity
        // filterValue[0].price = filterPriceValue
        console.log(typeof(filterQuantityValue), filterValue[0].quantity, filterQuantityValue, filterPriceValue, filterValue[0].price)

        counterValue.forEach(counVal => {
          console.log(counVal.id, incbttn.id);
          
          if(counVal.id === incbttn.id){
            counVal.innerHTML =  filterQuantityValue
          }
        })

        checkoutPrice.forEach(counPrice => {
          console.log(counPrice.id, incbttn.id);

          if (counPrice.id === incbttn.id) {
            counPrice.innerHTML = `$${price}`
          }
        })
        localStorage.setItem('checkoutCart', JSON.stringify(checkoutCartChange))
        console.log('clicked', incbttn.id, filterValue, filterQuantityValue);
      }
    })
  })

  decrementButton.forEach(decBtn => {
    decBtn.addEventListener('click', function(){
      let decbttn = decBtn.previousElementSibling
      const filterValue = changeCheckout.filter(checkoutfilter => decbttn.id === checkoutfilter.id)
      console.log(filterValue);

      if(filterValue.length > 0){
        let filterQuantityValue = filterValue[0].quantity
        let filterPriceValue = filterValue[0].price
        // console.log(typeof(filterQuantityValue), typeof(filterValue[0].quantity), filterQuantityValue)
        filterQuantityValue--
        filterValue[0].quantity = filterQuantityValue;
        let price = filterPriceValue * filterValue[0].quantity
        // filterValue[0].price = filterPriceValue
        console.log(typeof(filterQuantityValue), filterValue[0].quantity, filterQuantityValue, filterPriceValue, filterValue[0].price)

        counterValue.forEach(counVal => {
          console.log(counVal.id, decbttn.id);
          
          if(counVal.id === decbttn.id){
            counVal.innerHTML =  filterQuantityValue
          }
        })

        checkoutPrice.forEach(counPrice => {
          console.log(counPrice.id, decbttn.id);

          if (counPrice.id === decbttn.id) {
            counPrice.innerHTML = `$${price}`
          }
        })
        localStorage.setItem('checkoutCart', JSON.stringify(checkoutCartChange))
        console.log('clicked', decbttn.id, filterValue, filterQuantityValue);
      }
    })
  })
}

const RemoveClass = document.querySelectorAll('.Remove-class-icon')

RemoveClass.forEach((removeItem) => {
  removeItem.addEventListener('click', function () {
    const removed = checkoutCart.filter(checkoutFilterCart => checkoutFilterCart.id !== removeItem.id)

    localStorage.setItem('checkoutCart', JSON.stringify(removed))
    location.reload()
    console.log(removeItem.id, removed, checkoutCart)
    console.log(removed)
  })
})

let totalPrice = 0

checkoutCart.forEach((checkoutProduct) => {
  totalPrice += checkoutProduct.price * checkoutProduct.quantity
  
  checkoutTableHTML += `<tr>
                  <td>${checkoutProduct.name}</td>
                  <td>Free</td>
                  <td>$${checkoutProduct.price * checkoutProduct.quantity}</td>
                </tr>`

  
})

finalPriceTable.innerHTML = checkoutTableHTML

checkoutTotalTableHTML += `<tr>
<td>Total price</td>
<td></td>
<td>$${totalPrice}</td>
</tr>`

finalPriceTable.innerHTML += checkoutTotalTableHTML
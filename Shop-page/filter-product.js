import { cartForCheckout } from "../checkout/addToCartForCheckout.js";
import { Cart } from "./addToCart.js";
// import { shopDetails } from "./shop-detail.js";

const sideImgSec = document.querySelector('.gallery-sec')
const description = document.querySelector('.description')
const detail = document.querySelector('.detail')
const proDetailContainer = document.querySelector('.pro-detail-container')
const proitemsDetails = document.querySelector('.pro-items-details')
const checkoutAddCartButton = document.querySelector('.checkoutAddCart')

console.log(window.location.href, window.location.pathname, window.location.search)


let tableToggle = false;
let proDetailToggleHTML = '';

// console.log(productItemId);

export function filterProduct(productdetail) {
  console.log(window.location.search, window.location.href);
  localStorage.setItem('id', JSON.stringify(productdetail))
}

const filterId = JSON.parse(localStorage.getItem('id'))

if (window.location.search === `?id=${filterId}`){
  const filterCart = Cart.find(cartItems => cartItems.id === filterId);

  console.log(filterCart);
  localStorage.setItem('filterItem', JSON.stringify(filterCart))

  if (filterCart) {
    updateCartItem()
    // localStorage.removeItem('id')
  } else {
    console.log('product not found in the Cart');
    // updateCartItem(null)
  }

  checkoutAddCartButton.addEventListener('click', function () {
    let checkoutFilterItem = JSON.parse(localStorage.getItem('filterItem'))
    cartForCheckout(checkoutFilterItem)
  })
}


function updateCartItem () {
  let galleryHTML = '';
  let proDetail = '';
  const filteritem = JSON.parse(localStorage.getItem('filterItem'))
  console.log(filteritem);
  
  if (filteritem) {
    proDetail = `<div class="product-item-detail">
                <h3>${filteritem.brand}</h3>
                <h1>${filteritem.name}</h1>
                <h2>$${filteritem.price * filteritem.quantity}</h2>
                <div class="counter-section">
                  <div class="quan-btn">
                    <button class="increment-btn">+</button>
                    <p class="counter-quantity">${filteritem.quantity}</p>
                    <button class="decrement-btn">-</button>
                  </div>
                </div>
              </div>`

    galleryHTML = `<img src="../${filteritem.image}" alt="" class="mainImg">
          <div class="side-img">
          <div class="side-img-sec">
            <img src="../${filteritem.image1}" class="sideImg" alt="">
            <img src="../${filteritem.image2}" class="sideImg" alt="">
            <img src="../${filteritem.image3}" class="sideImg" alt="">
          </div>
          </div>`
  
    sideImgSec.innerHTML = galleryHTML
    proitemsDetails.innerHTML = proDetail
    attachCounterEventListener()
  } else {
    galleryHTML = "<p>sorry, no image found</p>"
    sideImgSec.innerHTML = galleryHTML
  }

  const mainImage = document.querySelector('.mainImg')
  const sideImage = document.querySelectorAll('.sideImg')

  mainImage.addEventListener('click', function() {
    if (mainImage !== `../${filteritem.image}`){
      mainImage.src = `../${filteritem.image}`;
      sideImage[0].src = `../${filteritem.image1}`;
      sideImage[1].src = `../${filteritem.image2}`;
      sideImage[2].src = `../${filteritem.image3}`;
    }
  })

  sideImage.forEach((Img) => {
    Img.addEventListener('click', function (e) {
      // if (e.target.src === `../${filteritem.image}`){
      //   e.target.src = mainImage.src
      // }
      if(e.target.src !== mainImage.src){
        // console.log(mainImage.src, Img.src);
        mainImage.src = e.target.src
        // console.log(mainImage.src, Img.src);
      }
      if(e.target.src === mainImage.src){
        // console.log(mainImage.src, Img.src);
        e.target.src = `../${filteritem.image}`
        // console.log(mainImage.src, Img.src);
      }
    })
  })
  
  if (tableToggle === false) {
    description.style.borderBottom = 'none';

    proDetailToggleHTML = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nobis recusandae est natus dolores, vel amet magni porro ducimus eos reprehenderit aliquid aperiam accusantium odit tempore aliquam tenetur laborum cum!</p>`

    proDetailContainer.innerHTML = proDetailToggleHTML
  }
}

function attachCounterEventListener () {
  const counterValue = document.querySelector('.counter-quantity');
  const incrementButton = document.querySelector('.increment-btn');
  const decrementButton = document.querySelector('.decrement-btn');
  const filteritem = JSON.parse(localStorage.getItem('filterItem'))
  const filterItemOperator = filteritem;
  
  let counterQuanValue = filteritem.quantity;
  
  counterValue.innerText = counterQuanValue;
  
  incrementButton.addEventListener('click', function () {
    counterQuanValue++
    filterItemOperator.quantity = counterQuanValue
    console.log(filterItemOperator.price, filterItemOperator.quantity, filterItemOperator.price, filterItemOperator)
    updateCount(counterValue, counterQuanValue, filterItemOperator)
  })
  
  decrementButton.addEventListener('click', function () {
    counterQuanValue--
    filterItemOperator.quantity = counterQuanValue
    updateCount(counterValue, counterQuanValue, filterItemOperator)
  })
  
  function updateCount(counterValue, counterQuanValue, filterItemOperator) {
    localStorage.setItem('filterItem', JSON.stringify(filterItemOperator))
    updateCartItem()
    counterValue.innerText = counterQuanValue
    console.log(counterValue, counterQuanValue)
    if (counterQuanValue > 0) {
      counterValue.style.color = 'green'
    }
    if (counterQuanValue === 0) {
      counterValue.style.color = 'black';
    }
    if (counterQuanValue < 0) {
      counterValue.style.color = 'red'
    }
  }
}


document.querySelectorAll('.title-container').forEach((btn) => {
  btn.addEventListener('click', function () {
    if (btn.innerText === 'description') {
      tableToggle = false;
      console.log(tableToggle);
      btn.style.borderBottom = 'none';
      detail.style.borderBottom = '1px solid #bfb3b3';
      
      if (tableToggle === false) {
        proDetailToggleHTML = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nobis recusandae est natus dolores, vel amet magni porro ducimus eos reprehenderit aliquid aperiam accusantium odit tempore aliquam tenetur laborum cum!</p>`
        
        proDetailContainer.innerHTML = proDetailToggleHTML
      }
    }
    if (btn.innerText === 'detail') {
      tableToggle = true
      console.log(tableToggle)
      btn.style.borderBottom = 'none';
      description.style.borderBottom = '1px solid #bfb3b3';
      
      if (tableToggle === true) {
        proDetailToggleHTML = `                <table>
                  <tr class="tbody-sec">
                    <td class="td-special">size</td>
                    <td>small</td>
                    <td>medium</td>
                    <td>large</td>
                    <td>XL</td>
                    <td>XLL</td>
                  </tr>
                  <tr class="tbody-sec">
                    <td class="td-special">color</td>
                    <td>black</td>
                    <td>white</td>
                    <td>blue</td>
                    <td>red</td>
                    <td>navy blue</td>
                  </tr>
                </table>`

        proDetailContainer.innerHTML = proDetailToggleHTML
      }
    }
  })
})
console.log(tableToggle);
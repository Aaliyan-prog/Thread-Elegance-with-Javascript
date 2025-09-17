import { productData } from "../product.js";

export function displayProduct () {
  let productItems = productData;
  let productHTML = "";
  let navOptionValue = "";

  const homeProductSection = document.querySelector(".home-product-section")
  const navOption = document.querySelectorAll(".nav-option")

  navOption.forEach((val) => {
    val.addEventListener("click", function (e) {
      productHTML = ""
      const target = e.target
      navOptionValue = target.textContent;
      console.log(navOptionValue);


      if (navOptionValue === "All") {
        productItems = productData
      } else if (navOptionValue === "shirt" || navOptionValue === "plain shirt" || navOptionValue === "pant") {
        let productItem = productData.filter((product) => product.category.toLowerCase().includes(navOptionValue.toLowerCase()))
        productItems = productItem
        console.log(productItem);
      }

      productItems.forEach((product) => {
        productHTML += `<div class="product-item-section">
                  <div class="pro-img">
                    <img src="${product.image}" alt="">
                  </div>
                  <div class="pro-details">
                    <div class="pro-name">
                      <h3>${product.name}</h3>
                    </div>
                    <div class="pro-price">
                      <h3>$${product.price}</h3>
                    </div>
                  </div>
                  <div class="layer">
                    <button class="add-button">Add to cart</button>
                    <button class="buy-button">Buy Now</button>
                  </div>
                </div>`
        
      })

      if (homeProductSection) {
        homeProductSection.innerHTML = productHTML;
      }
      productHTML = ""
      navOptionValue = ""
    })
  })

  productItems.forEach((product) => {
    productHTML += `<div class="product-item-section">
              <div class="pro-img">
                <img src="${product.image}" alt="">
              </div>
              <div class="pro-details">
                <div class="pro-name">
                  <h3>${product.name}</h3>
                </div>
                <div class="pro-price">
                  <h3>$${product.price}</h3>
                </div>
              </div>
              <div class="layer">
                <button class="add-button">Add to cart</button>
                <button class="buy-button">Buy Now</button>
              </div>
            </div>`
    
    // homeProductSection.appendChild(productHTML)
    // homeProductSection.innerHTML = productHTML
  })

  if (homeProductSection) {
    homeProductSection.innerHTML = productHTML;
  }
}
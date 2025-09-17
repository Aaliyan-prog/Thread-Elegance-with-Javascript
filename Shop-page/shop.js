import { productData } from "../product.js";
import { addToCart } from './addToCart.js'
import { filterProduct } from "./filter-product.js";
// import { shopDetails } from "./shop-detail.js";

const changeProductclass = document.querySelector('.change-product-class')
const columntoggle = document.querySelector('.column-toggle')
const gridtoggle = document.querySelector('.grid-toggle')
const paginationList = document.querySelector('.Pagination-list')
const shopSearchInput = document.querySelector('.shop-search-items')
const searchItems = document.querySelector('.search-product')
const searchItem = document.querySelector('.search-items')
const optionCategory = document.querySelectorAll('.option-category')

const productPerPage = 10;
let currentPage = 1;

function updatePageList (page) {
  const startIndex = (page - 1) * productPerPage;
  const endIndex = startIndex + productPerPage;

  let options = "";
  
  optionCategory.forEach((categoryOption) => {
    categoryOption.addEventListener('click', function (e) {
      productToShow = ''
      options = ''
      shopProductHtml = ''
      options = e.target.innerText.trim()
      console.log(options);

      if(options === 'All'){
        productToShow = productData.slice(startIndex, endIndex)
      } else {
        productToShow = productData.filter((val) => val.category.toLowerCase().includes(options.toLowerCase()))
        console.log(productToShow);
      }

      productToShow.forEach((product) => {
        shopProductHtml += `<div class="product-item-section">
            <div class="pro-img">
              <img src="../${product.image}" alt="">
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
              <button class="add-button">
                <a href="./shop-detail.html">Add to cart</a>
              </button>
              <button class="buy-button">
                <a href="">Buy now</a>
              </button>
            </div>
          </div>`

        changeProductclass.innerHTML = shopProductHtml
      })
    })
  })
  
  
  let productToShow = productData.slice(startIndex, endIndex)
  
  let shopProductHtml = "";
  
  productToShow.forEach((product) => {
    shopProductHtml += `<div class="product-item-section">
            <div class="pro-img">
              <img src="../${product.image}" alt="">
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
              <button class="add-button" data-product-id="${product.id}">
                <a href="" class="add-to-cart">Add to cart</a>
              </button>
              <button class="buy-button">
                <a href="./shop-detail.html">Buy now</a>
              </button>
            </div>
          </div>`

    changeProductclass.innerHTML = shopProductHtml
  })

  document.querySelectorAll('.add-button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // const urlParams = new URLSearchParams(window.location.search);
      // const productItemId = urlParams.get('id');
      e.preventDefault()
      const productId = btn.dataset.productId;
      const product = productData.find(productItem => productItem.id === productId);
      // shopDetails(productId)
      filterProduct(productId)
      addToCart(product)
      window.location.href = `./shop-detail.html?id=${productId}`
      console.log(window.location.href = `./shop-detail.html?id=${productId}`)
      console.log(productId);
    })
  })
}


function renderPagination () {
  const totalPages = Math.ceil(productData.length / productPerPage)

  paginationList.innerHTML = '';

  const prevPage = document.createElement('li')
  prevPage.classList.add('prev-Page')
  prevPage.innerHTML = '<';
  paginationList.appendChild(prevPage)

  for(let i = 0; i <= totalPages; i++){
    const pageItem = document.createElement('li')
    pageItem.innerHTML = i;
    pageItem.classList.add('page-number')
    paginationList.appendChild(pageItem)
  }

  const nextPage = document.createElement('li')
  nextPage.classList.add('next-Page')
  nextPage.innerHTML = '>';
  paginationList.appendChild(nextPage)

  const pageNumber = document.querySelectorAll('.page-number')
  pageNumber.forEach((pageNumbers) => {
    pageNumbers.addEventListener('click', function (e) {
      currentPage = parseInt(e.target.innerText)
      updatePageList(currentPage);
      renderPagination();
    })
  })

  prevPage.addEventListener('click', function (){
    if(currentPage > 1){
      currentPage--;
      updatePageList(currentPage);
      renderPagination()
    }
  })

  nextPage.addEventListener('click', function (){
    if(currentPage < totalPages){
      currentPage++;
      updatePageList(currentPage);
      renderPagination()
    }
  })

  const activePage = document.querySelectorAll('.page-number')
  activePage.forEach((pageNumbers) => {
    if(parseInt(pageNumbers.innerText) === currentPage){
      pageNumbers.classList.add('active')
    }
    else {
      pageNumbers.classList.remove('active');
    }
  })
}

updatePageList(currentPage)
renderPagination()

columntoggle.addEventListener('click', function(){
  if(changeProductclass.classList.contains('grid')){
    changeProductclass.classList.remove('grid');
    changeProductclass.classList.add('column')
  }
})

gridtoggle.addEventListener('click', function(){
  if(changeProductclass.classList.contains('column')){
    changeProductclass.classList.remove('column');
    changeProductclass.classList.add('grid')
  }
})

let shopSearch = '';
searchItem.style.display = 'none';

shopSearchInput.addEventListener('input', function(e){
  searchItem.style.display = '';
  shopSearch = shopSearchInput.value.trim().toLowerCase();
  console.log(shopSearch);

  searchItems.innerHTML = '';

  const filterSearchProduct = productData.filter((val) => val.category.toLowerCase().includes(shopSearch))
  
  console.log(filterSearchProduct);
  
  filterSearchProduct.forEach((filterproduct) => {  
   const labDiv = document.createElement('div')
   labDiv.classList.add('lab-div')
  
    const Img = document.createElement('div')
    Img.classList.add('search-img-product')
    Img.classList.add('img')
  
    const image = document.createElement('img')
    image.src = `../${filterproduct.image}`
  
    const title = document.createElement('div')
    title.classList.add('search-title-product')
    title.classList.add('title')
  
    const titleName = document.createElement('h3')
    titleName.innerHTML = filterproduct.name;
  
    const titlePrice = document.createElement('p')
    titlePrice.innerText = `$${filterproduct.price}`
  
    labDiv.appendChild(Img)
    Img.appendChild(image)
    labDiv.appendChild(title)
    title.appendChild(titleName)
    title.appendChild(titlePrice)
  
    searchItems.appendChild(labDiv)
  })

  if(shopSearch === ''){
    searchItem.style.display = 'none';
  }
})
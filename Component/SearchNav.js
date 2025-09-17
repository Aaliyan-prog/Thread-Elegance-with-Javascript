import { productData } from "../product.js";

const NavInput = document.querySelector('.navSearch')
const SearchIcon = document.querySelector('.Search-icon')
const backgroundImage = document.querySelector('.backgroundImage')

export let SearchValue;

SearchIcon.addEventListener('click', function(e) {
  e.preventDefault()
  const NavSearchValue = NavInput.value;
  SearchValue = NavSearchValue
  console.log(SearchValue)

  const existingSearchResult = document.querySelector('.searchProduct')
  if (existingSearchResult){
    existingSearchResult.remove()
  }

  const CreateElementSearchProduct = document.createElement('div')
  CreateElementSearchProduct.classList.add('searchProduct')
  
  const CreateElementUl = document.createElement('ul')
  
  
  const filterSearchSuggestion = productData.filter((product) => product.category.toLowerCase().includes(SearchValue.toLowerCase()))
  
  console.log(filterSearchSuggestion);
  
  
  filterSearchSuggestion.map((val, i) => {
    // const filterval = [val]
    console.log(val);
    const CreateElementLi = document.createElement("li")
    CreateElementLi.innerText = val.name
    CreateElementUl.appendChild(CreateElementLi)
  })
  
  backgroundImage.appendChild(CreateElementSearchProduct)
  CreateElementSearchProduct.appendChild(CreateElementUl);
})
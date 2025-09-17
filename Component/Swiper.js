const swipeItems = document.querySelectorAll(".swipe-items")

export function swiper () {
  setTimeout(() => {
    swipeItems.forEach((swipe) => {
      
      if (swipe.style.left === "-300px"){
        swipe.style.left = '0px'
      }
      else {
        swipe.style.left = '-300px'
      }
    })
  }, 1500)
}
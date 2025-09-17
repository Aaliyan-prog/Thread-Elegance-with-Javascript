const countValue = document.querySelectorAll('.count')
const worldWide = document.querySelector('.world-wide')
const Affiliate = document.querySelector('.Affiliate')
const reviewCount = document.querySelector('.Review-count')

export function homeCounter () {
  // countValue.textContent = value
  // console.log(value, countValue);

  countValue.forEach((count) => {
  let value = 0;
  let value1 = 0;
  let value2 = 0;
  const targetValue = 3000
  const targetValue1 = 4000
  const targetValue2 = 4500
  
  const interval = setInterval(() => {
    if (value < targetValue){
      value += 50
      worldWide.textContent = value;
      console.log(value)
    } else {
      clearInterval()
    }
    if (value1 < targetValue1){
      value1 += 50
      Affiliate.textContent = value1;
    } else {
      clearInterval()
    }
    if (value2 < targetValue2){
      value2 += 50
      reviewCount.textContent = value2;
    } else {
      clearInterval()
    }
  }, 50)

  })
}

  
  // setTimeout(() => {
  //   countValue.forEach((count) => {
  //     // for(let i = 0; i >= value; i++){
  //     //   value += targetValue
  //     //   count.textContent = value
  //     //   console.log(value, count);
  //     // }
  //   })
  // }, 1000)
// })
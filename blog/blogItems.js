const blogItemsDetail = JSON.parse(localStorage.getItem('blog')) || []

export function addToBlog (curblog) {
  let currentBlog = JSON.parse(localStorage.getItem('blog')) || []

  currentBlog.push(curblog)

  localStorage.setItem('blog', JSON.stringify(currentBlog))
}

export function filterBlogId (filterBlogid) {
  localStorage.setItem('blogId', JSON.stringify(filterBlogid))
}

const blogIdFilter = JSON.parse(localStorage.getItem('blogId'))

if(window.location.search === `?id=${blogIdFilter}`){
  console.log(blogItemsDetail, blogIdFilter)
 const filterBlogItem = blogItemsDetail.find(filterBlog => filterBlog.id === blogIdFilter)
 console.log(filterBlogItem)

  localStorage.setItem('filterBlog', JSON.stringify(filterBlogItem))
}

const filterBlog = JSON.parse(localStorage.getItem('filterBlog'))

if(filterBlog) {
  const blogItemsContainer = document.querySelector('.blog-items')

  if(blogItemsContainer){
    let blogPageHTML = '';
    
    blogPageHTML += `  <div class="blog-item">
        <div class="blog-img">
          <img src="${filterBlog.Image}" alt="">
        </div>
        <div class="blog-text">
          <p>${filterBlog.text} Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quod, soluta qui veritatis possimus optio odio? Est cumque expedita nulla, quibusdam debitis officiis alias provident magni beatae quia, deserunt ea?</p>
        </div>
        <div class="blog-img2">
          <img src="${filterBlog.Image}" alt="">
        </div>
      </div>`
    
    blogItemsContainer.innerHTML = blogPageHTML
  }
} else{
  console.error('No blog found in localStorage')
}

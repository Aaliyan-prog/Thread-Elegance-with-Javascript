import { addToBlog, filterBlogId } from "./blogItems.js";
import { blog } from "./blogList.js";

const blogSection = document.querySelector('.blog-sec')

let blogHTML = '';

blog.forEach(blogItems => {
  blogHTML += `<div class="blog-section">
        <div class="blog-img blogItems" data-blog-id="${blogItems.id}">
          <img src="${blogItems.Image}" alt="">
        </div>
        <div class="blog-detail">
          <h1>${blogItems.Title}</h1>
          <div class="blog-detail-para">
            <p>${blogItems.text}</p>
          </div>
          <div class="read-more blogItems" data-blog-id="${blogItems.id}">Read More</div>
          <p>${blogItems.date}</p>
        </div>
      </div>`
})
blogSection.innerHTML = blogHTML

const blogItem = document.querySelectorAll('.blogItems')

blogItem.forEach(blogPage => {
  blogPage.addEventListener('click', function () {
    const blogId = blogPage.dataset.blogId
    const filterBlog = blog.find(blogFilter => blogFilter.id === blogId)
    console.log(filterBlog)

    addToBlog(filterBlog)
    filterBlogId(blogId)
    window.location.href = `./blogItems.html?id=${blogId}`
    console.log(blogId, filterBlog);
  })
})

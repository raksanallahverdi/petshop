const cardsContainer=document.querySelector(".wishlist-wrapper")
import { API_BASE_URL, endpoints } from "./constants.js";
import {getAllData} from "./helpers.js"
let localCards = JSON.parse(localStorage.getItem("blog")) || [];
const movies=await getAllData(API_BASE_URL,endpoints.blogs);
movies.forEach((card,idx) => {
  if(localCards.includes(card.id)){
    cardsContainer.innerHTML+= `
        <div data-id=${card.id} class="wishedElement">
                        <div class="img-wrapper">
                            <img src="${card.imageUrl}" alt="">
                        </div>                                       
                       <div class="content-wrapper">
                         <h2>${card.title}</h2>                     
                       <div class="createdAt">${card.createdAt}</div> 
                       <p>${card.description}</p>
                       <div class="row blogIcons">
                       <div class="row">
                       <i class="fa-solid fa-user-pen"></i>
                       <h4>${card.createdBy}</h4> 
                       </div>
                       <div class="row">
                       <i class="fa-solid fa-layer-group"></i>
                       <h4>${card.categories} </h4> 
                       </div>
                       <div class="row">
                       <i class="fa-regular fa-comments"></i>
                       <h4>9823 Comments</h4>
                       </div>
                       
                       </div>                             
                       </div>
                          <i class="fa-solid fa-xmark deleteIcon"></i>
                    </div>

        `
    
  }
});

const deleteIcons = document.querySelectorAll(".deleteIcon");
console.log(deleteIcons);
deleteIcons.forEach((btn)=>{
  btn.addEventListener("click",(e)=>{
    console.log(e.target);
    const blogDiv = btn.closest(".wishedElement");
const blogId = blogDiv.getAttribute("data-id");
console.log(blogId);
localCards = localCards.filter((id) => id !== blogId);
localStorage.setItem("blog", JSON.stringify(localCards)); 
blogDiv.remove();  



  })

})



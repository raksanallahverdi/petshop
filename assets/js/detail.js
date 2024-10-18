import { getDataById } from "./helpers.js";
import { API_BASE_URL, endpoints } from "./constants.js";
const blogCard=document.querySelector(".BlogCard-wrapper");

document.addEventListener("DOMContentLoaded",async ()=>{
    const id = new URLSearchParams(location.search).get("id");
    const blogs=await getDataById(API_BASE_URL,endpoints.blogs,id);
    const blog=blogs[0];
    const createdAtDate = card.createdAt.includes("T") 
    ? card.createdAt.split("T")[0]  
    : card.createdAt; 
    blogCard.innerHTML+=`<div class="blog_card">
    <div class="my_image-wrapper">
        <img src="${blog.imageUrl}" alt="">
    </div>
    <div class="contents">
        <h2>${blog.title}</h2>
        <h3>${blog.description}</h3>
        <h3>${createdAtDate}</h3>
        <h3>${blog.createdBy}</h3>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, animi exercitationem laudantium incidunt est sed consectetur atque magnam natus laborum a, quis voluptatibus illum! Odit, quos mollitia temporibus doloremque nostrum distinctio accusamus perspiciatis aut dolores praesentium qui, dignissimos sed quibusdam officiis architecto consequuntur laboriosam! Quae sapiente a, mollitia magnam ullam quibusdam nobis minus </p>
    </div>`;
    
    
})
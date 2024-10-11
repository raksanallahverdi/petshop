const categoryContainer=document.querySelector(".category");
const feedsContainer=document.querySelector(".instagramFeeds");
const tagCloudsContainer=document.querySelector(".clouds");
const recentsContainer=document.querySelector(".recents");
import { API_BASE_URL, endpoints } from "./constants.js";
import {getAllData} from "./helpers.js"
document.addEventListener("DOMContentLoaded",async()=>{
    const categories=await getAllData(API_BASE_URL,endpoints.categories);
    categories.forEach(category => {
        categoryContainer.innerHTML+=`
        <div>
         <p>${category.name} <span>( ${category.count} )</span></p>
         <hr>
        </div>     
        `
        tagCloudsContainer.innerHTML+=`
        <div>${category.name}</div>       
        `
    });
    const posts=await getAllData(API_BASE_URL,endpoints.blogs);
    const lastFourElements = posts.slice(-4);
    const lastSixElements = posts.slice(-6);
    lastFourElements.forEach(post => {
        const relativeTime = moment(post.createdAt, "YYYYMMDD").fromNow();
        recentsContainer.innerHTML+=`
         <div class="recentPost">
                            <div class="img-wrapper"> <img src="${post.imageUrl}" alt=""></div>
                            <div>
                             <h3>${post.title}</h3>
                            <span>${relativeTime}</span>
                            </div>
                           
                        </div>    
       
        `
       
    });
    lastSixElements.forEach(post => {
feedsContainer.innerHTML+=`
<div class="img-wrapper"><img src="${post.imageUrl}" alt=""></div>
`
    });
})





    
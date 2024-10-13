const categoryContainer=document.querySelector(".category");
const feedsContainer=document.querySelector(".instagramFeeds");
const tagCloudsContainer=document.querySelector(".clouds");
const blogsContainer = document.querySelector(".blogs")
const recentsContainer=document.querySelector(".recents");

import { API_BASE_URL, endpoints } from "./constants.js";
import {getAllData} from "./helpers.js";
document.addEventListener("DOMContentLoaded",async()=>{
    const categories=await getAllData(API_BASE_URL,endpoints.categories);
    const posts=await getAllData(API_BASE_URL,endpoints.blogs);

    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <p>${category.name} <span>( ${category.count} )</span></p>
            <hr>
        `;
        categoryDiv.addEventListener('click', () => {
            const filteredBlogs = posts.filter(post => 
                Array.isArray(post.categories) && post.categories.includes(category.name)
            );
            blogsContainer.innerHTML = '';
            filteredBlogs.forEach((blog)=>{
                const createdTime = `${moment(blog.createdAt).format('D')}<br>${moment(blog.createdAt).format('MMM')}`;
                blogsContainer.innerHTML += `
                <div data-id=${blog.id} class="blogDiv">
                                <div class="img-wrapper">
                                    <img src="${blog.imageUrl}" alt="">
                                                            
                                </div>
                               <div class="content-wrapper">
                               
                             <div class="createdAt">${createdTime}</div>
                             <i class="fa-regular fa-heart likeIcon"></i>            
                             <i class="fa-regular fa-pen-to-square editIcon"></i>
                             <i class="fa-regular fa-trash-can removeIcon"></i>
                                <h2>${blog.title}</h2>
                                <p>${blog.description}</p>
                                <div class="row blogIcons">
                                    <div class="row">
                                        <i class="fa-solid fa-user-pen"></i>
                                        <h4>${blog.createdBy}</h4> 
                                    </div>
                                    <div class="row">
                                        <i class="fa-solid fa-layer-group"></i>
                                         <h4>${blog.categories} </h4> 
                                    </div>
                                    <div class="row">
                                        <i class="fa-regular fa-comments"></i>
                                         <h4>9823 Comments</h4>
                                    </div>
                                </div>
                               </div>
                            </div>
        
                `
            })
        });
        categoryContainer.appendChild(categoryDiv);
        
        tagCloudsContainer.innerHTML+=`
        <div>${category.name}</div>       
        `
    });
   
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





    
const categoryContainer=document.querySelector(".category");
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
    });
})
import { API_BASE_URL, endpoints } from "./constants.js";
import { getAllData, addData } from "./helpers.js";


const submitBtn = document.querySelector(".blogSubmitBtn");
const addForm = document.querySelector(".addFormBlog");

addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let userId = localStorage.getItem("user");
    userId = userId.replace(/["']/g, "");
console.log("User ID from localStorage:", userId); 
console.log("hi");


    if (!userId) {
        Swal.fire("User not found in localStorage");
        return;
    }

    console.log("User ID from localStorage:", userId); 
    const allUsers = await getAllData(API_BASE_URL, endpoints.users); 
    console.log("Fetched users:", allUsers); 


  
    allUsers.forEach(user => {
        console.log("User object:", user); 
        console.log(`Comparing user.id: "${user.id}" with userId: "${userId}"`);
        console.log(`Type of user.id: ${typeof user.id}, Type of userId: ${typeof userId}`);
    });
    
    
    const currentUser = allUsers.find(user => String(user.id).trim() === String(userId).trim());
  
    console.log("Current user found:", currentUser);

    if (!currentUser) {
        Swal.fire("User not found");
        return;
    }

    const createdBy = currentUser.username;

  
    const newTitle = e.target.children[1].value;
    const newDesc = e.target.children[2].value;
    const newImageUrl = e.target.children[3].value;

   
    const selectedCategories = Array.from(document.querySelectorAll('input[name="choices"]:checked'))
        .map((checkbox) => checkbox.value);  
    
    if (newTitle && newDesc && newImageUrl && selectedCategories.length > 0) {
        const newBlog = {
            title: newTitle,
            description: newDesc,
            imageUrl: newImageUrl,
            createdAt: new Date().toISOString(), 
            createdBy: createdBy,  
            categories: selectedCategories.join(', '),  
        };

        await addData(API_BASE_URL, endpoints.blogs, newBlog);

        Swal.fire("Blog added successfully");
    } else {
        Swal.fire("Please fill in all the fields and choose at least one category");
    }
});

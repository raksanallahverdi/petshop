import { checkUser } from "./helpers.js"
import { endpoints } from "./constants.js";
import { getAllData } from "./helpers.js";
import { addData } from "./helpers.js";
let localUsers = JSON.parse(localStorage.getItem("user")) || [];
import { API_BASE_URL } from "./constants.js"
const registerForm = document.querySelector(".registerForm")
const registerFormResponsive = document.querySelector(".registerFormResponsive")
const loginFormResponsive = document.querySelector(".loginFormResponsive")
const loginForm = document.querySelector(".loginForm")
const loginLink = document.querySelector('.loginLink');
const favoritesLink = document.querySelector('.favoritesLink');
const respFavoritesLink = document.querySelector('.respFavoritesLink');
const respLogin = document.querySelector('.respLogin');
const toAddBlog = document.querySelector(".toAddBlog");
const blogBtn = document.querySelector(".blogBtn");
const logBtn=document.querySelector(".logOut");
const logOutLink=document.querySelector(".logOutLink");



window.addEventListener('load', async () => {
    const isLogged = await checkUser();
    console.log('Logged: ', isLogged);
   
   const users = JSON.parse(localStorage.getItem('user')) || [];
   console.log(users);
   

   if (users.length == 0) {
    loginLink.style.display = 'inline-block'; 
       if (respLogin)  respLogin.style.display = 'inline-block'; 
       favoritesLink.style.display = 'none'; 
       respFavoritesLink.style.display = 'none'; 
       if (toAddBlog) toAddBlog.style.display='none'
       logBtn.style.display='none'
       blogBtn.style.display='none'
       logOutLink.style.display='none'
   }
   else{
    loginLink.style.display = 'none'; 
    respLogin.style.display = 'none'; 
    favoritesLink.style.display='inline-block';
    respFavoritesLink.style.display='inline-block';
    toAddBlog.style.display='inline-block'
    logBtn.style.display='inline-block'
    blogBtn.style.display='inline-block'
    logOutLink.style.display='inline-block'

   }  
});
logOutLink.addEventListener("click",(e)=>{
    e.preventDefault();
    Swal.fire({
        title: "Logging Out..",
        text: "Are You Sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("user");
            window.location.reload();
        }
      })
})

logBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    Swal.fire({
        title: "Logging Out..",
        text: "Are You Sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("user");
            window.location.reload();
        }
      })
})

registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e.target.children[3]);
    const users = await getAllData(API_BASE_URL, endpoints.users);

    const newUsername = e.target.children[3].value;
    const newEmail = e.target.children[4].value;
    const newPassword = e.target.children[5].value;

    const duplicateUsername = checkUserName(users, newUsername);
    const duplicateEmail = checkEmail(users, newEmail);


    function checkUserName(users, username) {
        console.log("Users Array", users);
        console.log(username);
        console.log( users[0].username);
        const check = users.find((x) => x.username == username);
        if (check) {
            console.log("Found matching username:", check);
            return true; // Return true if a match is found
        } else {
            console.log("No matching username found.");
            return false; // Return false if no match found
        }
    }

    function checkEmail(users, email) {
        console.log("Users Array", users);
        const check = users.find((x) => x.email == email);
        if (check) {
            console.log("Found matching email:", check);
            return true; // Return true if a match is found
        } else {
            console.log("No matching email found.");
            return false; // Return false if no match found
        }
    }
    if(!newPassword || !newUsername || !newEmail  ){
        Swal.fire("Empty Input is not allowed!");
        return
    }
    if (duplicateUsername) {
        Swal.fire("Username already exist");
        return
    }
    if (duplicateEmail) {
        Swal.fire("Email already exist");
        return
    }
   
    const passwordRegex =
    /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9!@#$%^&*]{5,30})$/;
  if (!passwordRegex.test(newPassword)) {
    Swal.fire("Password does NOT match requirements!");
    return;
  }

    const newUser={       
        username:newUsername,
        email:newEmail,
        password:newPassword,
    }
  
    try {
        await addData(API_BASE_URL, endpoints.users, newUser);
    
            window.location = "http://127.0.0.1:5500/login.html";

    } catch (error) {
        console.error("Error during registration:", error);
        alert("There was an error registering the user. Please try again.");
    }
})
registerFormResponsive?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e.target.children[3]);
    const users = await getAllData(API_BASE_URL, endpoints.users);

    const newUsername = e.target.children[3].value;
    const newEmail = e.target.children[4].value;
    const newPassword = e.target.children[5].value;

    const duplicateUsername = checkUserName(users, newUsername);
    const duplicateEmail = checkEmail(users, newEmail);


    function checkUserName(users, username) {
        console.log("Users Array", users);
        console.log(username);
        console.log( users[0].username);
        const check = users.find((x) => x.username == username);
        if (check) {
            console.log("Found matching username:", check);
            return true; // Return true if a match is found
        } else {
            console.log("No matching username found.");
            return false; // Return false if no match found
        }
    }

    function checkEmail(users, email) {
        console.log("Users Array", users);
        const check = users.find((x) => x.email == email);
        if (check) {
            console.log("Found matching email:", check);
            return true; // Return true if a match is found
        } else {
            console.log("No matching email found.");
            return false; // Return false if no match found
        }
    }
    if(!newPassword || !newUsername || !newEmail  ){
        Swal.fire("Empty Input is not allowed!");
        return
    }
    if (duplicateUsername) {
        Swal.fire("Username already exist");
        return
    }
    if (duplicateEmail) {
        Swal.fire("Email already exist");
        return
    }
   
    const passwordRegex =
    /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9!@#$%^&*]{5,30})$/;
  if (!passwordRegex.test(newPassword)) {
    Swal.fire("Password does NOT match requirements!");
    return;
  }

    const newUser={       
        username:newUsername,
        email:newEmail,
        password:newPassword,
    }
  
    try {
        await addData(API_BASE_URL, endpoints.users, newUser);
    
            window.location = "http://127.0.0.1:5500/login.html";

    } catch (error) {
        console.error("Error during registration:", error);
        alert("There was an error registering the user. Please try again.");
    }
})


console.log("Login form:", loginForm);
if (loginForm) {
    loginForm.addEventListener('submit',async(e)=>{
        e.preventDefault();
        console.log("salam");
        
        
        const users = await getAllData(API_BASE_URL, endpoints.users);
        const username = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
        console.log(username);
        console.log(password);
        
        const check=users.find((user)=>user.username==username)
        if (check && check.password==password){
           console.log("Successfully logged in");
           localStorage.setItem("user", JSON.stringify(check.id));
           window.location.replace("index.html");
           
        }
        else{
            Swal.fire("Username or Password incorrect");
    
        }
    
    })
}
 else{
    console.log("Login form not found");

 }
 if (loginFormResponsive) {
    loginFormResponsive.addEventListener('submit',async(e)=>{
        e.preventDefault();
        console.log("salam");
        
        
        const users = await getAllData(API_BASE_URL, endpoints.users);
        const username = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
        console.log(username);
        console.log(password);
        
        const check=users.find((user)=>user.username==username)
        if (check && check.password==password){
           console.log("Successfully logged in");
           localStorage.setItem("user", JSON.stringify(check.id));
           window.location.replace("index.html");
           
        }
        else{
            Swal.fire("Username or Password incorrect");
    
        }
    
    })
}
 else{
    console.log("Login form not found");

 }


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

if (signUpButton) signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

if (signInButton) signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
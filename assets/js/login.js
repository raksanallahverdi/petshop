import { checkUser } from "./helpers.js"

// function renderNavbar(){

// }
window.addEventListener('load',async()=>{
    const isLogged=await checkUser();
    console.log('Logged: ',isLogged);
    
})
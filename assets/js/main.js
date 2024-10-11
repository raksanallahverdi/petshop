const counted = document.querySelector(".second_count_number");
import { endpoints } from "./constants.js";
import { getAllData } from "./helpers.js"
import { API_BASE_URL } from "./constants.js"
const countedFirst = document.querySelector(".first_count_number");
const countedLast = document.querySelector(".third_count_number");
function animateResultCount(number, target, elem) {
    if (number < target) {
        var interval = setInterval(function () {


            elem.textContent = number;
            if (number >= target) {
                clearInterval(interval);
                return;
            }
            number++;
        }, 30);
    }
    if (target < number) {
        var interval = setInterval(function () {
            elem.textContent = number;
            if (target >= number) {
                clearInterval(interval);
                return;
            }
            number--;
        }, 30);
    }
}
function animateResultCountSlow(number, target, elem) {
    if (number < target) {
        var interval = setInterval(function () {
            elem.textContent = `${number}+ `;
            if (number >= target) {
                clearInterval(interval);
                return;
            }
            number++;
        }, 250);
    }
    if (target < number) {
        var interval = setInterval(function () {
            elem.textContent = number;
            if (target >= number) {
                clearInterval(interval);
                return;
            }
            number--;
        }, 250);
    }
}
if (counted) {
    document.addEventListener('DOMContentLoaded', animateResultCount(1, 452, counted));
}
if (countedFirst) {
    document.addEventListener('DOMContentLoaded', animateResultCountSlow(1, 52, countedFirst));
}
if (countedLast) {
    document.addEventListener('DOMContentLoaded', animateResultCountSlow(1, 52, countedLast));
}



var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 90,
    initialSlide: 1,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        568: {
            slidesPerView: 1.5,
        },
        768: {
            slidesPerView: 1.5,
        },
        1024: {
            slidesPerView: 1.5, // On larger screens, show 2.5 slides (center + partial next and prev)
        }
    }
});
window.addEventListener('scroll', function () {
    var headerBottom = document.querySelector('.header-bottom');
    if (window.scrollY > 400) {
        headerBottom.classList.add('fixed');
    } else {
        headerBottom.classList.remove('fixed');
    }
});







document.addEventListener('DOMContentLoaded', async () => {

const blogsContainer = document.querySelector(".blogs")
const itemsPerPage = 4;
let currentPage = 1;
    const fetchedBlogs = await getAllData(API_BASE_URL, endpoints.blogs);
    const totalPages = Math.ceil(fetchedBlogs.length / itemsPerPage);
    console.log(fetchedBlogs);
 
    

 function displayData(data,page){
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = data.slice(start, end);
    blogsContainer.innerHTML = '';
    paginatedItems.forEach((blog) => {
        console.log(blog);
        
        const createdTime=`${moment(blog.createdAt).format('D')}<br>${moment(blog.createdAt).format('MMM')}`;     

        blogsContainer.innerHTML += `
        <div class="blogDiv">
                        <div class="img-wrapper">
                            <img src="${blog.imageUrl}" alt="">
                        </div>
                       <div class="content-wrapper">
                     <div class="createdAt">${createdTime}</div>
                
                        <h2>${blog.title}</h2>
                        <p>${blog.description}</p>
                        <div class="row blogIcons">
                            <div class="row">
                                <i class="fa-solid fa-user-pen"></i>
                                <h4>Raksanall</h4> 
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

    });
 }
 // Function to handle the Prev/Next button state
 function updateButtons() {
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

// Add event listeners for the Prev/Next buttons
document.getElementById('prevBtn').addEventListener('click', (e) => {

    e.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        displayData(fetchedBlogs, currentPage);
        updateButtons();
    }
});

document.getElementById('nextBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
        currentPage++;
        displayData(fetchedBlogs, currentPage);
        updateButtons();
    }
});

// Initial display of data and button state
displayData(fetchedBlogs, currentPage);
updateButtons();
})
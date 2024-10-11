const counted = document.querySelector(".second_count_number");
import { endpoints } from "./constants.js";
import { getAllData } from "./helpers.js";
let localBlogs = JSON.parse(localStorage.getItem("blog")) || [];
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
    let filteredBlogs = fetchedBlogs; 
    const totalPages = Math.ceil(fetchedBlogs.length / itemsPerPage);
    console.log(fetchedBlogs);



    function displayData(data, page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = data.slice(start, end);
        blogsContainer.innerHTML = '';
        paginatedItems.forEach((blog) => {
            const createdTime = `${moment(blog.createdAt).format('D')}<br>${moment(blog.createdAt).format('MMM')}`;
            blogsContainer.innerHTML += `
        <div data-id=${blog.id} class="blogDiv">
                        <div class="img-wrapper">
                            <img src="${blog.imageUrl}" alt="">
                        </div>
                       <div class="content-wrapper">
                     <div class="createdAt">${createdTime}</div>
                   <i class="fa-regular fa-heart likeIcon"></i>            
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

      
        





        const likeIcons = document.querySelectorAll(".likeIcon");
        likeIcons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const blogDiv = btn.closest(".blogDiv");
                const blogId = blogDiv.getAttribute("data-id");
                console.log("Liked post:", blogDiv);
                if (e.target.classList.contains("fa-regular") && e.target.classList.contains("fa-heart")) {
                    e.target.classList.add("fa-solid");
                    e.target.classList.remove("fa-regular");
                    if (!localBlogs.includes(blogId)) {
                        localBlogs.push(blogId);
                        localStorage.setItem("blog", JSON.stringify(localBlogs));
                    }
                }
                else if(e.target.classList.contains("fa-solid") && e.target.classList.contains("fa-heart")){
                    e.target.classList.remove("fa-solid");
                    e.target.classList.add("fa-regular");
                    localBlogs = localBlogs.filter((id) => id !== blogId);
                    localStorage.setItem("blog", JSON.stringify(localBlogs));   
                   }

            });
        });

        const allCards=document.querySelectorAll(".blogDiv")
        console.log(allCards);
        allCards.forEach((card)=>{
          const theCardId=card.getAttribute("data-id");
          console.log("local BLOGS",localBlogs);
          
          if(localBlogs.includes(theCardId)){
            const cardIcon=card.children[1].children[1];        
            cardIcon.classList.add("fa-solid");
            cardIcon.classList.remove("fa-regular");
            
          }
    })



    }

    function updateButtons() {
        document.getElementById('prevBtn').disabled = currentPage === 1;
        document.getElementById('nextBtn').disabled = currentPage === totalPages;
    }

    const searchInput=document.querySelector(".searchInput");
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toUpperCase();
        const filteredBlogs = fetchedBlogs.filter(blog => 
            blog.title?.toUpperCase().includes(searchTerm)
        );
        currentPage=1;
        const newTotalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
        displayData(filteredBlogs, currentPage);
        updateButtons();
        totalPages = newTotalPages; 
    });


    document.getElementById('prevBtn').addEventListener('click', (e) => {

        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayData(filteredBlogs, currentPage);
            updateButtons();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            displayData(filteredBlogs, currentPage);
            updateButtons();
        }
    });

    displayData(filteredBlogs, currentPage);
    updateButtons();
})



const counted = document.querySelector(".second_count_number");
import { endpoints } from "./constants.js";
import { getAllData } from "./helpers.js";
import { deleteDataById } from "./helpers.js";
import { updateDataById } from "./helpers.js";
let localBlogs = JSON.parse(localStorage.getItem("blog")) || [];
import { API_BASE_URL } from "./constants.js"
const countedFirst = document.querySelector(".first_count_number");
const burgerMenu = document.querySelector(".burgerMenu");
const responsiveMenu = document.querySelector(".responsiveMenu");
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


burgerMenu.addEventListener("click", () => {
    responsiveMenu.classList.toggle("dFlex")
})


document.addEventListener('DOMContentLoaded', async () => {

    const blogsContainer = document.querySelector(".blogs")
    const itemsPerPage = 4;
    let currentPage = 1;
    const fetchedBlogs = await getAllData(API_BASE_URL, endpoints.blogs);
    let filteredBlogs = fetchedBlogs;
    const totalPages = Math.ceil(fetchedBlogs.length / itemsPerPage);
    console.log(fetchedBlogs);


    const users = JSON.parse(localStorage.getItem('user')) || [];
function displayData(data, page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = data.slice(start, end);
        if (blogsContainer) {
            blogsContainer.innerHTML = '';
        }
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
                            <a href="detail.html?id=${blog.id}" class="getDetails">Read More...</a>
                       </div>
                    </div>

        `

        });

        const likeIcons = document.querySelectorAll(".likeIcon");
        const removeIcons = document.querySelectorAll(".removeIcon");
        likeIcons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                if (users.length != 0) {

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
                    else if (e.target.classList.contains("fa-solid") && e.target.classList.contains("fa-heart")) {
                        e.target.classList.remove("fa-solid");
                        e.target.classList.add("fa-regular");
                        localBlogs = localBlogs.filter((id) => id !== blogId);
                        localStorage.setItem("blog", JSON.stringify(localBlogs));
                    }
                }
                else {
                    Swal.fire("Please Log in your Account!");
                }

            });
        });
        removeIcons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                if (users.length != 0) {

                    const blogDiv = btn.closest(".blogDiv");
                    const blogId = blogDiv.getAttribute("data-id");
                    console.log("Deleting post:", blogDiv);
                    deleteDataById(API_BASE_URL, endpoints.blogs, blogId);
                    blogDiv.remove();




                }
                else {
                    Swal.fire("Please Log in your Account!");
                }

            });


        })
        const editIcons = document.querySelectorAll(".editIcon");
        editIcons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const blogId = e.target.parentElement.parentElement.getAttribute("data-id");
                const creatorName = e.target.parentElement.children[6].children[0].children[1].innerHTML;



                const newDiv = document.createElement("div");
                newDiv.classList.add("modal");
                newDiv.innerHTML += `
        <i class="fa-solid fa-xmark finishIcon"></i>
        <h2>Edit Blog Data</h2>
        <input id="editTitle" type="text" value="${e.target.parentElement.children[4].innerHTML}">
        <textarea id="editDescription">${e.target.parentElement.children[5].innerHTML}</textarea>
         <label for="choices">Choose your options:</label>
        <div class="options">
            <label><input type="checkbox" name="choices" value="Health">Health</label>
            <label><input type="checkbox" name="choices" value="Finance">Finance</label>
            <label><input type="checkbox" name="choices" value="Technology">Technology</label>
            <label><input type="checkbox" name="choices" value="Travel">Travel</label>
            <label><input type="checkbox" name="choices" value="Environment">Environment</label>
            <label><input type="checkbox" name="choices" value="Automotive">Automotive</label>
            <label><input type="checkbox" name="choices" value="Lifestyle">Lifestyle</label>
        </div>
        <input id="editImageSrc" type="text" value="${e.target.parentElement.parentElement.children[0].children[0].getAttribute("src")}">
        <button id="submitEdit">Submit</button>
        `
                blogsContainer.appendChild(newDiv);

                const finishIcon = document.querySelector(".finishIcon");
                finishIcon.addEventListener("click", () => {
                    newDiv.remove();
                });

                const submitBtn = document.querySelector("#submitEdit");
                submitBtn.addEventListener("click", async () => {
                    const selectedOptions = Array.from(document.querySelectorAll('input[name="choices"]:checked'))
                        .map((checkbox) => checkbox.value);

                    const updatedBlog = {
                        title: document.getElementById("editTitle").value,
                        createdBy: creatorName,

                        description: document.getElementById("editDescription").value,
                        categories: selectedOptions.join(', '), // Collect checked categories
                        imageUrl: document.getElementById("editImageSrc").value
                    };
                    console.log(blogId);


                    if (blogId && blogId !== 'null') {
                        await updateDataById(API_BASE_URL, endpoints.blogs, blogId, updatedBlog)
                            .then(() => {
                                console.log("Blog updated successfully");
                                window.location.reload();
                            })
                            .catch((error) => {
                                console.error("Failed to update blog:", error);
                            });
                    } else {
                        console.error("Invalid blog ID");
                    }

                    newDiv.remove();
                });
            });
        });


        const allCards = document.querySelectorAll(".blogDiv")
        console.log(allCards);
        allCards.forEach((card) => {
            const theCardId = card.getAttribute("data-id");
            console.log("local BLOGS", localBlogs);

            if (localBlogs.includes(theCardId) && users.length != 0) {
                const cardIcon = card.children[1].children[1];
                cardIcon.classList.add("fa-solid");
                cardIcon.classList.remove("fa-regular");

            }
        })



    }

    function updateButtons() {
        document.getElementById('prevBtn').disabled = currentPage === 1;
        document.getElementById('nextBtn').disabled = currentPage === totalPages;
    }

    const searchInput = document.querySelector(".searchInput");
    if (searchInput) {
        searchInput?.addEventListener("input", () => {
            const searchTerm = searchInput.value.toUpperCase();
            const filteredBlogs = fetchedBlogs.filter(blog =>
                blog.title?.toUpperCase().includes(searchTerm)
            );
            currentPage = 1;
            const newTotalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
            displayData(filteredBlogs, currentPage);
            updateButtons();
            totalPages = newTotalPages;
        });
    }



    document.getElementById('prevBtn')?.addEventListener('click', (e) => {

        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayData(filteredBlogs, currentPage);
            updateButtons();
        }
    });

    document.getElementById('nextBtn')?.addEventListener('click', (e) => {
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



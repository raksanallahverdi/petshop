const counted=document.querySelector(".second_count_number");
const countedFirst=document.querySelector(".first_count_number");
const countedLast=document.querySelector(".third_count_number");
function animateResultCount(number, target, elem) {
    if(number < target) {
        var interval = setInterval(function() {
            elem.textContent = number;
            if (number >= target) {
                clearInterval(interval);
                return;
            }
            number++;
        }, 30);
    }
    if(target < number) {
        var interval = setInterval(function() {
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
    if(number < target) {
        var interval = setInterval(function() {
            elem.textContent = `${number}+ `;
            if (number >= target) {
                clearInterval(interval);
                return;
            }
            number++;
        }, 250);
    }
    if(target < number) {
        var interval = setInterval(function() {
            elem.textContent = number;
            if (target >= number) {
                clearInterval(interval);
                return;
            }
            number--;
        }, 250);
    }
}
document.addEventListener('DOMContentLoaded', animateResultCount(1,452,counted));
document.addEventListener('DOMContentLoaded', animateResultCountSlow(1,52,countedFirst));
document.addEventListener('DOMContentLoaded', animateResultCountSlow(1,52,countedLast));


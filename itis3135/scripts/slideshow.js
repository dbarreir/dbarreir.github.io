let slideIndex = 1;
let slideTimeout = 0;
let slides = document.getElementsByClassName("slide");
let dots = document.getElementsByClassName("dot");

function showSlides(n) {
    clearTimeout(slideTimeout); // In case it's called from a button, reset timeout
    let i;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function plusSlides(n) {
    showSlides(slideIndex += n | 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

showSlides(slideIndex);
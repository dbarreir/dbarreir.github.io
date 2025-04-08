let slideIndex = 1;
let slideTimeout = 0;

function showSlides(n) {
    clearTimeout(slideTimeout); // In case it's called from a button, reset timeout
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
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
    slideTimeout = setTimeout(plusSlides, 2000);
}

function plusSlides(n) {
    showSlides(slideIndex += n | 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

showSlides(slideIndex);
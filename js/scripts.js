// Load default content (Home page) when the page first loads
window.onload = function () {
    loadContent('pages/home.html', true);
    history.replaceState({ page: 'pages/home.html' }, "");
};

function adjustPadding() {
    var header = document.querySelector('header');
    var mainContainer = document.querySelector('.main-container');
    if (window.scrollY > 0 && window.innerWidth >= 1200) {
        var headerHeight = header.offsetHeight;
        mainContainer.style.paddingTop = headerHeight + 'px';
        header.classList.add('fixed');
    } else {
        mainContainer.style.paddingTop = '20px'; // Reset to original padding
        header.classList.remove('fixed');
    }
}

// Add event listener for scroll and resize events
window.addEventListener('scroll', adjustPadding);
window.addEventListener('resize', adjustPadding);

// Ensure the header is fixed or not on initial load
function checkInitialState() {
    adjustPadding();
}

checkInitialState();

function toggleMenu() {
    const navList = document.getElementById('nav-list');
    navList.classList.toggle('active');
}

let slideIndex = 1;
let slideInterval;

startAutoSlide();

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetAutoSlide();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetAutoSlide();
}

function showSlides(n) {
    if (document.querySelector(".slider")) {
        let slides = document.getElementsByClassName("slide");
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.opacity = 0;
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";
        setTimeout(() => {
            slides[slideIndex - 1].style.opacity = 1;
        }, 10);
    }
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

function loadContent(page, addToHistory = true) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('content').innerHTML = xhr.responseText;

            if (addToHistory) {
                history.pushState({ page: page }, "");
            }

            if (page === 'pages/seminar.html') {
                loadSeminars();
            }
        }
    };
    xhr.send();
}

window.onpopstate = function (event) {
    if (event.state && event.state.page) {
        loadContent(event.state.page, false);
    }
};
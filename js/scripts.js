let firefoxHistory = [];
let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

window.onload = function () {
    console.log("window.onload");
    loadContent('pages/home.html', true);
    // history.replaceState({ page: 'pages/home.html' }, "");
    // firefoxHistory.push({ page: 'pages/home.html' });
};

function loadContent(page, addToHistory = true) {
    closeMenu();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('content').innerHTML = xhr.responseText;

            if (addToHistory) {
                history.pushState({ page: page }, "");
                firefoxHistory.push({ page: page });
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
    } else if (isFirefox && firefoxHistory.length > 1) {
        // Handle Firefox initial popstate with null state
        firefoxHistory.pop(); // Remove the current state
        const lastState = firefoxHistory[firefoxHistory.length - 1]; // Get the previous state
        loadContent(lastState.page, false);
    }
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
    const menuIcon = document.querySelector('.menu-icon');
    if (navList.classList.contains('active')) {
        navList.style.maxHeight = '0';
        navList.style.opacity = '0';
        navList.classList.remove('active')
        menuIcon.classList.remove('open');
    } else {
        navList.classList.add('active');
        navList.style.maxHeight = '1000px';
        navList.style.opacity = '1';
        menuIcon.classList.add('open');
    }
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

// close the hamburger menu after clicking links
function closeMenu() {
    const navList = document.getElementById('nav-list');
    const menuIcon = document.querySelector('.menu-icon');
    if (navList.classList.contains('active')) {
        navList.style.maxHeight = '0';
        navList.style.opacity = '0';
        navList.classList.remove('active');
        menuIcon.classList.remove('open');
    }
}

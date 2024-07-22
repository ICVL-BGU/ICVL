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

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeToggle = document.getElementById('theme-toggle');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Light Mode';
    }
}

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
const themeToggle = document.getElementById('theme-toggle');

// If there's a saved theme, use it
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
} else {
    // Otherwise, use the system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Dark Mode';
    }
}

// Listen for system color scheme changes and update theme accordingly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newColorScheme);
    localStorage.setItem('theme', newColorScheme);
    themeToggle.textContent = newColorScheme === 'dark' ? 'Light Mode' : 'Dark Mode';
});

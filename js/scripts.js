function adjustPadding() {
    var header = document.querySelector('header');
    var mainContainer = document.querySelector('.main-container');
    if (window.scrollY > 0 ) {
        let headerHeight = header.offsetHeight;
        mainContainer.style.paddingTop = headerHeight + 'px';
        header.classList.add('fixed');
    } else if (header!== null){
        mainContainer.style.paddingTop = '20px'; // Reset to original padding
        header.classList.remove('fixed');
    }
}
function adjustMenu() {
    let navList = document.getElementById('nav-list');
    if (navList == null) {return;}
    let menuItems = navList.querySelectorAll('li');
    let baseFontSize = 16;
    let basePaddingTopBottom = 10;
    let basePaddingLeftRight = 20;

    if (window.innerWidth < 1620 && window.innerWidth > 768) {
        let decreaseFactor = Math.floor((1620 - window.innerWidth) / 100);
        menuItems.forEach(function(item) {
            let link = item.querySelector('a');
            if(link===null){
                return;
            }
            link.style.fontSize = Math.max((baseFontSize - decreaseFactor),12) + 'px';
            link.style.padding = (basePaddingTopBottom - decreaseFactor) + 'px ' + (basePaddingLeftRight - decreaseFactor) + 'px';
            item.style.margin = (basePaddingTopBottom - decreaseFactor-6) + 'px ' + (basePaddingLeftRight - decreaseFactor-6) + 'px';
        });
    } else {
        menuItems.forEach(function(item) {
            let link = item.querySelector('a');
            link.style.fontSize = baseFontSize + 'px';
            link.style.padding = basePaddingTopBottom + 'px ' + basePaddingLeftRight + 'px';
        });
    }
}



    // Observe changes in the DOM
    const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let navList = document.getElementById('nav-list');
                if (navList) {
                    checkInitialState()
                    observer.disconnect(); // Stop observing after the element is found
                    break;
                }
            }
        }
    });

    // Start observing the document body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });


// Add event listener for scroll and resize events
window.addEventListener('scroll',adjustPadding );
window.addEventListener('resize', adjustMenu);

function checkInitialState() {
    adjustMenu()
    adjustPadding();
}


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


function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    console.log(currentTheme);
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');

// If there's a saved theme, use it
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else {
    // Otherwise, use the system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

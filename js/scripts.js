// Load default content (About page) when the page first loads
window.onload = function () {
    loadContent('pages/home.html');
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

// showSlides(slideIndex);
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
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }

        // Fade out all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.opacity = 0;
            slides[i].style.display = "none";
        }

        // Fade in the target slide
        slides[slideIndex - 1].style.display = "block";
        setTimeout(() => {
            slides[slideIndex - 1].style.opacity = 1;
        }, 10);
    }
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

function loadContent(page) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('content').innerHTML = xhr.responseText;

            // Check if the page being loaded is the publications page
            if (page === 'pages/publications.html') {
                fetchPublications();
            }
            if (page === 'pages/seminar.html') {
                loadSeminars();
            }
        }
    };
    xhr.send();
}

// Fetch publications function

function fetchPublications() {
    console.log('Starting fetch request');
    fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cs.bgu.ac.il/~ben-shahar/publicbyy.html"))
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
        })
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, "text/html");
            const sections = doc.querySelectorAll(".sub_title_page");
            let htmlContent = "";

            sections.forEach(section => {
                const year = section.textContent.trim();
                const publications = section.nextElementSibling.nextElementSibling.querySelectorAll("li");
                let pubList = "";

                publications.forEach(pub => {
                    pubList += `<li>${pub.innerHTML}</li>`;
                });

                htmlContent += `
                    <div class="publication-year">
                        <h2>${year}</h2>
                        <ul class="public">${pubList}</ul>
                    </div>`;
            });

            document.getElementById("publications").innerHTML = htmlContent;
        })
        .catch(error => console.error("Error fetching publications:", error));
}

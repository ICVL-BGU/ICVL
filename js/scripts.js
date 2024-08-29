function adjustPadding() {
    let header = document.querySelector('header');
    let mainContainer = document.querySelector('.main-container');
    if (window.scrollY > 0 ) {
        let headerHeight = header.offsetHeight;
        mainContainer.style.paddingTop = headerHeight + 'px';
        header.classList.add('fixed');
    } else if (header!== null){
        mainContainer.style.paddingTop = '20px'; // Reset to original padding
        header.classList.remove('fixed');
    }
}
window.addEventListener('scroll',adjustPadding );


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

// Add an event listener for window resize
window.addEventListener('resize', function() {
    const navList = document.getElementById('nav-list');
    const menuIcon = document.querySelector('.menu-icon');
    if (window.innerWidth > 768) {
        navList.style.maxHeight = 'none';
        navList.style.opacity = '1';
        navList.classList.remove('active');
        menuIcon.classList.remove('open');
    } else {
        navList.style.maxHeight = '0';
        navList.style.opacity = '0';
        menuIcon.classList.remove('open');
    }
});

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


function toggleTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}


// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');

// If there's a saved theme, use it
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}


function fetchPublications() {
    console.log("fetching publications")
    const currentYear = new Date().getFullYear();
    const baseUrl = "https://www.cs.bgu.ac.il/~ben-shahar/Publications/";
    const src = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cs.bgu.ac.il/~ben-shahar/publicbyy.html");

    console.log('Starting fetch request from: ' + src);

    fetch(src)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
        })
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, "text/html");
            const sections = doc.querySelectorAll(".sub_title_page");
            let htmlContent = "";

            sections.forEach((section) => {
                const year = section.textContent.trim();
                const publications = section.nextElementSibling.nextElementSibling.querySelectorAll("li");
                let pubList = "";

                publications.forEach(pub => {
                    // Modify the publication URL if it starts with "Publications"
                    const links = pub.querySelectorAll("a[href^='Publications']");
                    links.forEach(link => {
                        link.href = baseUrl + link.getAttribute('href').replace('Publications/', '');
                    });

                    pubList += `<li>${pub.innerHTML}</li>`;
                });

                const yearId = `year-${year.replace(/\s+/g, '-')}`;
                const displayStyle = year.includes(currentYear.toString()) ? 'block' : 'none'; // Display current year section by default

                htmlContent += `
                    <div class="publication-year">
                        <h2 onclick="toggleVisibility('${yearId}')">${year}</h2>
                        <ul class="public" id="${yearId}" style="display: ${displayStyle};">${pubList}</ul>
                    </div>`;
            });

            document.getElementById("publications").innerHTML = htmlContent;
        })
        .catch(error => console.error("Error fetching publications:", error));
}

function toggleVisibility(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}




//scale images on research pages when clicked
const images = document.querySelectorAll('.research-section .image-group img');
const overlay = document.createElement('div'), overlayImg = document.createElement('img');
overlay.className = 'image-overlay';
overlay.appendChild(overlayImg);
document.body.appendChild(overlay);

images.forEach(img => {
    img.onclick = () => {
        overlayImg.src = img.src;

        // Calculate the maximum dimensions to fit the screen while maintaining aspect ratio
        const screenWidth = window.innerWidth * 0.5;  // 90% of the viewport width
        const screenHeight = window.innerHeight * 0.5; // 90% of the viewport height
        const imgAspectRatio = img.naturalWidth / img.naturalHeight; // Original image aspect ratio

        if (imgAspectRatio > 1) { // If image is wider than tall
            overlayImg.style.width = `${Math.min(img.naturalWidth, screenWidth)/2}px`;
            overlayImg.style.height = 'auto'; // Maintain aspect ratio
        } else { // If image is taller than wide
            overlayImg.style.height = `${Math.min(img.naturalHeight, screenHeight)/2}px`;
            overlayImg.style.width = 'auto'; // Maintain aspect ratio
        }

        overlay.classList.add('active'); // Show the overlay
    };
});

overlay.onclick = () => overlay.classList.remove('active');

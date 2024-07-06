function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => console.error('Error loading content:', error));
}

// Load default content (About page) when the page first loads
window.onload = function() {
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
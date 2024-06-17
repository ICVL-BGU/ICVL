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
    loadContent('pages/about.html');
};

document.addEventListener("DOMContentLoaded", function() {
    // Load the header
    fetch('/pages/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // Load the footer
    fetch('/pages/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Load the includes (CSS)
    fetch('/css/include_css.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('css-placeholder').innerHTML = data;
        });

    // Load the JavaScript files
    const scripts = [
        'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',
        '/js/scripts.js',
        '/js/seminar.js',
        '/js/publications.js'
    ];

    scripts.forEach(function(src) {
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    });
});

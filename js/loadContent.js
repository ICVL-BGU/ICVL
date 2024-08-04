document.addEventListener("DOMContentLoaded", function() {
    // Load the header
    fetch('/ICVL/pages/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            checkTheme();
        });

    // Load the footer
    fetch('/ICVL/pages/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Load the JavaScript files
    const scripts = [
        'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',
        '/ICVL/js/scripts.js',
        '/ICVL/js/seminar.js',
        '/ICVL/js/publications.js'
    ];

    scripts.forEach(function(src) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = function() {
            if (src.includes('seminar.js')) {
                loadSeminars();
            }
        };
        document.body.appendChild(script);
    });

    function checkTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const toggleSwitch = themeToggle.querySelector('.toggle-switch');
            if (savedTheme === 'dark') {
                toggleSwitch.classList.add('active');
            } else {
                toggleSwitch.classList.remove('active');
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Load the header
    fetch('./pages/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // Load footer only after header is loaded
            return fetch('./pages/footer.html');
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;

            // Load JavaScript files only after header and footer are loaded
            const scripts = [
                'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',
                '/icvl/js/scripts.js', // Your script that uses DOMContentLoaded
                '/icvl/js/seminar.js'
            ];

            // Ensure scripts load in order
            (function loadScriptsInOrder(index) {
                if (index >= scripts.length) return;
                const script = document.createElement('script');
                script.src = scripts[index];
                script.onload = function() {
                    if (scripts[index].includes('seminar.js')) {
                        loadSeminars();
                    }
                    loadScriptsInOrder(index + 1); // Load next script
                };
                document.body.appendChild(script);
            })(0);
        });
});

// Add a fade-in effect after window loads
window.addEventListener('load', function() {
    document.body.classList.add('fade-in');
});

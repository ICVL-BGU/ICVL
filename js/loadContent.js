// Load the header immediately
fetch('./pages/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

        // Load footer immediately after header is loaded
        return fetch('./pages/footer.html');
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;

        // Load JavaScript files asynchronously
        const scripts = [
            'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',
            './js/scripts.js', // Your script that uses DOMContentLoaded
            './js/seminar.js'
        ];

        // Ensure scripts load in order
        (function loadScriptsInOrder(index) {
            if (index >= scripts.length) return;
            const script = document.createElement('script');
            script.src = scripts[index];
            script.async = true; // Load asynchronously
            script.onload = function() {
                if (scripts[index].includes('seminar.js')) {
                    loadSeminars(); // Call function after seminar.js is loaded
                }
                loadScriptsInOrder(index + 1); // Load next script in the array
            };
            document.body.appendChild(script);
        })(0);
    });

// Add a fade-in effect after the window loads
window.addEventListener('load', function() {
    document.body.classList.add('fade-in');
});

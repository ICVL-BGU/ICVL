function fetchPublications() {
    const currentYear = new Date().getFullYear();
    src = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cs.bgu.ac.il/~ben-shahar/publicbyy.html");
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

document.addEventListener("DOMContentLoaded", fetchPublications);

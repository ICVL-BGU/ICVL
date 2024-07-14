
function fetchPublications() {
    src = "https://www.cs.bgu.ac.il/~ben-shahar/publicbyy.html"
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

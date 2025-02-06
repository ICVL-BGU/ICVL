async function loadSeminars() {
    const fileUrl = "https://docs.google.com/spreadsheets/d/1MDLT8jSHvl9DhSy1IPdLInpncZNjpC8lRg-r_of-NsU/gviz/tq?tqx=out:csv";

    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const csvText = await response.text();
        processCSVData(csvText);
    } catch (error) {
        console.error("Error fetching the seminar data:", error);
    }
}

function processCSVData(csvText) {
    // Use a proper CSV parser that handles multi-line fields correctly
    const rows = parseCSV(csvText);

    console.log("Parsed CSV Data:", rows); // Debugging output

    const container = document.getElementById('meetingsContainer');
    if (!container) return;

    let meetingsByYear = {};

    for (let i = 1; i < rows.length; i++) {
        const [date, group, title, abstract] = rows[i];

        if (!date || date.trim() === "") {
            console.warn(`Skipping row ${i} due to missing date:`, rows[i]);
            continue;
        }

        const parsedDate = parseDate(date);
        const year = parsedDate.getFullYear();

        if (!meetingsByYear[year]) meetingsByYear[year] = [];

        meetingsByYear[year].push({
            date: parsedDate.toLocaleDateString("en-GB"),
            group: group || "Unknown",
            title: title || "No Title",
            abstract: abstract || "No Abstract",
        });
    }

    renderMeetings(meetingsByYear, container);
}

function renderMeetings(meetingsByYear, container) {
    let meetingHTML = '';

    Object.entries(meetingsByYear)
        .sort((a, b) => b[0] - a[0])
        .forEach(([year, meetings]) => {
            meetingHTML += `<div class="year-group"><h2 class="year-header">${year}</h2><div class="year-meetings">`;

            meetings.forEach(meeting => {
                meetingHTML += `
                    <div class="meeting">
                        <p class="date">${meeting.date} | ${meeting.group}</p>
                        <p class="title meeting-title">${meeting.title}</p>
                        <p class="abstract">${meeting.abstract}</p>
                    </div>
                `;
            });

            meetingHTML += '</div></div>';
        });

    container.innerHTML = meetingHTML;
    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll('.year-header').forEach(header => {
        header.addEventListener('click', () => {
            const yearMeetings = header.nextElementSibling;
            yearMeetings.classList.toggle('active');
        });
    });

    document.querySelectorAll('.meeting-title').forEach(titleElement => {
        titleElement.addEventListener('click', () => {
            const abstractElement = titleElement.nextElementSibling;
            abstractElement.classList.toggle('active');
        });
    });
}

function parseDate(dateString) {
    if (!dateString) return new Date();

    if (!isNaN(dateString)) {
        const excelDate = Number(dateString);
        return new Date((excelDate - 25569) * 86400000);
    }

    const parts = dateString.split(/[./-]/).map(Number);

    if (parts.length === 3) {
        let [day, month, year] = parts;

        if (year < 100) year += 2000;

        return new Date(year, month - 1, day);
    }

    console.warn("Invalid date format:", dateString);
    return new Date();
}

// **CSV Parser to Handle Multi-Line Fields**
function parseCSV(csvText) {
    const rows = [];
    let currentRow = [];
    let currentField = "";
    let insideQuotes = false;

    for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];

        if (char === '"' && nextChar === '"') {
            currentField += '"';
            i++; // Skip next quote
        } else if (char === '"') {
            insideQuotes = !insideQuotes; // Toggle insideQuotes
        } else if (char === ',' && !insideQuotes) {
            currentRow.push(currentField.trim());
            currentField = "";
        } else if (char === '\n' && !insideQuotes) {
            currentRow.push(currentField.trim());
            rows.push(currentRow);
            currentRow = [];
            currentField = "";
        } else {
            currentField += char;
        }
    }

    if (currentField) currentRow.push(currentField.trim());
    if (currentRow.length > 0) rows.push(currentRow);

    return rows;
}

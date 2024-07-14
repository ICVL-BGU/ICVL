
function loadSeminars() {
    fetch('./assets/seminar/seminar_data.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const container = document.getElementById('meetingsContainer');
            if (container) {
                const workbook = XLSX.read(data, {type: 'array'});
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(sheet);
                let meetingsByYear = {};

                rows.forEach(row => {
                    const date = row.Date;
                    const group = row.Group;
                    const title = row.Title;
                    const abstract = row.Abstract;
                    const year =parseDate(date).getFullYear();
                    if (!meetingsByYear[year]) {
                        meetingsByYear[year] = [];
                    }

                    meetingsByYear[year].push({ date, group, title, abstract });
                });

                let meetingHTML = '';

                for (const [year, meetings] of Object.entries(meetingsByYear).sort((a, b) => b[0] - a[0])) {
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
                }

                container.innerHTML = meetingHTML;

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
            } else {
                console.error('Meeting container not found');
            }
        })
        .catch(error => console.error('Error fetching the seminar data:', error));
}

function parseDate(dateString) {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
}
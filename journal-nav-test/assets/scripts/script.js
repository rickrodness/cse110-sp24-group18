window.addEventListener('DOMContentLoaded', init);

/**
 * Refreshes the file navigation with current journals in storage.
 */
function loadButtons() {
    const navContainer = document.getElementById('nav-container');
    navContainer.innerHTML = '';

    const name = 'journal-nav';
    
    const listJournals = listFiles();
    console.log(listJournals);

    const navButtonsList = document.createElement('ul');
    navButtonsList.setAttribute("class", "nav-buttons-list");

    for (const journal in listJournals) {

        if (listJournals[journal].filter === false) {
            continue;
        }

        const calendarDiv = document.createElement('div');
        const calendar = document.createElement('time');
        const week = document.createElement('em');
        const month = document.createElement('strong');
        const day = document.createElement('span');
        const desc = document.createElement('p');
        const mod = document.createElement('h2');

        const buttonContainer = document.createElement('li');

        const id = listJournals[journal]['date'];
        const dateObj = new Date(id);
        const dayOfWeek = dateObj.getDay();
        const dayNames = [
            "Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
        ];
        const monthNames = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];

        calendar.setAttribute("datetime", id);
        calendar.setAttribute("class", "icon");
        calendarDiv.setAttribute("class", "calendar-icon");

        week.textContent = dayNames[dayOfWeek];
        month.textContent = monthNames[dateObj.getMonth()];
        day.textContent = id.slice(-2);

        calendar.appendChild(week);
        calendar.appendChild(month);
        calendar.appendChild(day);

        calendarDiv.appendChild(calendar);

        const radioButton = document.createElement("input");
        radioButton.setAttribute("type", "radio");
        radioButton.setAttribute("id", id);
        radioButton.setAttribute("name", name);

        const label = document.createElement("label");
        label.setAttribute("for", id);
        label.textContent = listJournals[journal]['title'];
        let dots = '';
        const maxLen = 33;
        let length = maxLen;
        if (listJournals[journal]['data'].length > maxLen) {
            dots = '...';
            length = length - 3;
        }
        desc.textContent = listJournals[journal]['data'].substring(0, length) + dots;
        mod.textContent = 'Last Modified: ' + listJournals[journal]['lastMod'];
        label.appendChild(desc);
        label.appendChild(mod);

        buttonContainer.appendChild(calendarDiv);
        buttonContainer.appendChild(radioButton);
        buttonContainer.appendChild(label);
        navButtonsList.appendChild(buttonContainer);
    }

    navContainer.appendChild(navButtonsList);
}

/**
 * Attatches event listeners to all buttons that update text.
 */
function buttonListeners() {
    const navContainer = document.getElementById('nav-container');
    const radioButtons = navContainer.querySelectorAll("input[type='radio']");
    radioButtons.forEach(radioButton => {
        const id = radioButton.id;
        radioButton.addEventListener('click', function(event) {
            changeText(id);
        });
    });
}

/**
 * Updates text in a text div.
 * @param {string} date date to query
 */
function changeText(date) {
    console.log(`Changing text area: '${date}'.`)
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';

    const journal = readFile(date);
    textContainer.textContent = journal['data'];
}

/**
 * Adds event listeners to all filtering buttons.
 */
function filterButtons() {
    const latestButton = document.getElementById('latest');
    const earliestButton = document.getElementById('earliest');
    const thisMonthButton = document.getElementById('thisMonth');
    const selectButton = document.getElementById('select');
    const textField = document.getElementById('textQuery');

    // init
    latestButton.checked = true;
    sortByDateCreated(1);
    buttonListeners();

    latestButton.addEventListener('click', function(event) {
        sortByDateCreated(1);
        buttonListeners();
    });

    earliestButton.addEventListener('click', function(event) {
        sortByDateCreated(-1);
        buttonListeners();
    });

    thisMonthButton.addEventListener('change', function(event) {
        if (thisMonthButton.checked) {
            const yAndM = getCurrentYearAndMonth();
            filterDate(yAndM['year'], yAndM['month']);
        } else {
            clearFilter();
        }
        buttonListeners();
    });

    textField.addEventListener('input', function(event) {
        if (selectButton.checked) {
            filterWord(textField.value);
            buttonListeners();
        }
    });

    selectButton.addEventListener('change', function(event) {
        if (selectButton.checked) {
            filterWord(textField.value);
        } else {
            clearFilter();
        }
        buttonListeners();
    })
}

/**
 * Generates an example.
 */
function generateExample() {
    clearLocal();
    forceCreate('What is this? Where am I?', '2024-04-14', 'Who are you?');
    forceCreate('I hope this works!', '2024-05-17', 'yay!');
    forceCreate('This is a test!', '2024-04-23', 'This is not a drill');
    forceCreate('Hello there', '2024-05-15', 'Hi');
    forceCreate('Graphic design is my passion', '2024-04-19', 'test');
    forceCreate('Flexpidition', '2024-05-10', '');
    forceCreate('trettggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg', '2024-05-09', 'long word');
    forceCreate('this is a test this is a test this is a test this is a test this is a test', '2024-05-08', 'long sentence');
    loadButtons();
    buttonListeners();
}

/**
 * Runs this on document load.
 */
function init() {
    generateExample();
    filterButtons();
}

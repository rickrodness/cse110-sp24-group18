window.addEventListener('DOMContentLoaded', init); // set init to run on document load

/**
 * Refreshes the file navigation with current journals in storage.
 */
function loadButtons() {
    let currentMood = 'neutral';
    const navContainer = document.getElementById('nav-container'); // get the journals container
    navContainer.innerHTML = ''; // reset the HTML inside container

    const name = 'journal-nav'; // name of radio buttons to link them together
    
    const listJournals = listFiles(); // get all the journals as a dictionary

    const navButtonsList = document.createElement('ul'); // create list element to house journals
    navButtonsList.setAttribute("class", "nav-buttons-list"); // set the class of list

    for (const journal in listJournals) { // generate each button for each journal

        if (listJournals[journal].filter === false) { // only render button if it passes a filter
            continue;
        }

        // create all elements for the calendar icon
        const calendarDiv = document.createElement('div'); // calendar icon wrapper
        const calendar = document.createElement('time'); // calendar icon
        const week = document.createElement('em'); // week text
        const month = document.createElement('strong'); // month text
        const day = document.createElement('span'); // day text

        const desc = document.createElement('p'); // journal description
        const mod = document.createElement('h2'); // journal last date modified

        const buttonContainer = document.createElement('li'); // journal button container

        const id = listJournals[journal]['date']; // use the journal date as the key
        const dateObj = new Date(id); // create date object from journal date

        const dayNames = [ // day of week array to check string against
            "Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
        ];
        const monthNames = [ // day of month array to check string against
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];

        calendar.setAttribute("datetime", id); // set datetime to the date
        calendar.setAttribute("class", "icon"); // set the class
        calendarDiv.setAttribute("class", "calendar-icon"); // set the class of overall div

        week.textContent = dayNames[dateObj.getDay()]; // update text for week
        month.textContent = monthNames[dateObj.getMonth()]; // update text for month
        day.textContent = id.slice(-2); // update text for day

        calendar.appendChild(week); // append all to calendar
        calendar.appendChild(month);
        calendar.appendChild(day);

        calendarDiv.appendChild(calendar); // append calendar to container div

        const radioButton = document.createElement("input"); // create actual journal entry selector
        radioButton.setAttribute("type", "radio"); // set all attributes
        radioButton.setAttribute("id", id);
        radioButton.setAttribute("name", name);

        if (listJournals[journal]['currentlySelected']) {
            radioButton.checked = true;
            currentMood = listJournals[journal]['mood'];
            console.log('checking journal: '+currentMood)
            const gradBackground = document.getElementsByClassName('background')[0];
            gradBackground.style.background = `linear-gradient(360deg,${returnColorForMood(currentMood)['background']},#fdfdfd)`;
        }

        const label = document.createElement("label"); // create label for journal entry
        label.setAttribute("for", id); // attatch label to button
        label.textContent = listJournals[journal]['title']; // set text for label
        label.style.backgroundColor = returnColorForMood(listJournals[journal]['mood'])['background'];
        label.style.color = returnColorForMood(listJournals[journal]['mood'])['text'];

        // add logic to create a max length for description
        let dots = ''; // default ellipsis to nothing in case short string
        const maxLen = 33; // set a maximum string length
        let length = maxLen;
        if (listJournals[journal]['data'].length > maxLen) { // check if data exceeds max length
            dots = '...'; // if data is long, then add ellipsis to the end of it
            length = length - 3; // accomodate for ellipsis being added
        }
        desc.textContent = listJournals[journal]['data'].substring(0, length) + dots; // cut string short
        desc.style.color = returnColorForMood(listJournals[journal]['mood'])['desc'];

        mod.textContent = 'Last Modified: ' + listJournals[journal]['lastMod']; // add last modified date
        mod.style.color = returnColorForMood(listJournals[journal]['mood'])['mod'];

        label.appendChild(desc); // append the description and date modified
        label.appendChild(mod);

        buttonContainer.appendChild(calendarDiv); // append all to button container
        buttonContainer.appendChild(radioButton);
        buttonContainer.appendChild(label);

        navButtonsList.appendChild(buttonContainer); // append each button to the overall list
    }

    navContainer.appendChild(navButtonsList); // append the list to the navigation container
}

function returnColorForMood(mood) {
    switch (mood) {
        case 'neutral':
            return {'background':'#C9F6FF', 'text':'#84A2A8', 'desc':'#9CBFC6', 'mod':'#70898E'};
        case 'angry':
            return {'background':'#FBC3BC', 'text':'#A27F7A', 'desc':'#C19791', 'mod':'#886A66'};
        case 'happy':
            return {'background':'#C7F9CC', 'text':'#82A285', 'desc':'#9AC19F', 'mod':'#6C8870'};
        case 'sad':
            return {'background':'#e2c9ff', 'text':'#9584A8', 'desc':'#AF9CC6', 'mod':'#7E708D'};
        case 'excited':
            return {'background':'#fffec9', 'text':'#A8A784', 'desc':'#C6C49C', 'mod':'#8D8B6F'};
        default:
            return {'background':'#C9F6FF', 'text':'#84A2A8', 'desc':'#9CBFC6', 'mod':'#70898E'};
    }
}

/**
 * Attatches event listeners to all buttons that update text.
 */
function buttonListeners() {
    const navContainer = document.getElementById('nav-container'); // get navigation container
    const radioButtons = navContainer.querySelectorAll("input[type='radio']"); // get all journal buttons
    radioButtons.forEach(radioButton => { // go through all journal buttons
        const id = radioButton.id; // take the current date of journal
        radioButton.addEventListener('click', function(event) {
            changeText(id); // change the text of text field based on data in queried data
            selectDate(id); // keep current journal selected

            const journals = getJournals();
            console.log('activating button event');
            const gradBackground = document.getElementsByClassName('background')[0];
            gradBackground.style.background = `linear-gradient(360deg,${returnColorForMood(journals[id]['mood'])['background']},#fdfdfd)`;
        });
    });
}

/**
 * Updates text in a text div.
 * @param {string} date date to query
 */
function changeText(date) {
    console.log(`Changing text area: '${date}'.`)
    updateText(date);
}

/**
 * Adds event listeners to all filtering buttons.
 */
function filterButtons() {
    const latestButton = document.getElementById('latest'); // button to sort by latest
    const earliestButton = document.getElementById('earliest'); // button to sort by earliest
    const thisMonthButton = document.getElementById('thisMonth'); // button to filter this month's journals
    const selectButton = document.getElementById('select'); // button to activate text query
    const textField = document.getElementById('textQuery'); // text field to enter text query

    // init
    latestButton.checked = true; // default to descending order
    sortByDateCreated(1); // call sort with param 1 (descending)
    buttonListeners(); // re-attatch event listeners

    latestButton.addEventListener('click', function(event) {
        sortByDateCreated(1); // call sort with param 1 (descending)
        buttonListeners(); // re-attatch event listeners
    });

    earliestButton.addEventListener('click', function(event) {
        sortByDateCreated(-1); // call sort with param not 1 (ascending)
        buttonListeners(); // re-attatch event listeners
    });

    thisMonthButton.addEventListener('change', function(event) {
        if (thisMonthButton.checked) { // check if filter is activated
            const yAndM = getCurrentYearAndMonth(); // get the current year and month as numbers
            filterDate(yAndM['year'], yAndM['month']); // filter by the year and month
        } else {
            clearFilter(); // clear all filters
        }
        buttonListeners(); // re-attatch event listeners
    });

    textField.addEventListener('input', function(event) {
        if (selectButton.checked) { // check if select is checked
            filterWord(textField.value); // filter by text field
            buttonListeners(); // re-attatch event listeners
        }
    });

    selectButton.addEventListener('change', function(event) {
        if (selectButton.checked) { // filter when select is checked
            filterWord(textField.value); // filter by text field
        } else {
            clearFilter(); // clear all filters
        }
        buttonListeners(); // re-attatch event listeners
    })
}

/**
 * Generates an example.
 */
function generateExample() {
    clearLocal();
    forceCreate('What is this? Where am I?', '2024-04-14', 'Who are you?', 'angry');
    forceCreate('I hope this works!', '2024-05-18', 'yay!', 'excited');
    forceCreate('This is a test!', '2024-04-23', 'This is not a drill', 'happy');
    forceCreate('Hello there', '2024-05-15', 'Hi', 'sad');
    forceCreate('Graphic design is my passion', '2024-04-19', 'test', 'excited');
    forceCreate('Flexpidition', '2024-05-10', '', 'angry');
    forceCreate('trettggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg', '2024-05-09', 'long word', 'happy');
    forceCreate('this is a test this is a test this is a test this is a test this is a test', '2024-05-08', 'long sentence', 'neutral');
    loadButtons();
    buttonListeners();
}

function generateToday() {
    createFile('');
}

/**
 * Runs this on document load.
 */
function init() {
    generateExample();
    setDate();
    generateToday();

    textEditorListeners();
    filterButtons();
    attatchSplashListener()
}

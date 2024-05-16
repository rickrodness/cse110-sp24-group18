/**
 * Creates a file with basic text data.
 * @param {string} data text associated with date
 */
function createFile(data) {
    const dateToday = formatToday();
    let journals = getJournals();
    const defaultTitle = 'Untitled';
    
    const templateJson = {
        'data': data,
        'date': dateToday,
        'lastMod': dateToday,
        'title': defaultTitle,
        'filter': true,
        'mood': ''
    };

    if (dateToday in journals) {
        console.log(`Date already exists.`);
    } else {
        journals[dateToday] = templateJson;
        const jsonString = JSON.stringify(journals);
        localStorage.setItem('journals', jsonString);
        console.log(`Created JSON file: '${dateToday}' and added to localStorage.`);
    }
}

/**
 * Force create a file with given data, date and a title.
 * @param {string} data text associated with date
 * @param {string} date date created
 * @param {string} title display title
 */
function forceCreate(data, date, title) {
    const dateToday = formatToday();
    let journals = getJournals();

    if (!title) {
        title = 'Untitled';
    }

    const templateJson = {
        'data': data,
        'date': date,
        'lastMod': dateToday,
        'title': title,
        'filter': true,
        'mood': ''
    };

    if (date in journals) {
        console.log(`Date already exists.`);
    } else {
        journals[date] = templateJson;
        const jsonString = JSON.stringify(journals);
        localStorage.setItem('journals', jsonString);
        console.log(`Force created JSON file: '${date}' and added to localStorage.`);
    }
}

/**
 * Writes new data to a current file.
 * @param {dict} newData replacement data
 * @param {string} date date to query
 */
function writeFile(newData, date) {
    const dateToday = formatToday();
    let journals = getJournals();

    if (date in journals) {
        journals[date] = newData;
        journals[date]['lastMod'] = dateToday;
        const jsonString = JSON.stringify(journals);
        localStorage.setItem('journals', jsonString);
        console.log(`Modified JSON file: '${date}' and added to localStorage.`);
    } else {
        forceCreate(newData['data'], date);
        writeFile(newData, date);
    }
}

/**
 * Deletes a given file.
 * @param {string} date date to query
 */
function deleteFile(date) {
    let journals = getJournals();
    if (date in journals) {
        delete journals[date];
        const jsonString = JSON.stringify(journals);
        localStorage.setItem('journals', jsonString);
        console.log(`Deleted JSON file: '${date}'.`);
    } else {
        console.log(`File ${date} not found.`);
    }
}

/**
 * Reads a file.
 * @param {string} date date to query
 * @returns dict of journal at given date, or null if it does not exist
 */
function readFile(date) {
    let journals = getJournals();
    if (date in journals) {
        console.log(`Reading JSON file: '${date}'.`);
        return journals[date];
    } else {
        console.log(`File '${date}' not found.`);
        return null;
    }
}

/**
 * Lists files to and returns them.
 * @returns dictionary of journals
 */
function listFiles() {
    const journals = getJournals();
    console.log(`Listing all journals: '${JSON.stringify(journals)}'`)
    return journals;
}

/**
 * Sorts files by date created and reloads the buttons.
 * @param {number} val 1 for descending, other for ascending
 */
function sortByDateCreated(val) {
    const journals = getJournals();
    let entries = Object.entries(journals);
    if (val === 1) {
        entries.sort((a,b) => b[1].date.localeCompare(a[1].date));
        console.log('Sort by descending');
    } else {
        entries.sort((a,b) => a[1].date.localeCompare(b[1].date));
        console.log('Sort by ascending');
    }
    let sorted = Object.fromEntries(entries);
    const jsonString = JSON.stringify(sorted);
    localStorage.setItem('journals', jsonString);
    loadButtons();
}

/**
 * Sorts files by date last modified and reloads the buttons.
 * @param {number} val 1 for descending, other for ascending
 */
function sortByLastModified(val) {
    const journals = getJournals();
    let entries = Object.entries(journals);
    if (val === 1) {
        entries.sort((a,b) => b[1].lastMod.localeCompare(a[1].lastMod));
        console.log('Sort by descending');
    } else {
        entries.sort((a,b) => a[1].lastMod.localeCompare(b[1].lastMod));
        console.log('Sort by ascending');
    }
    let sorted = Object.fromEntries(entries);
    const jsonString = JSON.stringify(sorted);
    localStorage.setItem('journals', jsonString);
    loadButtons();
}

/**
 * Filters the files by year and month.
 * @param {number} year year to query
 * @param {number} month month to query as number between 1 and 12
 */
function filterDate(year, month) {
    let journals = getJournals();
    const targetYearMonth = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}`;

    for (let journal in journals) {
        const journalDate = journals[journal].date;
        const journalYearMonth = journalDate.slice(0, 7);

        if (journalYearMonth === targetYearMonth) {
            journals[journal].filter = true;
        } else {
            journals[journal].filter = false;
        }
    }
    const jsonString = JSON.stringify(journals);
    localStorage.setItem('journals', jsonString);
    loadButtons();
}

/**
 * Filters the files by phrase in file.
 * @param {string} str phrase to query
 */
function filterWord(str) {
    let journals = getJournals();
    for (let journal in journals) {
        if (journals[journal].data.toUpperCase().includes(str.toUpperCase())) {
            journals[journal].filter = true;
        } else {
            journals[journal].filter = false;
        }
    }
    const jsonString = JSON.stringify(journals);
    localStorage.setItem('journals', jsonString);
    loadButtons();
}

/**
 * Clears the current filtering options.
 */
function clearFilter () {
    let journals = getJournals();
    for (let journal in journals) {
        journals[journal].filter = true;
    }
    const jsonString = JSON.stringify(journals);
    localStorage.setItem('journals', jsonString);
    loadButtons();
}

// helper

/**
 * Clears the current localStorage.
 */
function clearLocal() {
    //localStorage.clear();
    localStorage.removeItem('journals');
    
    console.log('Local storage has been cleared.');
}

/**
 * Gets current journals from local storage.
 * @returns dictionary of journals
 */
function getJournals() {
    const journals = localStorage.getItem('journals');
    let journalObj = {};
    const jsonString = JSON.stringify(journalObj);
    
    if (journals) {
        journalObj = JSON.parse(journals);
        return journalObj;
    } else {
        localStorage.setItem('journals', jsonString);
        return journalObj;
    }
}

/**
 * Gets the date today and formats it.
 * @returns formatted date 'YYYY-MM-DD'
 */
function formatToday() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

/**
 * Gets the year and month today.
 * @returns dictionary with year and month
 */
function getCurrentYearAndMonth() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    return { year: currentYear, month: currentMonth };
}

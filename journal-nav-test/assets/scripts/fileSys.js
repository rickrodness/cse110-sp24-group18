function createFile(data) {
    const dateToday = formatToday();
    let journals = getJournals();
    
    const templateJson = {
        'data': data,
        'date': dateToday,
        'lastMod': dateToday
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

function forceCreate(data, date) {
    const dateToday = formatToday();
    let journals = getJournals();

    const templateJson = {
        'data': data,
        'date': date,
        'lastMod': dateToday
    };

    if (date in journals) {
        console.log(`Date already exists.`);
    } else {
        journals[date] = templateJson;
        const jsonString = JSON.stringify(journals);
        localStorage.setItem('journals', jsonString);
        console.log(`Created JSON file: '${date}' and added to localStorage.`);
    }
}

function writeFile(newData, date) {
    const dateToday = formatToday();
    let journals = getJournals();

    if (date in journals) {
        journals[date]['data'] = newData;
        journals[date]['lastMod'] = dateToday;
        const jsonString = JSON.stringify(journals);
        localStorage.setItem('journals', jsonString);
        console.log(`Modified JSON file: '${date}' and added to localStorage.`);
    } else {
        createFile(newData);
    }
}

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

function listFiles() {
    const journals = getJournals();
    console.log(`Listing all journals: '${JSON.stringify(journals)}'`)
    return journals;
}

// helper

function clearLocal() {
    localStorage.clear();
    
    console.log('Local storage has been cleared.');
}

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
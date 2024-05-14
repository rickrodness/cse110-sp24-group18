const fs = require("fs");
const path = require('path');

/**
 * Reads a json file and returns the contents
 * @param {string} pathStr path to file from source
 * @returns json contents on success, or null on faliure
 */
function readFile(pathStr) {
    try {
        const data = fs.readFileSync(pathStr, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Error: File '${filename}' not found.`);
        } else {
            console.error(`Error reading JSON file '${filename}': ${error.message}`);
        }
        return null;
    }
}

/**
 * Creates a blank json file
 * @param {string} dir path to directory
 * @returns 1 on success, or null on faliure
 */
function createFile(dir) {
    const dateToday = formatToday();
    
    // guard against duplicate dates
    if (searchFile(dateToday, dir)) {
        return null;
    }

    const fileName = `${dateToday}.json`;

    let dict = {
        data: '',
        date: dateToday,
        lastMod: dateToday
    };
    const filePath = path.join(dir, fileName);

    try {
        const jsonData = JSON.stringify(dict);
        fs.writeFileSync(filePath, jsonData);
        return 1;
    } catch (error) {
        return null;
    }
}

/**
 * Writes new data to a given file
 * @param {string} newData new data to be written
 * @param {string} pathStr path to file
 * @returns 1 on success, or null on faliure
 */
function writeFile(newData, pathStr) {
    try {
        const dateModify = formatToday();
        let existingData = JSON.parse(fs.readFileSync(pathStr, 'utf8'));
        existingData.data = newData;
        existingData.lastMod = dateModify;
        fs.writeFileSync(pathStr, JSON.stringify(existingData));
        return 1;
    } catch (error) {
        console.error(`Error replacing data field in ${pathStr}: ${error.message}`);
        return null;
    }
}

/**
 * Deletes a given file
 * @param {string} pathStr path to the file
 * @returns json file contents on success, or null on faliure
 */
function deleteFile(pathStr) {
    try {
        const data = readFile(pathStr);
        fs.unlinkSync(pathStr);
        return data; // for undo delete functionality
    } catch (error) {
        console.error(`Error deleting file '${pathStr}': ${error.message}`);
        return null;
    }
}

/**
 * Searches for file with given date
 * @param {string} dateStr date to search for
 * @param {string} dir directory to search in
 * @returns file name on success, or null on faliure
 */
function searchFile(dateStr, dir) {
    try {
        const files = fs.readdirSync(dir);
        const matchingFile = files.find(file => {
            return file === `${dateStr}.json`;
        });

        if (matchingFile) {
            return matchingFile;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error searching files in directory '${dir}': ${error.message}`);
        return null;
    }
}

/**
 * Lists all file in a directory
 * @param {string} dir directory in question
 * @returns array of files, or empty array on faliure
 */
function listFiles(dir) {
    try {
        const files = fs.readdirSync(dir);
        return files;
    } catch (error) {
        console.error(`Error listing files in directory '${dir}': ${error.message}`);
        return [];
    }
}

// HELPER FUNCTIONS

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

module.exports({ readFile, writeFile, deleteFile, createFile, searchFile, listFiles });
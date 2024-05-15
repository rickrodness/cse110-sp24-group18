window.addEventListener('DOMContentLoaded', init);

function loadButtons() {
    const navContainer = document.getElementById('nav-container');
    navContainer.innerHTML = '';

    const name = 'journal-nav';
    
    const listJournals = listFiles();
    console.log(listJournals);
    for (const journal in listJournals) {
        const buttonContainer = document.createElement('div');

        const id = listJournals[journal]['date'];
        buttonContainer.setAttribute("id", id);
        buttonContainer.setAttribute("class", "journal-nav")
        const radioButton = document.createElement("input");
        radioButton.setAttribute("type", "radio");
        radioButton.setAttribute("id", id);
        radioButton.setAttribute("name", name);

        const label = document.createElement("label");
        label.setAttribute("for", id);
        label.textContent = id;

        buttonContainer.appendChild(radioButton);
        buttonContainer.appendChild(label);
        navContainer.appendChild(buttonContainer);
    }
}

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

function changeText(date) {
    console.log(`Changing text area: '${date}'.`)
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = '';

    const journal = readFile(date);
    textContainer.textContent = journal['data'];
}

function init() {
    clearLocal();
    forceCreate('What is this? Where am I?', '2024-05-14');
    forceCreate('Woe is me!', '2024-05-17');
    forceCreate('This is a test!', '2024-05-23');
    forceCreate('Hello there', '2024-05-15');
    forceCreate('Graphic design is my passion', '2024-05-19');
    forceCreate('Flexpidition', '2024-05-10');
    loadButtons();
    buttonListeners();
}
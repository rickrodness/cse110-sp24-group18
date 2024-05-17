const boldBtn = document.querySelector("#bold-btn")
const underlineBtn = document.querySelector("#underline-btn")
const italicBtn = document.querySelector("#italic-btn")
const colorBtn = document.querySelector("#color-btn")

const content = document.querySelector("#content")
const noteTitle = document.querySelector('.title')

boldBtn.addEventListener("click", () => {
    document.execCommand("bold")
})

underlineBtn.addEventListener("click", () => {
    document.execCommand("underline")
})

italicBtn.addEventListener("click", () => {
    document.execCommand("italic")
})

colorBtn.addEventListener("input", () => {
    document.execCommand("forecolor", false, colorBtn.value)
})

function setDate(){
  noteTitle.id = formatToday();
}

function updateJournal(date, contentHTML){
    if (content && content.getAttribute('contenteditable') === 'true') {
        let journals = getJournals();
        let journal = journals[date];
        journal['data'] = contentHTML
        console.log('TESTESTEST' + JSON.stringify(journal));
        writeFile(journal, date);
    } else {
      return 'Container not found or not contenteditable';
    }
}

function textEditorListeners() {
    content.addEventListener('input', () => {
        let currDate = noteTitle.id;
        const contentHTML = content.innerHTML;
        updateJournal(currDate, contentHTML);
        filterButtons();
    })
}

function updateText(date) {
    const journals = getJournals();
    const currJournal = journals[date];
    const text = currJournal.data;
    const title = currJournal.title;

    const titleElement = document.getElementsByClassName('title-container');
    const titleDisplay = titleElement[0].querySelector('h4');
    const contentElement = document.getElementById('content');

    contentElement.innerHTML = text;
    titleDisplay.textContent = title;

    titleDisplay.id = date;
}
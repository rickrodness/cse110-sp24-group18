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

function journalToString(date){
    if (content && content.getAttribute('contenteditable') === 'true') {
      return content.innerHTML;
    } else {
      return 'Container not found or not contenteditable';
    }
}

content.addEventListener('input', () => {
  let currDate = noteTitle.id;
  journalToString(currDate);
})

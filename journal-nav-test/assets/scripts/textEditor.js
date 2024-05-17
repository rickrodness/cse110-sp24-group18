const boldBtn = document.querySelector("#bold-btn") // old button element
const underlineBtn = document.querySelector("#underline-btn") // underline button element
const italicBtn = document.querySelector("#italic-btn") // italic button element
const colorBtn = document.querySelector("#color-btn") // color button element

const content = document.querySelector("#content") // content box element
const noteTitle = document.querySelector('.title') // note title element

boldBtn.addEventListener("click", () => {
    document.execCommand("bold")  // make the text bold on button click
})

underlineBtn.addEventListener("click", () => {
    document.execCommand("underline") // make the text underlined on button click
})

italicBtn.addEventListener("click", () => {
    document.execCommand("italic")  // make the text italic on button click
})

colorBtn.addEventListener("input", () => {
    document.execCommand("forecolor", false, colorBtn.value)  // change the text color on button click
})

/**
 * Sets the id of noteTitle element to the current date
 */
function setDate(){
  noteTitle.id = formatToday();
}

/**
 * Grabs the innerHTML content of the content box element
 * @param {string} date date to query
 * @returns innerHTML content of the content box
 */
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

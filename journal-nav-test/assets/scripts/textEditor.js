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

// Enable editing of the note title on click
noteTitle.addEventListener('click', () => {
  const input = document.createElement('input');  // create new input element
  input.type = 'text';  // set input element to text box
  input.value = noteTitle.textContent;  // set current input value to current note title
  input.className = 'title-input';  // set input element class name
  noteTitle.replaceWith(input); // replace noteTitle element with input element
  input.focus();  // focus on input element

  input.addEventListener('blur', () => {
      const newTitle = document.createElement('span');  // create new newTitle element
      newTitle.innerHTML = `<b>${input.value}</b>`; // set innerHTML content of newTitle to input value
      newTitle.className = 'title'; // set newTitle element class name
      input.replaceWith(newTitle);  // replace input element with newTitle element
      newTitle.addEventListener('click', () => {
          input.value = newTitle.textContent; // set current input value to newTitle value
          newTitle.replaceWith(input);  // replace newTitle with input element
          input.focus();  // focus on input element
      });
  });
});

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

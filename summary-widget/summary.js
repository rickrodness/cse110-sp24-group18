function toggleDropdown() { // Function to toggle the visibility of the dropdown content
  var dropdownContent = document.getElementById("dropdownContent");  // Get the dropdown content element by its ID
  if (dropdownContent.style.display === "block") {  // Check the current display style of the dropdown content
      dropdownContent.style.display = "none";  // If it's currently displayed, hide it
  } else {
      dropdownContent.style.display = "block"; // If it's currently hidden, show it
  }
}

function logDiary() { // Function to log the diary entries
  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']; // Array of days in a week
  var diaryEntries = [];  // Array to hold diary entries
  days.forEach(function(day) {  // Loop through each day
      var emotion = document.getElementById('emotion-' + day).value; // Get the value of the emotion input for the current day
      var sleep = document.getElementById('sleep-' + day).value;   // Get the value of the sleep input for the current day
      var lines = document.getElementById('lines-' + day).value;       // Get the value of the lines coded input for the current day
      diaryEntries.push({   // Push the diary entry for the current day into the array
          day: day.charAt(0).toUpperCase() + day.slice(1),
          emotion: emotion,
          sleep: sleep,
          lines: lines
      });
  });
  console.log(diaryEntries); // Log the diary entries array to the console
}

document.querySelectorAll('.day-entry input').forEach(input => { // Add an event listener to each input element within the day-entry class
  input.addEventListener('change', logDiary); // This will call logDiary function whenever the input value changes
});

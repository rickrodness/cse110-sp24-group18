function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
  } else {
      dropdownContent.style.display = "block";
  }
}

function logDiary() {
  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var diaryEntries = [];
  days.forEach(function(day) {
      var emotion = document.getElementById('emotion-' + day).value;
      var sleep = document.getElementById('sleep-' + day).value;
      var lines = document.getElementById('lines-' + day).value;
      diaryEntries.push({
          day: day.charAt(0).toUpperCase() + day.slice(1),
          emotion: emotion,
          sleep: sleep,
          lines: lines
      });
  });
  console.log(diaryEntries);
}

document.querySelectorAll('.day-entry input').forEach(input => {
  input.addEventListener('change', logDiary);
});

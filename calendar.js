
window.addEventListener('DOMContentLoaded', init);

function init() {
  const monthSelect = document.getElementById('Month');
  const daySelect = document.getElementById('Day');
  const yearSelect = document.getElementById('Year');
  const selectDateButton = document.querySelector('button');
  const output = document.getElementById('output');

  // Event listener for month selection
  monthSelect.addEventListener('change', function() {
    const selectedMonth = monthSelect.value;
    return selectedMonth; 
  });

   // Event listener for day selection
  daySelect.addEventListener('change', function() {
    const selectedDay = daySelect.value;
    return selectedDay;
  });

    // Event listener for day selection
  daySelect.addEventListener('change', function() {
    const selectedYear = yearSelect.value;
    return selectedYear;
  });

  // Event listener for select date button
  selectDateButton.addEventListener('click', function() {
    const selectedMonth = monthSelect.value;
    const selectedDay = daySelect.value;
    const selectedYear = yearSelect.value;
    output.textContent = "Selected Date: " + selectedMonth + " " + selectedDay + ", " + selectedYear;
  });
}

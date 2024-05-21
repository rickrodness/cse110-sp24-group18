window.addEventListener('DOMContentLoaded', init);

function init() {
    const monthSelect = document.getElementById('Month');
    const yearSelect = document.getElementById('Year');
    const output = document.getElementById('output');

    // Event listener for month selection
    monthSelect.addEventListener('change', updateOutput);
    
    // Event listener for year selection
    yearSelect.addEventListener('change', updateOutput);

    function updateOutput() {
        const selectedMonth = monthSelect.value;
        const selectedYear = yearSelect.value;
        output.textContent = "Selected Date: " + selectedMonth + ", " + selectedYear;
    }
}

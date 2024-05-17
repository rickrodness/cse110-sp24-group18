const slider = document.getElementById("myRange");
const output = document.getElementById("value");
const labels = ["<3 Hours", "3-4 Hours", "5 Hours", "6-7 Hours", "7-9 Hours"];

document.addEventListener('DOMContentLoaded', function() {
  function updateSliderFill(value) {
      const percentage = (value - slider.min) / (slider.max - slider.min) * 100;
      slider.style.setProperty('--slider-value', `${percentage}%`);
  }
  output.innerHTML = labels[slider.value - 1];
  updateSliderFill(slider.value);

  slider.oninput = function() {
      output.innerHTML = labels[this.value - 1];
      updateSliderFill(this.value);
  };
});

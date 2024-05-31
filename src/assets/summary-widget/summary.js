document.addEventListener('DOMContentLoaded', (event) => { // Event listener for when the DOM content is fully loaded
    document.querySelector('.dropbtn').addEventListener('click', function() { // Add a click event listener to the dropdown button
        document.querySelector('.dropdown-content').classList.toggle('show'); // Toggle the 'show' class on the dropdown content when the button is clicked
    });

    window.onclick = function(event) {     // Close the dropdown if the user clicks outside of it
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content"); // Loop through all dropdown contents and remove the 'show' class if it's present
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    function setBarGradient(bar) {    // Function to set the gradient background of a bar based on its height percentage
      const heightPercentage = parseInt(bar.style.height);
      let color;

      if (heightPercentage < 40) {    // Set the color gradient based on the height percentage
        color = 'linear-gradient(to top, #ff4c4c, #ff6666)'; // Red shades for lower percentages
      } else if (heightPercentage < 70) {
        color = 'linear-gradient(to top, #ffcc00, #ffdd66)'; // Yellow shades for medium percentages
      } else {
        color = 'linear-gradient(to top, #4caf50, #66bb6a)'; // Green shades for higher percentages
      }

      bar.style.backgroundImage = color;  // Apply the color gradient to the bar
    }

    // Apply the gradient to all bars
    document.querySelectorAll('.bar').forEach(bar => {
      setBarGradient(bar);
    });
  });

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.dropbtn').addEventListener('click', function() {
        document.querySelector('.dropdown-content').classList.toggle('show');
    });

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    function setBarGradient(bar) {
      const heightPercentage = parseInt(bar.style.height);
      let color;

      if (heightPercentage < 40) {
        color = 'linear-gradient(to top, #ff4c4c, #ff6666)'; // Red shades for lower percentages
      } else if (heightPercentage < 70) {
        color = 'linear-gradient(to top, #ffcc00, #ffdd66)'; // Yellow shades for medium percentages
      } else {
        color = 'linear-gradient(to top, #4caf50, #66bb6a)'; // Green shades for higher percentages
      }

      bar.style.backgroundImage = color;
    }

    // Apply the gradient to all bars
    document.querySelectorAll('.bar').forEach(bar => {
      setBarGradient(bar);
    });
  });

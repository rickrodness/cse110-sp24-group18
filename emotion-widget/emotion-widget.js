/*document.getElementById('emotionSlider').addEventListener('input', function() {

  const arrowContainer = document.getElementById('arrowContainer');
  const faceImg = document.getElementById('face');
  const emotionText = document.getElementById('emotionText');

  // Convert the value of the input (this.value) to an integer
  const value = parseInt(this.value);

  switch(value){
    case 1:
      arrowContainer.style.left = '19%';
      faceImg.src="media/faceMiserable.png";
      emotionText.textContent = 'Miserable';
      break;
    case 2:
      arrowContainer.style.left = '35%';
      faceImg.src="media/faceSad.png";
      emotionText.textContent = 'Sad';
      break;
    case 3:
      arrowContainer.style.left = '51.5%';
      faceImg.src="media/faceMeh.png";
      emotionText.textContent = 'Meh';
      break;
    case 4:
      arrowContainer.style.left = '68%';
      faceImg.src="media/faceGood.png";
      emotionText.textContent = 'Happy';
      break;
    case 5:
      arrowContainer.style.left = '84%';
      faceImg.src="media/faceAmazing.png";
      emotionText.textContent = 'Amazing';
      break;
    default:
      arrowContainer.style.left = '51.5%';
      faceImg.src="media/faceMeh.png";
      emotionText.textContent = 'Meh';
  }

});*/

const gauge = document.getElementById('gauge');
/*const gaugeValue = document.getElementById('score');*/

gauge.addEventListener('mousemove', (event) => {
  
    const faceImg = document.getElementById('face');
    const emotionText = document.getElementById('emotionText');
    const needle = document.getElementById('needle');

    const rect = gauge.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    // Calculate the angle from the center to the mouse position
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    // Only consider angles between 0 and 180 degrees
    if (angle >= 180 && angle <= 360) {
        let speed = (angle / 180) * 100;
        /*gaugeValue.textContent = `${Math.round(speed) - 100}`;*/

      if(speed >= 100 && speed < 120){
        faceImg.src="media/faceMiserable.png";
        emotionText.textContent = 'Miserable';
        needle.style =`--score:20`;
        gauge.style='background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,#9DABF4 36deg,var(--c2) 0 72deg,var(--c3) 0 108deg,var(--c4) 0 144deg,var(--c5) 0 180deg,#0000 0);';
      }
      else if(speed >= 120 && speed < 140){
        faceImg.src="media/faceSad.png";
        emotionText.textContent = 'Sad';
        needle.style =`--score:35`;
        gauge.style='background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,#E3985C 0 72deg,var(--c3) 0 108deg,var(--c4) 0 144deg,var(--c5) 0 180deg,#0000 0);';
      }
      else if(speed >= 140 && speed < 160){
        faceImg.src="media/faceMeh.png";
        emotionText.textContent = 'Meh';
        needle.style =`--score:50`;
        gauge.style='background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,var(--c2) 0 72deg,#D9BCB0 0 108deg,var(--c4) 0 144deg,var(--c5) 0 180deg,#0000 0);';
      }
      else if(speed >= 160 && speed < 180){
        faceImg.src="media/faceGood.png";
        emotionText.textContent = 'Happy';
        needle.style =`--score:65`;
        gauge.style='background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,var(--c2) 0 72deg,var(--c3) 0 108deg,#F4D39A 0 144deg,var(--c5) 0 180deg,#0000 0);';
      }
      else if(speed >= 180 && speed <= 200){
        faceImg.src="media/faceAmazing.png";
        emotionText.textContent = 'Amazing';
        needle.style =`--score:80`;
        gauge.style='background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,var(--c2) 0 72deg,var(--c3) 0 108deg,var(--c4) 0 144deg,#BED68B 0 180deg,#0000 0);';
      }

    } 
});
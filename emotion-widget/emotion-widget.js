document.getElementById('emotionSlider').addEventListener('input', function() {

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

});
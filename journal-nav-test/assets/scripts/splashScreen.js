function attatchSplashListener() {
  const splashScreen = document.getElementById('splash-container');
  splashScreen.addEventListener('click', function(event) {
      splashScreen.classList.add('slide-up');
  })
}
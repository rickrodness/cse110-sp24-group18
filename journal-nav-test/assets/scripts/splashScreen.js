function attatchSplashListener() {
  const splashScreen = document.getElementById('splash-container');
  splashScreen.addEventListener('click', function(event) {
    console.log('TRANSITIONING');
      splashScreen.classList.add('slide-up');
  })
}
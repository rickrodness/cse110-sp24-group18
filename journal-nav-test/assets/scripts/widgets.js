function widgetButtonListeners() {
  const widgetContainer = document.getElementById('widget-buttons');
  const widgetButtons = widgetContainer.getElementsByClassName('widget-btn');
  const widgetPopoutContainer = document.getElementById('widget-popouts');
  const widgetPopouts = widgetPopoutContainer.getElementsByClassName('widget');

  for (let i = 0; i < widgetButtons.length; i++) {
      const button = widgetButtons[i];
      const widgetType = button.id;
      let queryId = '';
      switch (widgetType) {
      case 'sleep-toggle-btn':
          queryId = 'sleep-widget-container';
          break;
      case 'mood-toggle-btn':
          queryId = 'mood-widget-container';
          break;
      default:
          break;
      }
      const assocWidget = document.getElementById(queryId);
      button.addEventListener('click', function(event) {
        if (assocWidget.style.zIndex == 1) {
          button.style.filter = 'brightness(1)';
          assocWidget.style.zIndex = -1;
          return;
        }
        for (let j = 0; j < widgetPopouts.length; j++) {
            widgetPopouts[j].style.zIndex = -1;
            widgetButtons[j].style.filter = 'brightness(1)';
        }
        assocWidget.style.zIndex = 1;
        button.style.filter = 'brightness(0.9)';
      });
  }
}
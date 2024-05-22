function widgetButtonListeners() {
  const widgetButtons = document.querySelectorAll(".widget-btn");

  console.log(widgetButtons)

  widgetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetWidget = document.getElementById(btn.dataset.target);

      if(targetWidget){
        targetWidget.style.display = (targetWidget.style.display == "flex") ? "none":"flex";
      }
    });
  });
}
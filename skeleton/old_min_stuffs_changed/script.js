window.addEventListener('DOMContentLoaded', init);

function initWidgetButtons(){
    const widgetButtons = document.querySelectorAll(".widgetButton");
    console.log(widgetButtons);

    widgetButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetWidget = document.getElementById(btn.dataset.target);

            if(targetWidget){
                // targetWidget.style.right = "40px"; // old way
                targetWidget.style.display = "flex";

                const closeButton = targetWidget.querySelector(".confirm-button");
                closeButton.addEventListener("click", () => {
                    targetWidget.style.display = "none";
                    // Insert how to save it to database here
                });
            }
        });
    });
}

function init() {
    initWidgetButtons();
}
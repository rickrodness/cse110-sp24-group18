window.addEventListener('DOMContentLoaded', init);

function initWidgetButtons(){
    const widgetButtons = document.querySelectorAll(".widgetButton");
    console.log(widgetButtons);

    widgetButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetWidget = document.getElementById(btn.dataset.target);

            if(targetWidget){
                targetWidget.style.right = "0";

                const closeButton = targetWidget.querySelector(".closeWidgetButton");
                closeButton.addEventListener("click", () => {
                    targetWidget.style.right = "-1000px";

                    // setTimeout(() => {
                    //     targetWidget.remove();
                    // }, 300);
                });
            }
        });
    });
}

function init() {
    initWidgetButtons();
}
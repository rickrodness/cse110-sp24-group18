// Function to create sliding containers
function createSlidingContainers() {
    const slideBtns = document.querySelectorAll('.slideBtn');

    slideBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const container = document.createElement('div');
            container.classList.add('slidingContainer');
            container.style.left = '0';
            container.innerHTML = `
                <div class="content">
                    <p>This is some text inside sliding container ${index + 1}.</p>
                    <button class="closeBtn">Close</button>
                </div>
            `;
            document.body.appendChild(container);

            const closeBtn = container.querySelector('.closeBtn');
            closeBtn.addEventListener('click', () => {
                container.style.left = '-300px';
                setTimeout(() => {
                    container.remove();
                }, 300); // Remove the container after the transition
            });
        });
    });
}

// Call the function to create sliding containers
createSlidingContainers();

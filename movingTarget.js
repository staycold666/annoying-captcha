function initializeMovingTarget() {
    const target = document.getElementById('moving-target');
    const container = document.querySelector('.captcha-container');
    let isClicked = false;

    function moveTarget() {
        if (!isClicked) {
            const maxX = container.clientWidth - target.clientWidth;
            const maxY = container.clientHeight - target.clientHeight;
            
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;
            
            target.style.transform = `translate(${newX}px, ${newY}px)`;
        }
    }

    target.addEventListener('mouseover', () => {
        if (!isClicked && Math.random() < 0.8) {
            moveTarget();
        }
    });

    target.addEventListener('click', () => {
        isClicked = true;
        target.style.background = '#4ecdc4';
        target.textContent = '✓ Clicked!';
        setTimeout(() => {
            isClicked = false;
            target.style.background = '#ff6b6b';
            target.textContent = 'Click Me!';
            moveTarget();
        }, 1000);
    });

    setInterval(moveTarget, 2000);
    moveTarget();
}

function initializeMovingTarget() {
    const targets = [
        document.getElementById('moving-target'),
        document.getElementById('moving-target2'),
        document.getElementById('moving-target3')
    ];
    const container = document.querySelector('.captcha-container');
    const beepSound = document.getElementById('beepSound');
    let clickedTargets = new Set();

    function moveTarget(target, others) {
        if (!clickedTargets.has(target)) {
            const maxX = container.clientWidth - target.clientWidth;
            const maxY = container.clientHeight - target.clientHeight;
            
            // Calculate position away from other targets
            let newX, newY;
            do {
                newX = Math.random() * maxX;
                newY = Math.random() * maxY;
            } while (others.some(other => 
                Math.abs(newX - parseInt(other.style.transform.split('translate(')[1])) < 50 &&
                Math.abs(newY - parseInt(other.style.transform.split(',')[1])) < 50
            ));
            
            target.style.transform = `translate(${newX}px, ${newY}px) rotate(${Math.random() * 360}deg)`;
        }
    }

    function moveAllTargets() {
        targets.forEach(target => {
            if (!clickedTargets.has(target)) {
                moveTarget(target, targets.filter(t => t !== target));
            }
        });
    }

    targets.forEach(target => {
        target.addEventListener('mouseover', () => {
            if (!clickedTargets.has(target) && Math.random() < 0.9) {
                moveTarget(target, targets.filter(t => t !== target));
                beepSound.currentTime = 0;
                beepSound.play().catch(() => {}); // Ignore errors if audio can't play
            }
        });

        target.addEventListener('click', () => {
            clickedTargets.add(target);
            target.style.background = '#4ecdc4';
            target.textContent = '✓ Got Me!';
            
            // Reset after random delay
            setTimeout(() => {
                clickedTargets.delete(target);
                target.style.background = '#ff6b6b';
                target.textContent = 'Click Me!';
                moveTarget(target, targets.filter(t => t !== target));
            }, Math.random() * 2000 + 1000);
        });
    });

    // Initial positioning
    moveAllTargets();

    // Continuous movement
    setInterval(moveAllTargets, 2000);

    // Add occasional random jumps
    setInterval(() => {
        const target = targets[Math.floor(Math.random() * targets.length)];
        if (!clickedTargets.has(target)) {
            moveTarget(target, targets.filter(t => t !== target));
        }
    }, 1000);

    // Add target interaction
    setInterval(() => {
        targets.forEach(target => {
            if (!clickedTargets.has(target)) {
                const rotation = Math.random() * 360;
                const scale = 0.8 + Math.random() * 0.4;
                const currentTransform = target.style.transform;
                target.style.transform = `${currentTransform.split(') ')[0]}) rotate(${rotation}deg) scale(${scale})`;
            }
        });
    }, 500);
}

function initializeDistractions() {
    const container = document.querySelector('.captcha-container');
    const emojis = document.querySelectorAll('.floating-emoji');
    
    // Randomize initial positions and animations for existing emojis
    emojis.forEach(emoji => {
        randomizePosition(emoji);
        setInterval(() => randomizePosition(emoji), Math.random() * 3000 + 2000);
    });

    // Create additional random floating elements
    for (let i = 0; i < 10; i++) {
        createFloatingElement();
    }

    function randomizePosition(element) {
        const maxX = container.clientWidth - 40;
        const maxY = container.clientHeight - 40;
        
        element.style.transform = `translate(${Math.random() * maxX}px, ${Math.random() * maxY}px) rotate(${Math.random() * 360}deg)`;
    }

    function createFloatingElement() {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.pointerEvents = 'none';
        element.style.fontSize = `${Math.random() * 20 + 10}px`;
        element.style.opacity = '0.7';
        element.style.transition = 'all 1s ease-in-out';
        
        // Random shapes or characters
        const shapes = ['★', '●', '■', '▲', '♦', '♠', '♣', '♥', '⚡', '✦'];
        element.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        
        container.appendChild(element);
        randomizePosition(element);
        
        // Continuously move the element
        setInterval(() => {
            randomizePosition(element);
            element.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        }, Math.random() * 3000 + 2000);
    }

    // Add cursor trail effect
    let trail = [];
    container.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.left = e.pageX + 'px';
        dot.style.top = e.pageY + 'px';
        dot.style.position = 'fixed';
        dot.style.width = '5px';
        dot.style.height = '5px';
        dot.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        document.body.appendChild(dot);
        
        trail.push(dot);
        
        if (trail.length > 20) {
            document.body.removeChild(trail.shift());
        }
        
        setTimeout(() => {
            if (document.body.contains(dot)) {
                document.body.removeChild(dot);
                trail = trail.filter(d => d !== dot);
            }
        }, 1000);
    });
}

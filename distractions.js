function initializeDistractions() {
    const container = document.querySelector('.captcha-container');
    const emojis = document.querySelectorAll('.floating-emoji');
    const beepSound = document.getElementById('beepSound');
    
    // Initialize floating emojis
    emojis.forEach(emoji => {
        randomizePosition(emoji);
        setInterval(() => randomizePosition(emoji), Math.random() * 3000 + 2000);
    });

    // Create additional random floating elements
    for (let i = 0; i < 20; i++) {
        createFloatingElement();
    }

    function randomizePosition(element) {
        const maxX = container.clientWidth - 40;
        const maxY = container.clientHeight - 40;
        const rotation = Math.random() * 720 - 360;
        const scale = 0.5 + Math.random() * 1.5;
        
        element.style.transform = `
            translate(${Math.random() * maxX}px, ${Math.random() * maxY}px)
            rotate(${rotation}deg)
            scale(${scale})
        `;
    }

    function createFloatingElement() {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.pointerEvents = 'none';
        element.style.fontSize = `${Math.random() * 20 + 10}px`;
        element.style.opacity = '0.7';
        element.style.transition = 'all 0.5s ease-in-out';
        element.style.zIndex = '1000';
        
        // Random shapes and characters
        const shapes = ['★', '●', '■', '▲', '♦', '♠', '♣', '♥', '⚡', '✦', '☢', '☠', '⚔', '⚙', '⚛'];
        element.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        
        container.appendChild(element);
        randomizePosition(element);
        
        // Continuously move and transform the element
        setInterval(() => {
            randomizePosition(element);
            element.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        }, Math.random() * 3000 + 2000);
    }

    // Enhanced cursor trail effect
    let trail = [];
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create multiple trail elements
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            dot.style.width = (5 + i * 2) + 'px';
            dot.style.height = (5 + i * 2) + 'px';
            dot.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
            dot.style.borderRadius = '50%';
            dot.style.filter = 'blur(1px)';
            container.appendChild(dot);
            
            trail.push(dot);
        }
        
        // Limit trail length
        while (trail.length > 50) {
            if (trail[0].parentNode) {
                trail[0].parentNode.removeChild(trail[0]);
            }
            trail.shift();
        }
    });

    // Screen flash effects
    function createFlashEffect() {
        if (Math.random() < 0.3) { // 30% chance
            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.backgroundColor = `hsla(${Math.random() * 360}, 70%, 50%, 0.2)`;
            flash.style.pointerEvents = 'none';
            flash.style.zIndex = '9999';
            flash.style.mixBlendMode = 'overlay';
            document.body.appendChild(flash);

            setTimeout(() => {
                document.body.removeChild(flash);
            }, 100);
        }
    }

    // Random screen shakes
    function screenShake() {
        if (Math.random() < 0.2) { // 20% chance
            container.style.transform = `
                translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)
                rotate(${Math.random() * 2 - 1}deg)
            `;
            
            setTimeout(() => {
                container.style.transform = 'none';
            }, 100);
        }
    }

    // Create visual noise
    function createNoise() {
        const noise = document.createElement('canvas');
        noise.style.position = 'fixed';
        noise.style.top = '0';
        noise.style.left = '0';
        noise.style.width = '100%';
        noise.style.height = '100%';
        noise.style.pointerEvents = 'none';
        noise.style.opacity = '0.05';
        noise.style.zIndex = '9998';
        document.body.appendChild(noise);

        const ctx = noise.getContext('2d');
        function updateNoise() {
            const w = noise.width = window.innerWidth;
            const h = noise.height = window.innerHeight;
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            for (let i = 0; i < buffer32.length;) {
                buffer32[i++] = ((Math.random() * 255) | 0) << 24;
            }
            ctx.putImageData(idata, 0, 0);
        }
        
        setInterval(updateNoise, 50);
    }

    // Initialize effects
    createNoise();
    setInterval(createFlashEffect, 2000);
    setInterval(screenShake, 1000);

    // Random beep sounds
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance
            beepSound.currentTime = 0;
            beepSound.play().catch(() => {}); // Ignore errors if audio can't play
        }
    }, 1000);
}

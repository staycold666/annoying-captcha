let progress = 0;

function startProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    let glitchInterval;
    
    function updateProgress() {
        // 40% chance to decrease progress
        if (Math.random() < 0.4) {
            // More aggressive decrease
            progress = Math.max(0, progress - Math.random() * 30);
        } else {
            // Smaller increases
            progress = Math.min(100, progress + Math.random() * 5);
        }
        
        // Add visual glitch effect
        if (Math.random() < 0.2) { // 20% chance
            clearInterval(glitchInterval);
            glitchInterval = setInterval(() => {
                progressBar.style.background = `linear-gradient(90deg, 
                    #4ecdc4 0%, 
                    #4ecdc4 ${progress}%, 
                    #eee ${progress}%, 
                    #eee ${progress + Math.random() * 10}%,
                    #4ecdc4 ${progress + Math.random() * 20}%,
                    #eee 100%)`;
            }, 50);
            
            setTimeout(() => {
                clearInterval(glitchInterval);
            }, 200);
        } else {
            progressBar.style.background = `linear-gradient(90deg, 
                #4ecdc4 0%, 
                #4ecdc4 ${progress}%, 
                #eee ${progress}%, 
                #eee 100%)`;
        }

        // Add random color flashes
        if (Math.random() < 0.1) { // 10% chance
            progressBar.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.5)`;
            setTimeout(() => {
                progressBar.style.filter = 'none';
            }, 100);
        }

        // Random bar jumping
        if (Math.random() < 0.15) { // 15% chance
            const jumpProgress = progress;
            progress = Math.random() * 100;
            setTimeout(() => {
                progress = jumpProgress;
            }, 200);
        }

        // Add occasional reverse animation
        if (Math.random() < 0.1) { // 10% chance
            progressBar.style.transform = 'scaleX(-1)';
            setTimeout(() => {
                progressBar.style.transform = 'scaleX(1)';
            }, 500);
        }
            
        if (progress < 100) {
            // Variable update speed
            setTimeout(updateProgress, Math.random() * 1000 + 200);
        }
    }
    
    // Start progress updates
    updateProgress();

    // Add periodic progress resets
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance
            progress = 0;
            progressBar.style.transition = 'all 0.3s';
            setTimeout(() => {
                progressBar.style.transition = 'none';
            }, 300);
        }
    }, 3000);

    // Add glitch text above progress bar
    const glitchText = document.createElement('div');
    glitchText.style.position = 'absolute';
    glitchText.style.top = '-20px';
    glitchText.style.width = '100%';
    glitchText.style.textAlign = 'center';
    glitchText.style.fontSize = '12px';
    glitchText.style.fontFamily = 'monospace';
    progressBar.parentElement.appendChild(glitchText);

    // Update glitch text
    setInterval(() => {
        const messages = [
            'Validating...',
            'Processing...',
            'Recalculating...',
            'Error...',
            'Retrying...',
            'Loading...',
            'Please wait...',
            'System busy...'
        ];
        glitchText.textContent = messages[Math.floor(Math.random() * messages.length)];
        glitchText.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }, 500);
}

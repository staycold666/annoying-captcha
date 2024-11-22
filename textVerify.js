function initializeTextVerify() {
    const verifyText = document.getElementById('verify-text');
    const textAnswer = document.getElementById('text-answer');
    let currentText = '';

    function generateText() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        const specialChars = '!@#$%^&*';
        currentText = '';
        verifyText.innerHTML = '';

        // Generate longer text with special characters
        const textLength = Math.floor(Math.random() * 4) + 8; // 8-12 characters
        for (let i = 0; i < textLength; i++) {
            const span = document.createElement('span');
            // 30% chance for special character
            const char = Math.random() < 0.3 ? 
                specialChars[Math.floor(Math.random() * specialChars.length)] :
                chars[Math.floor(Math.random() * chars.length)];
            
            currentText += char;
            span.textContent = char;
            
            // Apply random individual transformations
            span.style.display = 'inline-block';
            span.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
            span.classList.add('shake');
            
            // Add unique animation to each character
            span.style.animation = `
                ultraShake ${0.1 + Math.random() * 0.3}s infinite,
                colorChange ${0.5 + Math.random() * 1}s infinite
            `;
            
            // Random initial transform
            span.style.transform = `
                rotate(${Math.random() * 40 - 20}deg)
                scale(${0.8 + Math.random() * 0.4})
                skew(${Math.random() * 20 - 10}deg)
            `;

            verifyText.appendChild(span);
        }

        // Randomly reverse the text
        if (Math.random() < 0.3) {
            verifyText.style.transform = 'scaleX(-1)';
        } else {
            verifyText.style.transform = 'scaleX(1)';
        }

        // Add dynamic character updates
        const spans = verifyText.children;
        setInterval(() => {
            Array.from(spans).forEach(span => {
                // Randomly change color
                span.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
                
                // Randomly update transform
                span.style.transform = `
                    rotate(${Math.random() * 40 - 20}deg)
                    scale(${0.8 + Math.random() * 0.4})
                    skew(${Math.random() * 20 - 10}deg)
                `;
                
                // 5% chance to briefly hide character
                if (Math.random() < 0.05) {
                    span.style.opacity = '0';
                    setTimeout(() => {
                        span.style.opacity = '1';
                    }, 100);
                }
            });
        }, 100);
    }

    textAnswer.addEventListener('input', (e) => {
        // Case-sensitive verification
        if (e.target.value === currentText) {
            // Flash effect on success
            verifyText.style.transform = 'scale(1.2)';
            verifyText.style.filter = 'brightness(1.5)';
            
            setTimeout(() => {
                verifyText.style.transform = 'scale(1)';
                verifyText.style.filter = 'none';
                e.target.value = '';
                generateText();
            }, 300);
        }
    });

    // Randomly clear input
    setInterval(() => {
        if (Math.random() < 0.15) { // 15% chance
            textAnswer.value = '';
        }
    }, 2000);

    // Randomly swap characters positions
    setInterval(() => {
        const spans = Array.from(verifyText.children);
        if (spans.length > 1 && Math.random() < 0.3) { // 30% chance
            const idx1 = Math.floor(Math.random() * spans.length);
            const idx2 = Math.floor(Math.random() * spans.length);
            const temp = spans[idx1].textContent;
            spans[idx1].textContent = spans[idx2].textContent;
            spans[idx2].textContent = temp;
        }
    }, 1000);

    generateText();
    
    // Generate new text periodically
    setInterval(generateText, 8000);
}

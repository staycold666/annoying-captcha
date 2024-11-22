function initializeTextVerify() {
    const verifyText = document.getElementById('verify-text');
    const textAnswer = document.getElementById('text-answer');
    let currentText = '';

    function generateText() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        currentText = '';
        verifyText.innerHTML = '';

        for (let i = 0; i < 6; i++) {
            const span = document.createElement('span');
            const char = chars[Math.floor(Math.random() * chars.length)];
            currentText += char;
            span.textContent = char;
            span.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
            span.classList.add('shake');
            verifyText.appendChild(span);
        }

        // Randomly change colors of characters
        setInterval(() => {
            Array.from(verifyText.children).forEach(span => {
                span.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
            });
        }, 500);
    }

    textAnswer.addEventListener('input', (e) => {
        if (e.target.value.toLowerCase() === currentText.toLowerCase()) {
            setTimeout(generateText, 500);
            e.target.value = '';
        }
    });

    generateText();
    setInterval(generateText, 8000);
}

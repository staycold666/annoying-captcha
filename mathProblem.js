function initializeMathProblem() {
    const mathText = document.getElementById('math-text');
    const mathAnswer = document.getElementById('math-answer');
    let currentAnswer = 0;
    let problemTimeout;

    function generateProblem() {
        const operators = ['+', '-', '*', '/', '^'];
        const complexOperations = [
            // Basic arithmetic
            () => {
                const num1 = Math.floor(Math.random() * 50) + 1;
                const num2 = Math.floor(Math.random() * 30) + 1;
                const num3 = Math.floor(Math.random() * 20) + 1;
                const op1 = operators[Math.floor(Math.random() * 3)];
                const op2 = operators[Math.floor(Math.random() * 3)];
                currentAnswer = eval(`${num1}${op1}${num2}${op2}${num3}`);
                return `${num1} ${op1} ${num2} ${op2} ${num3}`;
            },
            // Square roots
            () => {
                const num = Math.floor(Math.random() * 100) + 1;
                currentAnswer = Math.sqrt(num);
                return `√${num}`;
            },
            // Powers
            () => {
                const base = Math.floor(Math.random() * 10) + 1;
                const power = Math.floor(Math.random() * 3) + 2;
                currentAnswer = Math.pow(base, power);
                return `${base}^${power}`;
            },
            // Percentage
            () => {
                const num = Math.floor(Math.random() * 200) + 1;
                const percentage = Math.floor(Math.random() * 100) + 1;
                currentAnswer = (num * percentage) / 100;
                return `${percentage}% of ${num}`;
            }
        ];

        // Clear any existing timeout
        if (problemTimeout) {
            clearTimeout(problemTimeout);
        }

        // Generate new problem
        const operation = complexOperations[Math.floor(Math.random() * complexOperations.length)];
        const problem = operation();
        mathText.textContent = `${problem} = ?`;
        mathAnswer.value = '';
        
        // Make problem disappear after random short time
        problemTimeout = setTimeout(() => {
            mathText.textContent = '???';
            // Generate new problem after brief delay
            setTimeout(generateProblem, Math.random() * 1000 + 500);
        }, Math.random() * 1500 + 800);

        // Add visual effects
        mathText.style.transform = `scale(${0.8 + Math.random() * 0.4}) rotate(${Math.random() * 10 - 5}deg)`;
        mathText.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }

    mathAnswer.addEventListener('input', (e) => {
        const userAnswer = parseFloat(e.target.value);
        if (Math.abs(userAnswer - currentAnswer) < 0.1) { // Allow small floating point differences
            // Flash the background
            mathText.style.background = '#4ecdc4';
            setTimeout(() => {
                mathText.style.background = 'transparent';
                generateProblem();
            }, 200);
        }
    });

    // Start generating problems
    generateProblem();

    // Occasionally clear the input to frustrate users
    setInterval(() => {
        if (Math.random() < 0.2) { // 20% chance
            mathAnswer.value = '';
        }
    }, 3000);

    // Add random rotation to the math problem container
    setInterval(() => {
        const container = document.querySelector('.math-problem');
        container.style.transform = `rotate(${Math.random() * 4 - 2}deg)`;
    }, 500);
}

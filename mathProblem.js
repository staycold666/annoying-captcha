function initializeMathProblem() {
    const mathText = document.getElementById('math-text');
    const mathAnswer = document.getElementById('math-answer');
    let currentAnswer = 0;

    function generateProblem() {
        const operators = ['+', '-', '*'];
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const operator = operators[Math.floor(Math.random() * operators.length)];

        switch(operator) {
            case '+':
                currentAnswer = num1 + num2;
                break;
            case '-':
                currentAnswer = num1 - num2;
                break;
            case '*':
                currentAnswer = num1 * num2;
                break;
        }

        mathText.textContent = `${num1} ${operator} ${num2} = ?`;
        mathAnswer.value = '';
        
        // Make the problem disappear after random time
        setTimeout(() => {
            mathText.textContent = '???';
        }, Math.random() * 2000 + 1000);
    }

    mathAnswer.addEventListener('input', (e) => {
        if (parseInt(e.target.value) === currentAnswer) {
            setTimeout(generateProblem, 500);
        }
    });

    generateProblem();
    setInterval(generateProblem, 5000);
}

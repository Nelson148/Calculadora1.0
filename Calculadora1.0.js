const display = document.querySelector('.conta');
const buttons = document.querySelectorAll('button');

let currentOperand = '';
let previousOperand = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText >= '0' && buttonText <= '9' || buttonText === '.') {
            currentOperand += buttonText;
            display.textContent = currentOperand;
        }

        if (buttonText === '+' || buttonText === '-' || buttonText === '/' || buttonText === 'x') {
            if (currentOperand !== '') {
                if (previousOperand) {
                    calculate();
                }
                operator = buttonText === 'x' ? '*' : buttonText;
                previousOperand = currentOperand;
                currentOperand = '';
            }
        }

        if (buttonText === '=') {
            if (currentOperand && previousOperand) {
                calculate();
            }
        }

        if (buttonText === 'C') {
            clear();
        }
    });
});

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr !== 0 ? prev / curr : 'Erro';
            break;
        default:
            return;
    }

    display.textContent = result;
    previousOperand = result;
    currentOperand = '';
    operator = '';
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operator = '';
    display.textContent = '0';
}

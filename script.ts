class Calculator {
    display: HTMLInputElement;
    currentOperand: string = '';
    previousOperand: string = '';
    operation: string | null = null;

    constructor(display: HTMLInputElement) {
        this.display = display;
    }

    appendNumber(number: string) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation: string) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation: number;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = null;
        this.previousOperand = '';
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.currentOperand;
    }
}

const display = document.getElementById('display') as HTMLInputElement;
const calculator = new Calculator(display);

document.querySelectorAll('.btn').forEach(button => {
    const value = button.getAttribute('data-value');
    button.addEventListener('click', () => {
        if (value === null) return;

        if (value === 'C') {
            calculator.clear();
        } else if (value === '=') {
            calculator.compute();
        } else if (['+', '-', '*', '/'].includes(value)) {
            calculator.chooseOperation(value);
        } else {
            calculator.appendNumber(value);
        }
    });
});

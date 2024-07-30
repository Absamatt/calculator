var Calculator = /** @class */ (function () {
    function Calculator(display) {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
        this.display = display;
    }
    Calculator.prototype.appendNumber = function (number) {
        if (number === '.' && this.currentOperand.includes('.'))
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    };
    Calculator.prototype.chooseOperation = function (operation) {
        if (this.currentOperand === '')
            return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };
    Calculator.prototype.compute = function () {
        var computation;
        var prev = parseFloat(this.previousOperand);
        var current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            return;
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
    };
    Calculator.prototype.clear = function () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
        this.updateDisplay();
    };
    Calculator.prototype.updateDisplay = function () {
        this.display.value = this.currentOperand;
    };
    return Calculator;
}());
var display = document.getElementById('display');
var calculator = new Calculator(display);
document.querySelectorAll('.btn').forEach(function (button) {
    var value = button.getAttribute('data-value');
    button.addEventListener('click', function () {
        if (value === null)
            return;
        if (value === 'C') {
            calculator.clear();
        }
        else if (value === '=') {
            calculator.compute();
        }
        else if (['+', '-', '*', '/'].includes(value)) {
            calculator.chooseOperation(value);
        }
        else {
            calculator.appendNumber(value);
        }
    });
});

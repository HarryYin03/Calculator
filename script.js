class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement; // Reference to the element that displays the previous operand
        this.currentOperandTextElement = currentOperandTextElement; // Reference to the element that displays the current operand
        this.clear(); // Call the clear method to initialize the calculator
    }
    clear(){
        this.currentOperand = ''; // Clear the current operand
        this.previousOperand = ''; // Clear the previous operand
        this.operation = undefined; // Clear the operation
    }
    delete(){

    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return; // Prevent adding multiple decimal points
        this.currentOperand = this.currentOperand.toString() + number.toString(); // Append the number to the current operand
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return; // If there is no current operand, return
        if(this.previousOperand !== ''){
            this.compute(); // If there is a previous operand, compute the result
        }
        this.operation = operation; // Set the operation
        this.previousOperand = this.currentOperand; // Set the previous operand to the current operand
        this.currentOperand = ''; // Clear the current operand
    }

    getDisplayNumber(number){
        const stringNumber = number.toString(); // Convert the number to a string
        const integerDigits = parseFloat(stringNumber.split('.')[0]); // Get the integer part of the number
        const decimalDigits = stringNumber.split('.')[1]; // Get the decimal part of the number
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = ''; // If the integer part is not a number, set the display to an empty string
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            }); // Format the integer part with commas
        }
        if(decimalDigits != null){
            return '${integerDisplay}.${decimalDigits}'; // Return the formatted number with decimal part
        }
        else{
            return integerDisplay; // Return the formatted number without decimal part
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText =
         this.getDisplayNumber(this.currentOperand); // Update the display of the current operand
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; // Update the display of the previous operand and operation
        }
        else{
            this.previousOperandTextElement.innerText = ''; // Clear the display of the previous operand
        }

    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand); // Convert the previous operand to a number
        const current = parseFloat(this.currentOperand); // Convert the current operand to a number
        if(isNaN(prev) || isNaN(current)) return; // If either operand is not a number, return
        switch(this.operation){
            case '+':
                computation = prev + current; // Perform addition
                break;
            case '-':
                computation = prev - current; // Perform subtraction
                break;
            case '*':
                computation = prev * current; // Perform multiplication
                break;
            case '÷':
                computation = prev / current; // Perform division
                break;
            default: 
                return;
        }
        this.currentOperand = computation; // Set the current operand to the computed result
        this.operation = undefined; // Clear the operation
        this.previousOperand = ''; // Set the previous operand to a smiley face
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1); // Delete the last character of the current operand
    }
}

const numberBtn = document.querySelectorAll('[data-number]') // Get all elements with the attribute 'data-number'
const operationBtn = document.querySelectorAll('[data-operation]'); // Get all elements with the attribute 'data-operation'
const equalBtn = document.querySelector('[data-equal]'); // Get the element with the attribute 'data-equal'
const clearBtn = document.querySelector('[data-all-clear]'); // Get the element with the attribute 'data-all-clear'
const previousOperandTextElement = document.querySelector('[data-previous-operand]'); // Get the element with the attribute 'data-previous-operand'
const currentOperandTextElement = document.querySelector('[data-current-operand]'); // Get the element with the attribute 'data-current-operand'
const deleteBtn = document.querySelector('[data-delete]'); // Get the element with the attribute 'data-delete'


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement); // Create a new instance of the Calculator class

numberBtn.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText); // Add an event listener to each number button to append the clicked number to the current operand
        calculator.updateDisplay(); // Update the display
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', function(){
        calculator.chooseOperation(button.innerText); // Add an event listener to each operation button to choose the clicked operation
        calculator.updateDisplay(); // Update the display
    })
})

equalBtn.addEventListener('click', button => {
    calculator.compute() // Perform the computation
    calculator.updateDisplay() // Update the display
})

clearBtn.addEventListener('click', button => {
    calculator.clear(); // Clear the calculator
    calculator.updateDisplay(); // Update the display
})

deleteBtn.addEventListener('click', button => {
    calculator.delete(); // Delete the last character of the current operand
    calculator.updateDisplay(); // Update the display
})

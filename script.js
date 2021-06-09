// jshint esversion:6
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second value depending on operator
const Calculate ={
    '/': (firstNumber , secondNumber) => firstNumber/ secondNumber,

    '*': (firstNumber , secondNumber) => firstNumber* secondNumber,

    '+': (firstNumber , secondNumber) => firstNumber+ secondNumber,

    '-': (firstNumber , secondNumber) => firstNumber- secondNumber,

    '=': (firstNumber , secondNumber) =>  secondNumber,
    
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
//    Replace current display value if firstVlaue entered
if (awaitingNextValue) {
calculatorDisplay .textContent =  number;
awaitingNextValue = false;
} else{
     // If current display value is 0, replace it if not add number
     const displayValue = calculatorDisplay.textContent;
     calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}
}

function addDecimal() {
    // if operator Peressed don't add decimal
    if(awaitingNextValue) return;
    // If no addDecimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number (calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = Calculate[operatorValue](firstValue , currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value store operator
    awaitingNextValue = true;
    operatorValue = operator;
}


// Reset all value,display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent= '0';
}

// Add EventListeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click',() => addDecimal());
    }
});
// Event Listener
clearBtn.addEventListener('click', resetAll);
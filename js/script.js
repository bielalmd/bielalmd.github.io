'use strict'

const display = document.getElementById('display');
const nums = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');

let newNumber = true;
let operator;
let previousNumber;

const operatorPending = () => operator !== undefined

const calculate = () => {
    if (operatorPending()) {
        const currentNumber = parseFloat(display.textContent.replace(',', '.'));
        newNumber = true;
        const res = eval (`${previousNumber}${operator}${currentNumber}`);
        updateDisplay(res);
    }
}

const updateDisplay = (text) => {
    if(newNumber){
        display.textContent = text.toLocaleString('BR');
        newNumber = false
    } else {
        display.textContent += text.toLocaleString('BR');
    }
}   

const insertNumber = (event) => updateDisplay(event.target.textContent);
nums.forEach (nums => nums.addEventListener('click', insertNumber));
const selectOperator = (event) => {
    if (!newNumber) {
        calculate();
        newNumber = true;
        operator = event.target.textContent;
        previousNumber = parseFloat(display.textContent.replace(',','.'));
    }
}
operators.forEach((operator) => operator.addEventListener('click', selectOperator));

const activateEqual = () => {
    calculate();
    operator = undefined
}
document.getElementById('igual').addEventListener('click', activateEqual);

const cleanDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', cleanDisplay);

const cleanCalculation = () => {
    cleanDisplay();
    operator = undefined;
    newNumber = true;
    previousNumber = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', cleanCalculation);

const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1)
document.getElementById('backspace').addEventListener('click', removeLastNumber)

const reverseSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', reverseSignal)

const existDecimal = () => display.textContent.indexOf(',') !== -1;
const existValue = () => display.textContent.length > 0;
const insertDecimal = () =>{
    if(!existDecimal()) {
        if(existValue()) {
            updateDisplay(',')
        } else {
            updateDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDecimal);

const mapKeyboard = {
    0: 'tecla0',
    1: 'tecla1',
    2: 'tecla2',
    3: 'tecla3',
    4: 'tecla4',
    5: 'tecla5',
    6: 'tecla6',
    7: 'tecla7',
    8: 'tecla8',
    9: 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'limparDisplay',
    Escape: 'limparCalculo',
    ',': 'decimal',
}

const mappingKeyboard = (event) => {
    const keyOn = event.key;
    const keyAllowed = () => Object.keys(mapKeyboard).indexOf(keyOn) !== -1
    if(keyAllowed()) document.getElementById(mapKeyboard[keyOn]).click();
}
document.addEventListener('keydown' , mappingKeyboard)
const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const display = document.getElementById('display');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

let clearDisplay = true;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
      break;

    case '-':
      return subtract(a, b);
      break;

    case 'x':
      return multiply(a, b);
      break;

    case '÷':
      return divide(a, b);
      break;
  }
}

let num1 = '';
let operator = '';
let num2 = '';

numBtns.forEach(num => {
  num.addEventListener('click', (e) => {
    if (clearDisplay) {
      display.textContent = '';
      clearDisplay = false;
    }
    display.textContent += num.textContent;
    if (operator) {
      num2 += e.target.textContent;
      display.textContent = num2;
    } else {
      num1 += e.target.textContent;
    };
  });
});

decimal.addEventListener('click', (e) => {
  decimal.disabled = true;
})

function getAnswer() {
  if (operator === '÷' && +num2 === 0) {
    display.textContent = "Not today, sucker!";
    num1 = '';
    operator = '';
    num2 = '';
    clearDisplay = true;
  } else {
    let answer = Math.round(operate(operator, +num1, +num2) * 10000) / 10000;
    display.textContent = answer;
    num1 = answer;
    operator = '';
    num2 = '';
    clearDisplay = true;
  }
}

operatorBtns.forEach(sign => {
  sign.addEventListener('click', (e) => {
    display.textContent = e.target.textContent;
    clearDisplay = true;
    if (num2) {
      getAnswer();
    }
    operator = e.target.textContent;
    decimal.disabled = false;
  })
});

equals.addEventListener('click', () => {
  if (!num1 && !operator && !num2) {
    num1 = 0;
    let answer = num1;
    display.textContent = answer;
    clearDisplay = true;
  } else if (!num1 && !num2) {
    num1 = 0;
    num2 = num1;
    getAnswer();
  } else if (!operator && !num2) {
    answer = num1;
    display.textContent = answer;
    clearDisplay = true;
  } else if (!num1) {
    num1 = 0;
    getAnswer();
  } else if (!num2) {
    num2 = num1;
    getAnswer();
  } else {
    getAnswer();
  }
  decimal.disabled = false;
})

function clearCalc() {
  display.textContent = 0;
  num1 = '';
  operator = '';
  num2 = '';
  decimal.disabled = false;
  clearDisplay = true;
}

clear.addEventListener('click', () => {
  clearCalc();
})
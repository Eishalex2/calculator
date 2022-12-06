const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const display = document.getElementById('display');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
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

function getAnswer() {
  let answer = Math.round(operate(operator, +num1, +num2) * 10000) / 10000;
  console.log(answer);
  display.textContent = answer;
  num1 = answer;
  operator = '';
  num2 = '';
  clearDisplay = true;
}

operatorBtns.forEach(sign => {
  sign.addEventListener('click', (e) => {
    display.textContent = e.target.textContent;
    clearDisplay = true;
    if (num2) {
      getAnswer();
    }
    operator = e.target.textContent;
  })
})

equals.addEventListener('click', () => {
  if (!num1) {
    let answer = 0;
    display.textContent = answer;
    clearDisplay = true;
  } else if (!operator) {
    answer = num1;
    display.textContent = answer;
    clearDisplay = true;
  } else if (!num2) {
    num2 = num1;
    getAnswer();
  } else {
    getAnswer();
  }
})
const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const display = document.getElementById('display');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const back = document.getElementById('back');

let clearDisplayFlag = false;
let lastEqualsFlag = false;

function clearDisplay() {
  display.textContent = '';
  clearDisplayFlag = false;
}

let num1 = '';
let operator = '';
let num2 = '';

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

//leaving the operate function
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

function inputNum(number) {
  if (clearDisplayFlag) {
    clearDisplay();
  };
  if (lastEqualsFlag) {
    num1 = '';
  }
  if (operator) {
    num2 += number;
    display.textContent = num2;
  } else {
    num1 += number;
    display.textContent = num1;
  };
}

numBtns.forEach(num => {
  num.addEventListener('click', (e) => {
    inputNum(e.target.textContent)
    lastEqualsFlag = false;
  });
});

decimal.addEventListener('click', () => {
  decimal.disabled = true;
  lastEqualsFlag = false;
});

function calculate() {
  if (operator === '÷' && +num2 === 0) {
    display.textContent = "Not today, sucker!";
    num1 = '';
    operator = '';
    num2 = '';
    clearDisplayFlag = true;
  } else {
    let answer = Math.round(operate(operator, +num1, +num2) * 10000) / 10000;
    display.textContent = answer;
    num1 = answer;
    operator = '';
    num2 = '';
    clearDisplayFlag = true;
  }
}

function inputOp(operation) {
  display.textContent = operation;
  clearDisplayFlag = true;
  if (num2) {
    getAnswer();
  }
  operator = operation;
  decimal.disabled = false;
}

operatorBtns.forEach(sign => {
  sign.addEventListener('click', (e) => {
    inputOp(e.target.textContent);
    lastEqualsFlag = false;
  });
});

function getAnswer() {
  if (!num1 && !operator && !num2) {
    num1 = 0;
    let answer = num1;
    display.textContent = answer;
    clearDisplayFlag = true;
  } else if (!num1 && !num2) {
    num1 = 0;
    num2 = num1;
    calculate();
  } else if (!operator && !num2) {
    answer = num1;
    console.log(answer);
    display.textContent = answer;
    clearDisplayFlag = true;
  } else if (!num1) {
    num1 = 0;
    calculate();
  } else if (!num2) {
    num2 = num1;
    calculate();
  } else {
    calculate();
  }
  decimal.disabled = false;
}

equals.addEventListener('click', () => {
  getAnswer();
  lastEqualsFlag = true;
});

function clearCalc() {
  display.textContent = 0;
  num1 = '';
  operator = '';
  num2 = '';
  decimal.disabled = false;
  clearDisplayFlag = true;
  lastEqualsFlag = false;
}

clear.addEventListener('click', () => {
  clearCalc();
});

back.addEventListener('click', () => {
  deleteNum(display.textContent);
})

function deleteNum(num) {
  let result = num.slice(0, -1);
  console.log(result);
  display.textContent = result;
  //how to tell if the display is currently on num1 or num2
  if (!operator) {
    num1 = result;
  } else {
    num2 = result;
  }
  return result;
}

function handleOp(sign) {
  let result;
  switch (sign) {
    case '*':
      result = 'x';
      break;
    
    case '/':
      result = '÷';
      break;
  
    default:
      result = sign;
  }
  return result;
}

window.addEventListener('keydown', (e) => {
  console.log(e.key)
  if (e.key >= 0 && e.key <= 9) {
    inputNum(e.key);
    lastEqualsFlag = false;
  } else if (e.key === '.') {
      if (!display.textContent.includes('.')) {
        inputNum(e.key);
      } else {
        display.textContent += '';
      }
      lastEqualsFlag = false;
  } else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
    let operation = handleOp(e.key);
    inputOp(operation);
    lastEqualsFlag = false;
  } else if (e.key === '=' || e.key === 'Enter') {
    //prevents equals from registering a click on a button if user is
    //between mouse and keyboard input.
    //e.preventDefault();
    getAnswer();
    lastEqualsFlag = true;
  } else if (e.key === 'Backspace') {
    deleteNum(display.textContent);
  } else if (e.key === 'Escape' || e.key === 'Delete') {
    clearCalc();
    lastEqualsFlag = false;
  }
});
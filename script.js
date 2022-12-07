const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const display = document.getElementById('display');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const back = document.getElementById('back');

//setup everything I might want to do in functions
let clearDisplayFlag = false;

function clearDisplay() {
  display.textContent = '';
  clearDisplayFlag = false;
}

let num1 = '';
let operator = '';
let num2 = '';

//leaving the operation functions
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
  if (clearDisplay) {
    display.textContent = '';
    clearDisplay = false;
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
  });
});

decimal.addEventListener('click', () => {
  decimal.disabled = true;
});

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
});

back.addEventListener('click', () => {
  if (display.textContent === num1) {
    deleteNum(num1);
  } else if (display.textContent === num2) {
    deleteNum(num2);
  }
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

//add a keydown event listener to the window. done
//on a number keypress, run equivalent of what's going on under
//numBtns.forEach. done
//on an operator keypress, run the equivalent of what's going on under
//operatorBtns.forEach.
//on an equals or enter keypress, run the equivalent of the
//equals.addeventlistener.
//on a backspace keypress, run deleteNum.
//on an escape or Delete key keypress, run clearCalc.

window.addEventListener('keydown', (e) => {
  console.log(e.key)
  if (e.key >= 0 && e.key <= 9) {
    inputNum(e.key);
  } else if (e.key === '.') {
      if (!display.textContent.includes('.')) {
        inputNum(e.key);
      } else {
        display.textContent += '';
      }
  } //operator keypress
})
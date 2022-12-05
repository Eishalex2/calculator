const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const display = document.getElementById('display');
const decimal = document.getElementById('decimal');
let clearDisplay = false;

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

    case '*':
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

operatorBtns.forEach(sign => {
  sign.addEventListener('click', (e) => {
    display.textContent = e.target.textContent;
    operator = e.target.textContent;
    clearDisplay = true;
  })
})

//store the first number that's input, the operator, and then the second
//number that's input. Then, when you click the equals button, run the
//operate function on the array and display the output.
//only focusing on 1 set for now.



const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const display = document.getElementById('display');
const decimal = document.getElementById('decimal');

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

    case '/':
      return divide(a, b);
      break;
  }
}

numBtns.forEach(num => {
  num.addEventListener('click', () => {
    if (display.textContent.includes('+' || '-' || 'x' || '÷')) {
      display.textContent = '';
    };
    display.textContent += num.textContent;
  });
});

operatorBtns.forEach(operator => {
  operator.addEventListener('click', () => {
    display.textContent = operator.textContent;
  })
})

//store the first number that's input, the operator, and then the second
//number that's input. Then, when you click the equals button, run the
//operate function on the array and display the output.
//only focusing on 1 set for now.



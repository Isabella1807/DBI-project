function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Expected a number');
  }
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

function divide2(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// eslint-disable-next-line no-undef
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  divide2,
};

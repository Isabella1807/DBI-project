// calculator.test.js
/* eslint-disable @typescript-eslint/no-require-imports */
const calculator = require('./calculator.js');

////////////////////
//****TEST ADD****//
////////////////////
test('test add 1 + 2 is 3', () => {
  expect(calculator.add(1, 2)).toBe(3);
});

test('test add "abe" + 2 throws error', () => {
  expect(() => calculator.add('abe', 2)).toThrow();
});

test('test add -10 plus -10 is -20', () => {
  expect(calculator.add(-10, -10)).toBe(-20);
});

test('test add 10.5 add 10.5 is 21', () => {
  expect(calculator.add(10.5, 10.5)).toBe(21);
});

/////////////////////////
//****TEST SUBTRACT****//
/////////////////////////
test('test subtract 4 - 5 is -1', () => {
  expect(calculator.subtract(4, 5)).toBe(-1);
});

test('test subtract 5 - 4 is 1', () => {
  expect(calculator.subtract(5, 4)).toBe(1);
});

test('test subtract -10 minus -10 is -20', () => {
  expect(calculator.subtract(-10, -10)).toBe(0);
});

/////////////////////////
//****TEST MULTIPLY****//
/////////////////////////
test('test multiply 5 times 5 is 25', () => {
  expect(calculator.multiply(5, 5)).toBe(25);
});

test('test multiply 5 times 0 is 0', () => {
  expect(calculator.multiply(5, 0)).toBe(0);
});

///////////////////////
//****TEST DIVIDE****//
///////////////////////
test('test divide 20 divided by 2 is 10', () => {
  expect(calculator.divide(20, 2)).toBe(10);
});


//Tester om fejlen er en instans af Error-klassen.
//Uden Error virker det også, men den tester kun om der returneres en fejl.
test('test divide 20 divided by 0 returns error', () => {
  expect(() => calculator.divide(20, 0)).toThrow(Error);
});



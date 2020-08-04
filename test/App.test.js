import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import ExpressionStack from '../src/logic/ExpressionStack';
import App from '../src/App';

let container;
const stack = new ExpressionStack();

beforeEach(() => {
  fetch.resetMocks();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  stack.clear();
});

test('Renders successfully', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const display = container.querySelector('.Display');
  expect(display.textContent).toBe('0');
});

test('Renders displays keypad', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const keypad = container.querySelector('.Keypad');
  const buttonTwo = keypad.querySelector('button[value="2"]');
  expect(buttonTwo.textContent).toBe('2');
});

test('Displays button value on click', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const display = container.querySelector('.Display');
  const buttonTwo = container.querySelector('button[value="2"]');

  act(() => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('2');
});

test('Should clear display', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const display = container.querySelector('.Display');
  const buttonClear = container.querySelector('button[value="CLEAR"]');

  act(() => {
    buttonClear.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('0');
});

test('Displays an expression', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const display = container.querySelector('.Display');
  const buttonTwo = container.querySelector('button[value="2"]');
  const buttonAdd = container.querySelector('button[value="ADD"]');
  const buttonClear = container.querySelector('button[value="CLEAR"]');

  act(() => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonAdd.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('2 + 2');

  act(() => {
    buttonClear.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('0');
});

test('Should display calculated expression', async () => {
  stack.push('2');
  stack.push('ADD');
  stack.push('2');
  stack.calculate();
  fetch.mockResponseOnce(JSON.stringify({ result: stack.top() }));
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const display = container.querySelector('.Display');
  const buttonTwo = container.querySelector('button[value="2"]');
  const buttonAdd = container.querySelector('button[value="ADD"]');
  const buttonCalculate = container.querySelector('button[value="EQUAL"]');

  await act(async () => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonAdd.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonCalculate.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('= 4');
});

test('Hitting an operation after a calculation should perform the operation', async () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const display = container.querySelector('.Display');
  const buttonTwo = container.querySelector('button[value="2"]');
  const buttonAdd = container.querySelector('button[value="ADD"]');
  const buttonClear = container.querySelector('button[value="CLEAR"]');
  const buttonCalculate = container.querySelector('button[value="EQUAL"]');

  act(() => {
    buttonClear.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('0');

  stack.push('2');
  stack.push('ADD');
  stack.push('2');
  stack.calculate();

  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify({ result: stack.top() }));
  await act(async () => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonAdd.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonCalculate.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('= 4');

  act(() => {
    buttonAdd.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('4 +');

  stack.push('ADD');
  stack.push('2');
  stack.calculate();

  fetch.mockResponseOnce(JSON.stringify({ result: stack.top() }));
  await act(async () => {
    buttonAdd.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonCalculate.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('= 6');
});

test('Hitting a number after a calculation should clear and display number', async () => {
  stack.push('2');
  stack.push('ADD');
  stack.push('2');
  stack.calculate();
  fetch.mockResponseOnce(JSON.stringify({ result: stack.top() }));

  act(() => {
    ReactDOM.render(<App />, container);
  });

  const display = container.querySelector('.Display');
  const buttonTwo = container.querySelector('button[value="2"]');
  const buttonAdd = container.querySelector('button[value="ADD"]');
  const buttonClear = container.querySelector('button[value="CLEAR"]');
  const buttonCalculate = container.querySelector('button[value="EQUAL"]');

  act(() => {
    buttonClear.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('0');

  await act(async () => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonAdd.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonCalculate.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('= 4');

  act(() => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('2');
});

test('Should be able to do decimal number operations', async () => {
  stack.push('2.2');
  stack.push('ADD');
  stack.push('2.2');
  stack.calculate();
  fetch.mockResponseOnce(JSON.stringify({ result: stack.top() }));

  act(() => {
    ReactDOM.render(<App />, container);
  });

  const display = container.querySelector('.Display');
  const buttonClear = container.querySelector('button[value="CLEAR"]');
  const buttonTwo = container.querySelector('button[value="2"]');
  const buttonAdd = container.querySelector('button[value="ADD"]');
  const buttonFloat = container.querySelector('button[value="FLOAT"]');
  const buttonCalculate = container.querySelector('button[value="EQUAL"]');

  act(() => {
    buttonClear.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('0');

  act(() => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonFloat.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('2.2');

  act(() => {
    buttonAdd.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonFloat.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('2.2 + 2.2');

  await act(async () => {
    buttonCalculate.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(display.textContent).toBe('= 4.4');
});

test('Calculates percentage from a number', async () => {
  stack.push('25');
  stack.push('MULTIPLY');
  stack.push('5');
  stack.percent();
  stack.calculate();
  fetch.mockResponseOnce(JSON.stringify({ result: stack.top() }));

  act(() => {
    ReactDOM.render(<App />, container);
  });

  const input = container.querySelector('.Display');
  const buttonTwo = container.querySelector('button[value="2"]');
  const buttonFive = container.querySelector('button[value="5"]');
  const buttonMultiply = container.querySelector('button[value="MULTIPLY"]');
  const buttonPercentage = container.querySelector(
    'button[value="PERCENTAGE"]'
  );
  const buttonEquals = container.querySelector('button[value="EQUAL"]');

  act(() => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonFive.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonMultiply.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonFive.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonPercentage.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(input.textContent).toBe('25 × 5%');

  await act(async () => {
    buttonEquals.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(input.textContent).toBe('= 1.25');
});

test('Toggles negative number', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const input = container.querySelector('.Display');
  const buttonTwo = container.querySelector('button[value="2"]');
  const buttonToggleNegative = container.querySelector(
    'button[value="TOGGLE_NEGATIVE"]'
  );

  act(() => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonToggleNegative.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
  });

  expect(input.textContent).toBe('-2');
});

test('Division by zero', async () => {
  fetch.mockResponseOnce(JSON.stringify({ error: 'Expression Error' }));

  act(() => {
    ReactDOM.render(<App />, container);
  });

  const input = container.querySelector('.Display');
  const buttonTwo = container.querySelector('button[value="2"]');
  const buttonZero = container.querySelector('button[value="0"]');
  const buttonDivide = container.querySelector('button[value="DIVIDE"]');
  const buttonEquals = container.querySelector('button[value="EQUAL"]');

  await act(async () => {
    buttonTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonDivide.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonZero.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    buttonEquals.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(input.textContent).toBe('Expression Error');
});

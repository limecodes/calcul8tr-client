import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from '../src/App';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Basic functionality', () => {
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

    act(() =>{
      buttonTwo.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(display.textContent).toBe('2');
  });

  test('Should clear display', () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    const display = container.querySelector('.Display');
    const buttonClear = container.querySelector('button[value="CLEAR"]');

    act(() =>{
      buttonClear.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(display.textContent).toBe('0');
  });

  test('Displays an expression', () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    const input = container.querySelector('.Display');
    const buttonTwo = container.querySelector('button[value="2"]');
    const buttonAdd = container.querySelector('button[value="ADD"]');

    act(() => {
      buttonTwo.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      buttonAdd.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      buttonTwo.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(input.textContent).toBe('2 + 2');
  });
});

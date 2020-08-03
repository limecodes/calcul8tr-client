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
    const button = keypad.querySelector('button');
    expect(button.textContent).toBe('0');
  });
});

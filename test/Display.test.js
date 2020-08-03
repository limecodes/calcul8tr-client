import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Display from '../src/components/Display';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Basic Display Functionality', () => {
  test('Should receive prop value', () => {
    const display = renderer.create(<Display value={'2 + 2'} />);
    const instance = display.root;

    expect(instance.findByType(Display).props.value).toBe('2 + 2');
  });

  test('Should display prop value', () => {
    act(() => {
      ReactDOM.render(<Display value={'2 + 2'} />, container);
    });

    const display = container.querySelector('.Display');

    expect(display.textContent).toBe('2 + 2');
  });
});

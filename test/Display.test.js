import React from 'react';
import renderer from 'react-test-renderer';
import Display from '../src/components/Display';

describe('Basic Display Functionality', () => {
  test('Should display given value', () => {
    const display = renderer.create(<Display value={'0'} />);
    const instance = renderer.root;

    expect(instance.findByType(Display).props.value).toBe('0');
  });
});

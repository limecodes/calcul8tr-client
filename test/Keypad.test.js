import React from 'react';
import renderer from 'react-test-renderer';
import Keypad from '../src/components/Keypad';

describe('Basic Keypad Functionality', () => {
  test('Renders correctly', () => {
    const tree = renderer.create(<Keypad />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

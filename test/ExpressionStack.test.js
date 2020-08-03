import ExpressionStack from '../src/logic/ExpressionStack';

import { MULTIPLY } from '../src/constants';

describe('Basic Functionality', () => {
  test('Should have blank array', () => {
    const expressionStack = new ExpressionStack();

    expect(expressionStack.stack).toBeInstanceOf(Array);
  });

  test('Can push a number as a value', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push('2');

    const expected = [
      '2'
    ];

    expect(expressionStack.stack).toEqual(expected);
  });

  test('First element cannot be an operation', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push(MULTIPLY);

    const expected = [];

    console.log(expressionStack.getStack());

    expect(expressionStack.getStack()).toEqual(expected);
  });
});

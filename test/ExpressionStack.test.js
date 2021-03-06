import ExpressionStack from '../src/logic/ExpressionStack';

import { OPERATIONS } from '../src/constants';

describe('Basic Functionality', () => {
  test('Should have blank array', () => {
    const expressionStack = new ExpressionStack();

    expect(expressionStack.stack).toBeInstanceOf(Array);
  });

  test('Can push a number as a value', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push('2');

    const expected = ['2'];

    expect(expressionStack.stack).toEqual(expected);
  });

  test('First element cannot be an operation', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push('MULTIPLY');

    const expected = [];

    expect(expressionStack.getStack()).toEqual(expected);
  });

  test('Can push operation', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push('2');
    expressionStack.push('MULTIPLY');

    const expected = ['2', 'MULTIPLY'];

    expect(expressionStack.getStack()).toEqual(expected);
  });

  test('Should convert display', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push('2');
    expressionStack.push('MULTIPLY');
    expressionStack.push('2');

    const expected = '2 ' + OPERATIONS['MULTIPLY'].text + ' 2';

    expect(expressionStack.convertForDisplay()).toEqual(expected);
  });

  test('Should clear stack', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push('2');
    expressionStack.push('MULTIPLY');
    expressionStack.push('2');
    expressionStack.clear();

    const expected = [];

    expect(expressionStack.getStack()).toEqual(expected);
  });

  test('Should calculate an expression', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push('2');
    expressionStack.push('MULTIPLY');
    expressionStack.push('2');
    expressionStack.calculate();

    const expectedExpression = '= 4';
    const expectedStack = ['=', '4'];

    expect(expressionStack.convertForDisplay()).toEqual(expectedExpression);
    expect(expressionStack.stack).toEqual(expectedStack);
  });

  test('Should determine if current position is odd if length is zero', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push('2');

    expect(expressionStack.isPositionOdd()).toEqual(true);
  });

  test('Should determine if current position is odd', () => {
    const expressionStack = new ExpressionStack();

    expressionStack.push('2');
    expressionStack.push('MULTIPLY');

    expect(expressionStack.isPositionOdd()).toEqual(false);
  });
});

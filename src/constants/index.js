const MULTIPLY = 'MULTIPLY';
const DIVIDE = 'DIVIDE';
const SUBTRACT = 'SUBTRACT';
const ADD = 'ADD';
const EQUAL = 'EQUAL';
const CLEAR = 'CLEAR';
const OPERATION = 'OPERATION';
const CALCULATE = 'CALCULATE';
const TOGGLE_NEGATIVE = 'TOGGLE_NEGATIVE';
const PERCENTAGE = 'PERCENTAGE';
const FLOAT = 'FLOAT';
const NUMBER = 'NUMBER';

export const ACTIONS = {
  NUMBER: NUMBER,
  OPERATION: OPERATION,
  CALCULATE: CALCULATE,
  CLEAR: CLEAR,
  TOGGLE_NEGATIVE: TOGGLE_NEGATIVE,
  PERCENTAGE: PERCENTAGE,
  FLOAT: FLOAT,
};

export const OPERATIONS = {
  MULTIPLY: {
    type: MULTIPLY,
    operator: '*',
    text: '×',
    action: ACTIONS.OPERATION,
  },
  DIVIDE: { type: DIVIDE, operator: '/', text: '÷', action: ACTIONS.OPERATION },
  SUBTRACT: {
    type: SUBTRACT,
    operator: '-',
    text: '−',
    action: ACTIONS.OPERATION,
  },
  ADD: { type: ADD, operator: '+', text: '+', action: ACTIONS.OPERATION },
  EQUAL: { type: EQUAL, operator: '=', text: '=', action: ACTIONS.CALCULATE },
};

export const MODIFIERS = {
  CLEAR: { type: CLEAR, operator: null, text: 'AC', action: ACTIONS.CLEAR },
  TOGGLE_NEGATIVE: {
    type: TOGGLE_NEGATIVE,
    operator: null,
    text: '+/-',
    action: ACTIONS.TOGGLE_NEGATIVE,
  },
  PERCENTAGE: {
    type: PERCENTAGE,
    operator: null,
    text: '%',
    action: ACTIONS.PERCENTAGE,
  },
  FLOAT: { type: FLOAT, operator: null, text: '.', action: ACTIONS.FLOAT },
};

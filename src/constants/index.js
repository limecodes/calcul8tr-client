export const MULTIPLY = 'MULTIPLY';
export const DIVIDE = 'DIVIDE';
export const SUBTRACT = 'SUBTRACT';
export const ADD = 'ADD';
export const EQUAL = 'EQUAL';
export const CLEAR = 'CLEAR';
export const OPERATION = 'OPERATION';
export const CALCULATE = 'CALCULATE';
export const TOGGLE_NEGATIVE = 'TOGGLE_NEGATIVE';
export const PERCENTAGE = 'PERCENTAGE';
export const FLOAT = 'FLOAT';
export const NUMBER = 'NUMBER';

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

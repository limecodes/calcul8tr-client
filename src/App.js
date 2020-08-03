import React, { useState } from 'react';

import { ACTIONS } from './constants';

import ExpressionStack from './logic/ExpressionStack';

import Display from './components/Display';
import Keypad from './components/Keypad';

import './style.css';

const {
  NUMBER,
  OPERATION,
  CLEAR,
  CALCULATE,
  FLOAT,
  PERCENTAGE,
  TOGGLE_NEGATIVE,
} = ACTIONS;

const stack = new ExpressionStack();

const handleOperations = (value, action) => {
  switch (action) {
    case NUMBER:
      stack.push(value);
      break;
    case OPERATION:
      stack.push(value);
      break;
    case CALCULATE:
      stack.calculate();
      break;
    case CLEAR:
      stack.clear();
      break;
    case FLOAT:
      stack.float();
      break;
    case PERCENTAGE:
      stack.percent();
      break;
    case TOGGLE_NEGATIVE:
      stack.negative();
      break;
    default:
      return;
      break;
  }
}

const onPress = (setExpression, setError, value, action) => {
  if (action === CLEAR) setError(null);

  try {
    handleOperations(value, action);
    setExpression(stack.convertForDisplay());
  } catch (error) {
    setError(error.message);
    setExpression(stack.convertForDisplay());
  }
}

function App() {
  const [expression, setExpression] = useState('');
  const [error, setError] = useState(null);

  return (
    <div className="App">
      <Display value={expression} error={error} />
      <div className="Keypad">
        <Keypad onPress={onPress.bind(null, setExpression, setError)} />
      </div>
    </div>
  );
}

export default App;

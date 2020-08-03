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
      break;
    default:
      return;
      break;
  }
}

const onPress = (setExpression, value, action) => {
  handleOperations(value, action);
  setExpression(stack.convertForDisplay());
}

function App() {
  const [expression, setExpression] = useState('');

  return (
    <div className="App">
      <Display value={expression} />
      <div className="Keypad">
        <Keypad onPress={onPress.bind(null, setExpression)} />
      </div>
    </div>
  );
}

export default App;

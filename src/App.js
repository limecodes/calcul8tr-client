import React, { useState } from 'react';

import { ACTIONS } from './constants';

import ExpressionStack from './logic/ExpressionStack';

import Display from './components/Display';
import Keypad from './components/Keypad';

import './style.css';

const {
  NUMBER,
  OPERATION,
} = ACTIONS;

const stack = new ExpressionStack();

const onPress = (setExpression, value, action) => {
  if (action === NUMBER) {
    stack.push(value);
  } else if (action === OPERATION) {
    stack.push(value);
  }

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

import React, { useState } from 'react';

import { ACTIONS } from './constants';

import Display from './components/Display';
import Keypad from './components/Keypad';

import './style.css';

const {
  NUMBER
} = ACTIONS;

const onPress = (setExpression, value, action) => {
  if (action === NUMBER) {
    setExpression(value);
  }
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

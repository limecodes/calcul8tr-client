import React, { useState } from 'react';

import Display from './components/Display';
import Keypad from './components/Keypad';

import './style.css';

function App() {
  const [expression, setExpression] = useState('');

  return (
    <div className="App">
      <Display value={expression} />
      <div className="Keypad">
        <Keypad onPress={(e) => setExpression(e.target.value)} />
      </div>
    </div>
  );
}

export default App;

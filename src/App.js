import React from 'react';

import Display from './components/Display';
import Keypad from './components/Keypad';

function App() {
  return (
    <div className="App">
      <Display />
      <div className="Keypad">
        <Keypad />
      </div>
    </div>
  );
}

export default App;

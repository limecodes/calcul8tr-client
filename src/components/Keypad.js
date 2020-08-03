import React from 'react';

function Keypad() {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => <div key={i} className='Button'><button>{e}</button></div>);
}

export default Keypad;

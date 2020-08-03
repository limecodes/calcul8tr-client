import React from 'react';
import Button from './Button';

function Keypad(props) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => (
    <div key={i} className="Button">
      <Button value={e} onPress={props.onPress} />
    </div>
  ));
}

export default Keypad;

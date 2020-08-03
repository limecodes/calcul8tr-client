import React from 'react';

import { OPERATIONS } from '../constants';

import Button from './Button';

const {
    MULTIPLY, DIVIDE, SUBTRACT, ADD, EQUAL,
} = OPERATIONS;

const layout = [
  [7, 8, 9, DIVIDE],
  [4, 5, 6, MULTIPLY],
  [1, 2, 3, SUBTRACT],
  [0, EQUAL],
];

function Keypad(props) {
  return layout.flat().map((e, i) => (
    <div key={i} className="Button">
      <Button value={e} onPress={props.onPress} />
    </div>
  ));
}

export default Keypad;

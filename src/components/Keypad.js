import React from 'react';

import { OPERATIONS, MODIFIERS } from '../constants';

import Button from './Button';

const {
    MULTIPLY, DIVIDE, SUBTRACT, ADD, EQUAL,
} = OPERATIONS;

const {
    CLEAR, TOGGLE_NEGATIVE, PERCENTAGE, FLOAT,
} = MODIFIERS;

const layout = [
  ['', '', '', CLEAR],
  [7, 8, 9, DIVIDE],
  [4, 5, 6, MULTIPLY],
  [1, 2, 3, SUBTRACT],
  [0, ADD, EQUAL],
];

function Keypad(props) {
  return layout.flat().map((e, i) => (
    <div key={i} className="Button">
      <Button value={e} onPress={props.onPress} />
    </div>
  ));
}

export default Keypad;

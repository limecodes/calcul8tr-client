import React from 'react';

import { ACTIONS } from '../constants';

const handlePress = (action, onPress, e) => {
  e.preventDefault();

  const value = e.target.value;

  onPress(value, action);
};

function Button(props) {
  const { value, onPress } = props;

  if (typeof value === 'object') {
    return (
      <button
        className={value.action.toLowerCase()}
        value={value.type}
        onClick={handlePress.bind(null, value.action, onPress)}
      >
        {value.text}
      </button>
    );
  } else if (typeof value === 'number') {
    return (
      <button
        className="number"
        value={value}
        onClick={handlePress.bind(null, ACTIONS.NUMBER, onPress)}
      >
        {value}
      </button>
    );
  } else {
    return <span className="Placeholder"> </span>;
  }
}

export default Button;

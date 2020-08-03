import React from 'react';

function Button(props) {
  const {
    value, onPress
  } = props;

  return <button value={value} onClick={onPress}>{value}</button>
}

export default Button;

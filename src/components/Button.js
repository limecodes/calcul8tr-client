import React from 'react';

const handlePress = (onPress, e) => {
  e.preventDefault();

  const value = e.target.value;

  onPress(value);
}

function Button(props) {
  const {
    value, onPress
  } = props;

  return <button value={value} onClick={handlePress.bind(null, onPress)}>{value}</button>
}

export default Button;

import React from 'react';

function Display(props) {
  const {
    value
  } = props;

  return <div className="Display">{value ? value : 0}</div>;
}

export default Display;

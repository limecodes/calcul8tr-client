import React from 'react';

function Display(props) {
  const {
    value, error
  } = props;

  return (
    <div className='Display'>
      {error ? <div className='Error'>{error}</div> : <div className='Output'>{value ? value : 0}</div>}
    </div>
  );
}

export default Display;

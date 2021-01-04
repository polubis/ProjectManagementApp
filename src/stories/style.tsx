import React from 'react';

export const GreyBackground = (props) => {
  return (
    <div
      style={{
        width: 300,
        height: 300,
        background: '#aaa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

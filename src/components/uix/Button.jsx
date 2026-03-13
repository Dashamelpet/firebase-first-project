import React from 'react';

const Button = ({ onClick = () => {}, className = '', disabled = false, text = '' }) => {
  return (
    <button 
      className={className} 
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;

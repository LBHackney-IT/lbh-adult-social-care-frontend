import React from 'react';

const ErrorField = ({ text }) => {
  if (!text) return React.Fragment;

  return (
    <div className="error-field">
      <p>{text}</p>
    </div>
  );
};

export default ErrorField;

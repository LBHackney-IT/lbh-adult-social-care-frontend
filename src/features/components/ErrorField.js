import React from "react";

const ErrorField = ({ text }) => {
  if(!text) return React.Fragment;

  return (
    <div className='error-field'>
      {text}
    </div>
  )
};

export default ErrorField;

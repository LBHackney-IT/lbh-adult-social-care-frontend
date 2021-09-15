import React from 'react';
import BaseField from './baseComponents/BaseField';
import ErrorField from './ErrorField';

const TextArea = ({
  rows = 3,
  label,
  placeholder = '',
  onChange = () => {},
  className = '',
  value,
  error,
  setError,
  children,
}) => {
  const onTextAreaChange = (event) => {
    event.preventDefault();
    setError && setError();
    onChange(event.target.value);
  };

  return (
    <BaseField label={label} className={className}>
      <textarea rows={rows} value={value} placeholder={placeholder} onChange={onTextAreaChange}>
        {children !== undefined ? children : null}
      </textarea>
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export default TextArea;

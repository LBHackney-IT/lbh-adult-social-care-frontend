import React, { useState } from 'react';
import { CheckIcon } from './Icons';
import ErrorField from './ErrorField';

const Checkbox = ({ children, className = '', checked = false, error, setError, onChange = () => {} }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onCheckedChange = (event) => {
    onChange(!isChecked, event);
    setError && setError();
    setIsChecked(!isChecked);
  };

  const outerClassName = className ? ` ${className}` : '';

  return (
    <label className={`checkbox${checked ? ' checkbox-status-checked' : ''}${outerClassName}`} onClick={onCheckedChange}>
      <div className="checkbox-check">{checked ? <CheckIcon /> : null}</div>
      {children !== undefined ? children : null}
      {error && <ErrorField text={error} />}
    </label>
  );
};

export default Checkbox;

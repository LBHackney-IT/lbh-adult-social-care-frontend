import React, { useState } from 'react';
import { CheckIcon } from './Icons';
import ErrorField from './ErrorField';

const Checkbox = ({ children, checked = false, error, setError = () => {}, onChange = () => {} }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onCheckedChange = (event) => {
    onChange(!isChecked, event);
    setError();
    setIsChecked(!isChecked);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="checkbox" onClick={onCheckedChange} role="presentation">
      <div className="checkbox-check">{checked ? <CheckIcon /> : null}</div>
      {children !== undefined ? children : null}
      {error && <ErrorField text={error} />}
    </label>
  );
};

export default Checkbox;

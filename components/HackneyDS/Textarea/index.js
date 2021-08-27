import React, { useState, useEffect } from 'react';

export default function Textarea({ 'max-count': maxCount, rows = 5, id, name, value, handler = () => {} }) {
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => setCurrentValue(value), [value]);
  useEffect(() => handler(currentValue), [currentValue]);
  const getCount = () => maxCount - currentValue.length;
  return (
    <div className="govuk-form-group lbh-form-group">
      <textarea
        className="govuk-textarea lbh-textarea hds-textarea"
        id={id}
        name={name}
        rows={rows}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
      />
      {!!maxCount && (
        <span
          id="more-detail-info"
          className={`govuk-hint govuk-character-count__message${getCount() < 0 && ' govuk-error-message'}`}
        >{`You have ${getCount()} characters remaining`}</span>
      )}
    </div>
  );
}

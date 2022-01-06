import React from 'react';

const Textarea = React.forwardRef(({
  maxCount,
  rows = 5,
  id,
  name,
  value,
  className = '',
  handler = () => {},
  disabled,
}, ref) => {
  const getCount = () => maxCount - value.length;
  return (
    <div className={`govuk-form-group lbh-form-group ${className}`}>
      <textarea
        className="govuk-textarea lbh-textarea hds-textarea"
        id={id}
        name={name}
        rows={rows}
        value={value ?? ""}
        onChange={(e) => handler(e.target.value)}
        disabled={disabled}
        ref={ref}
      />
      {!!maxCount && (
        <span
          id="more-detail-info"
          className={`govuk-hint govuk-character-count__message${getCount() < 0 && ' govuk-error-message'}`}
        >{`You have ${getCount()} characters remaining`}</span>
      )}
    </div>
  );
})

export default Textarea

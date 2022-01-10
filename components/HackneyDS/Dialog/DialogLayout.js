import React from 'react';

export default function DialogLayout({ title, body, submitLabel, declineLabel, action = {} }) {
  const { submit, decline } = action;
  return (
    <div>
      <h2 className="lbh-heading-h2 lbh-dialog__title">{title}</h2>
      <p className="lbh-body">{body}</p>
      <div className="lbh-dialog__actions">
        <div className="govuk-button lbh-button" onClick={submit}>
          {submitLabel}
        </div>
        <button className="lbh-link lbh-link--no-visited-state" type="button" onClick={decline}>
          {declineLabel}
        </button>
      </div>
    </div>
  );
}

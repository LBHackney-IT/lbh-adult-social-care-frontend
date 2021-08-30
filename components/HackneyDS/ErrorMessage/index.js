import React from 'react';

export default function ErrorMessage({ text = '' }) {
  return <span className="govuk-error-message">{text}</span>;
}
import React from 'react';

export default function Label({ text = '' }) {
  return <span className="govuk-label lbh-label">{text}</span>;
}
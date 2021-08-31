import React from 'react';

export default function Hint({ text = '' }) {
  return <span className="govuk-hint lbh-hint">{text}</span>;
}
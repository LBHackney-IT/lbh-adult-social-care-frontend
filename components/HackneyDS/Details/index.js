import React from 'react';
import { getSlot } from '../utils';

export default function Details({ children, open }) {
  return (
    <details className="govuk-details lbh-details" data-module="govuk-details" open={open}>
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{getSlot(children, 'title')}</span>
      </summary>
      <div className="govuk-details__text">{getSlot(children, 'content')}</div>
    </details>
  );
}
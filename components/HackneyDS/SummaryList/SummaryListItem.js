import React from 'react';

const SummaryListItem = ({ name, handler, href, key}) => {
  const onClick = (e) => {
    if(handler) {
      e.preventDefault();
      handler();
    }
  }
  return (
    <li key={name} className="govuk-summary-list__actions-list-item">
      <a onClick={onClick} className="govuk-link" href={href || '#'}>
        {name}<span className="govuk-visually-hidden"> {key.toLowerCase()}</span>
      </a>
    </li>
  )
};

export default SummaryListItem;
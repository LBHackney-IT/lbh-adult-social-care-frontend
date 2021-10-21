import React from 'react';
import Link from '../lettering/Link';

const SummaryListItem = ({ name, handler, href, keyText }) => {
  const onClick = (e) => {
    if (handler) {
      e.preventDefault();
      handler();
    }
  };
  return (
    <li key={keyText} className="govuk-summary-list__actions-list-item">
      <Link onClick={onClick} className="govuk-link" href={href || '#'}>
        {name}
        <span className="govuk-visually-hidden"> {keyText.toLowerCase()}</span>
      </Link>
    </li>
  );
};

export default SummaryListItem;

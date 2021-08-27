import React from 'react';

export default function Breadcrumbs({ values }) {
  return (
    <div className="govuk-breadcrumbs lbh-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        {values.map((item) => (
          <li className="govuk-breadcrumbs__list-item" key={Math.random()}>
            <span
              className="govuk-breadcrumbs__link govuk-breadcrumbs__link--available"
              onClick={(e) => {
                e.preventDefault();
                item.onClick();
              }}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

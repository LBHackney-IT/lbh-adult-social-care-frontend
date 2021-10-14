import React from 'react';
import { BreadcrumbsChevron } from '../../Icons';

export default function Breadcrumbs({ values }) {
  return (
    <div className="govuk-breadcrumbs lbh-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        {values.map((item, index) => {
            const isLastItem = index + 1 === values.length;
            return (
              <li className="govuk-breadcrumbs__list-item" key={Math.random()}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="govuk-breadcrumbs__link govuk-breadcrumbs__link--available"
                  >
                    {item.text}
                  </a>
                ) : <p className="govuk-breadcrumbs__default-text">{item.text}</p>
                }
                {!isLastItem && <BreadcrumbsChevron />}
              </li>
            );
          })}
      </ol>
    </div>
  );
}

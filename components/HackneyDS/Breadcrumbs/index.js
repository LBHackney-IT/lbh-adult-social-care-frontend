import React from 'react';
import { BreadcrumbsChevron } from '../../Icons';

export default function Breadcrumbs ({ values }) {
  return (
    <div className="govuk-breadcrumbs lbh-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        {values.map(({ text, href }, index) => {
          const isLastIndex = index + 1 === values.length;
          return (
            <li className="govuk-breadcrumbs__list-item" key={Math.random()}>
              {href ? (
                <a className="govuk-breadcrumbs__link govuk-breadcrumbs__link--available" href={href}>
                  {text}
                </a>
              ) : <p className="govuk-breadcrumbs__default-text">{text}</p>
              }
              {!isLastIndex && <BreadcrumbsChevron/>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

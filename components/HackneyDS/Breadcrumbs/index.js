import React from 'react';
import Link from 'next/link'
import { BreadcrumbsChevron } from '../../Icons';

export default function Breadcrumbs({ values }) {
  return (
    <div className="govuk-breadcrumbs lbh-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        {values.map(({ text, href }, index) => {
            const isLastItem = index + 1 === values.length;
            return (
              <li className="govuk-breadcrumbs__list-item" key={text}>
                {href ? (
                  <Link
                    href={href}
                    className="govuk-breadcrumbs__link govuk-breadcrumbs__link--available"
                  >
                    {text}
                  </Link>
                ) : <p className="govuk-breadcrumbs__default-text">{text}</p>
                }
                {!isLastItem && <BreadcrumbsChevron />}
              </li>
            );
          })}
      </ol>
    </div>
  );
}

import React from 'react';
import { BreadcrumbsChevron } from './Icons';

const Breadcrumbs = ({ values, className = '' }) => (
  <div className={`breadcrumbs${className ? ` ${className}` : ''}`}>
    {values.map((item, index) => {
      const isLastItem = index + 1 === values.length;
      return (
        <div key={item.text}>
          {item.href ? (
            <a href={item.href} className="breadcrumbs__item text-underline green">
              {item.text}
            </a>
          ) : <p className="breadcrumbs__item">{item.text}</p>
          }
          {!isLastItem && <BreadcrumbsChevron />}
        </div>
      );
    })}
  </div>
);

export default Breadcrumbs;

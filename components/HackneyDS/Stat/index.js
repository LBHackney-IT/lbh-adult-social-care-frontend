import React from 'react';

export const Stat = ({ stats = [], threeColumn = false }) => {

  if(stats.length === 1) return (
    <div className="lbh-stat">
      <strong className="lbh-stat__value" aria-labelledby="stat-1-caption">
        {stats[0].value}
      </strong>
      <span
        className="lbh-stat__caption"
        id={`${stats[0].caption}${stats[0].value}`}
      >
        {stats[0].caption}
      </span>
    </div>
  );

  const columnClass = threeColumn ? 'govuk-grid-column-one-third' : 'govuk-grid-column-one-half';

  return (
    <div className="govuk-grid-row">
      {stats.map(({ value, caption }) => (
        <div className={columnClass}>
          <div className="lbh-stat">
            <strong className="lbh-stat__value" aria-labelledby="stat-1-caption">
              {value}
            </strong>
            <span className="lbh-stat__caption" id={`${value}${caption}`}>
              {caption}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
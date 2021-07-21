import React from 'react';

const CareTitle = ({ children, startDate, endDate }) => (
  /* startDate = new Date(startDate).toLocaleDateString('en-GB');
  endDate = endDate && new Date(endDate).toLocaleDateString('en-GB'); */
  <div className="care-title">
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label>{children}</label>
    <div className="care-date-range">
      <div className="date-entry">
        {startDate}
        {endDate ? ` - ${endDate}` : null}
      </div>
    </div>
  </div>
);
export default CareTitle;

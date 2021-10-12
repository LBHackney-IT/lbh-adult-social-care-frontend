import React from 'react';
import { getEnGBFormattedDate } from 'api/Utils/FuncUtils';

const CareTitle = ({ children, startDate, endDate }) => (
  <div className="care-title">
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label>{children}</label>
    <div className="care-date-range">
      <div className="date-entry">
        ({getEnGBFormattedDate(startDate)}
        {endDate ? ` - ${getEnGBFormattedDate(endDate)}` : ' - Ongoing'})
      </div>
    </div>
  </div>
);

export default CareTitle;

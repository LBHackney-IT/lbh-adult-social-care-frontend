import React from "react";

const CareTitle = ({ children, startDate, endDate }) => {
  startDate = new Date(startDate).toLocaleDateString('en-GB');
  endDate = endDate && new Date(endDate).toLocaleDateString('en-GB');
  return (
    <div className="care-title">
      <label>{children}</label>
      <div className="care-date-range">
        <div className="date-entry">
          {startDate}
          {endDate ? ` - ${endDate}` : null}
        </div>
      </div>
    </div>
  );
};

export default CareTitle;

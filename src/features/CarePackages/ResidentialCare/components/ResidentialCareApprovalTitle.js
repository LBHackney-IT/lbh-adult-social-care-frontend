import React from "react";

const ResidentialCareApprovalTitle = ({
  startDate,
  endDate
}) => {
  startDate = new Date(startDate).toLocaleDateString("en-GB");
  return (
    <div className="columns">
      <div className="column">
        <p className="font-weight-bold">
          <span className="font-size-24px mr-4">Residential Care</span>
          <span className="font-size-19px">({startDate} - {endDate})</span>
        </p>
      </div>
    </div>
  );
};

export default ResidentialCareApprovalTitle;

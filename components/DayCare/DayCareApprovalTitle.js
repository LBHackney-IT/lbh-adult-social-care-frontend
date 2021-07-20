import React from 'react';

const DayCareApprovalTitle = ({ termTimeConsiderationOption = 'term time', isFixedPeriodOrOngoing = false }) => (
  <div className="columns">
    <div className="column">
      <p className="font-weight-bold">
        <span className="font-size-24px mr-4">Day Care</span>
        <span className="font-size-19px">
          ({isFixedPeriodOrOngoing ? 'Fixed Period' : 'Ongoing'} - {termTimeConsiderationOption})
        </span>
      </p>
    </div>
  </div>
);

export default DayCareApprovalTitle;

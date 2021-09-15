import React from 'react';
import { getEnGBFormattedDate } from 'api/Utils/FuncUtils';

const ResidentialCareApprovalTitle = ({ startDate, endDate }) => (
  <div className="columns">
    <div className="column">
      <p className="font-weight-bold">
        <span className="font-size-24px mr-4">Residential Care</span>
        <span className="font-size-19px">
          ({getEnGBFormattedDate(startDate)} - {endDate})
        </span>
      </p>
    </div>
  </div>
);

export default ResidentialCareApprovalTitle;

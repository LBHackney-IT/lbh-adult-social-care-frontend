import React from 'react';
import { getEnGBFormattedDate } from '../../api/Utils/FuncUtils';

const NursingCareApprovalTitle = ({ startDate, endDate }) => (
    <div className="columns">
      <div className="column">
        <p className="font-weight-bold">
          <span className="font-size-24px mr-4">Nursing Care</span>
          <span className="font-size-19px">
            ({getEnGBFormattedDate(startDate)} - {endDate})
          </span>
        </p>
      </div>
    </div>
  );

export default NursingCareApprovalTitle;

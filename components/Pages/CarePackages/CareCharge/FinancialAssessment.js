import React, { memo } from 'react';
import { Button } from 'components/HackneyDS';

const FinancialAssessment = () => (
  <div className="financial-assessment">
    <h3>Financial Assessment</h3>
    <Button className="mt-5" secondary>
      Upload file
    </Button>
  </div>
);

export default memo(FinancialAssessment);

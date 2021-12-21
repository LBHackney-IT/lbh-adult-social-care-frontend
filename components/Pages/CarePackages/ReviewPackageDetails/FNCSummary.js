import React from 'react';
import { Container, HorizontalSeparator, VerticalSeparator } from '../../../HackneyDS';
import ViewDocument from '../../../ViewDocument';
import { getDocumentRequest } from '../../../../api';

const fundedNursingCareClaimCollector = {
  2: 'Hackney Council (gross)',
  1: 'Supplier (net)',
};

export const FNCSummary = ({ containerId, assessmentFileName, assessmentFileId, claimCollector }) => {
  if (containerId !== 'funded-nursing-care') return null;

  return (
    <>
      <p>
        <span className="font-weight-bold">FNC assessment been carried out: </span>
        {assessmentFileName ? 'Yes' : 'No'}
      </p>
      <HorizontalSeparator height={8} />
      <p>
        <span className="font-weight-bold">Collected by: </span>
        {fundedNursingCareClaimCollector[claimCollector]}
      </p>
      <HorizontalSeparator height={8} />
      <Container display='flex' className="mb-3">
        <span className="font-weight-bold">FNC assessment: </span>
        <VerticalSeparator width={8} />
        <ViewDocument
          getDocumentRequest={() => getDocumentRequest(assessmentFileId)}
          hasFile={assessmentFileName && assessmentFileId}
          downloadFileName={assessmentFileName}
        />
      </Container>
    </>
  );
};
import React from 'react';
import { Collapse, Container, HorizontalSeparator } from 'components';
import { useRouter } from 'next/router';
import { getSinglePayrunRoute } from 'routes/RouteConstants';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';
import { CaretDownIcon } from 'components/Icons';
import { HeldPaymentHeader } from './HeldPaymentHeader';
import { SinglePayRunBreakdown } from './SinglePayRun/SinglePayRunBreakdown';
import { PayRunItem } from './SinglePayRun/PayRunItem';

const statussName = {
  'Waiting for Approval': 'Waiting For Approval',
  'Ready for review': 'Waiting For Review',
  'Paid with hold': 'Paid With Hold',
  'In progress': 'In Progress',
};

export const HeldPaymentsList = ({ searchTerm, data }) => {
  const router = useRouter();
  const gotToPayrun = (payRunId) => {
    router.push(getSinglePayrunRoute(payRunId));
  };
  const handleId = (id) => getHighlightedSearchQuery(id, searchTerm);
  return (
    <Container>
      {data.map((payRun, index) => (
        <>
          <Container background="#FAFAFA" padding="32px 16px" key={payRun.payRunId}>
            <Collapse
              title={<HeldPaymentHeader payRun={payRun} />}
              IconComponent={CaretDownIcon}
              expandText=""
              collapseText=""
              isButtonClickOnly
            >
              <HorizontalSeparator height="40px" />
              <PayRunItem item={payRun.payRunInvoice} key={payRun.payRunId} searchTerm="a" padding="0" payRunId={payRun.payRunId} />
            </Collapse>
          </Container>
          {index < data.length - 1 && <HorizontalSeparator height="16px" />}
        </>
      ))}
    </Container>
  );
};

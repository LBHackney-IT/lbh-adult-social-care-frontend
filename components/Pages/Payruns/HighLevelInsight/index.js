import React, { useState } from 'react';
import { Container, Heading, Hint, HorizontalSeparator } from 'components';
import { getNumberWithCommas } from 'service';
import ApproveDeclineModal from '../ApproveDeclineModal';
import { InsightButtons } from './InsightButtons';

export const HighLevelInsight = ({
  payRunId,
  payRunNumber,
  total = 0,
  difference = 0,
  suppliers = 0,
  serviceUsers = 0,
  holdCount = 0,
  holdValue = 0,
  update,
  hasInvoices,
  status,
  isCedarFileDownloaded,
  insightDataLoading,
  paidBy,
  paidOn,
}) => {
  const [openedModal, setOpenedModal] = useState('');

  // const openModal = (name) => () => setOpenedModal(name);

  const increaseOrDecrease = difference > 0 ? 'increase' : 'decrease';

  return (
    <>
      <ApproveDeclineModal
        setOpenedModal={setOpenedModal}
        openedModal={openedModal}
        payRunId={payRunId}
        update={update}
      />
      <Container background="#FAFAFA" padding="24px 16px">
        <Container display="flex" justifyContent="space-between">
          <Container display="flex" flexDirection="column">
            <Hint>High Level Insight</Hint>
            <HorizontalSeparator height="5px" />
            <Heading size="xl" color="#00664F">
              £{getNumberWithCommas(total)}
            </Heading>
            <HorizontalSeparator height="5px" />
            {`£${getNumberWithCommas(Math.abs(difference))} ${increaseOrDecrease} from last cycle`}
          </Container>
          <Container borderRight="1px solid rgba(82, 90, 91, 0.25)" />
          <Container display="flex" flexDirection="column" textAlign="center" alignSelf="center">
            <Heading size="xl" color="#00664F">
              {suppliers}
            </Heading>
            Suppliers
          </Container>
          <Container borderRight="1px solid rgba(82, 90, 91, 0.25)" />
          <Container display="flex" flexDirection="column" textAlign="center" alignSelf="center">
            <Heading size="xl" color="#00664F">
              {serviceUsers}
            </Heading>
            Service Users
          </Container>
          <Container borderRight="1px solid rgba(82, 90, 91, 0.25)" />
          <Container display="flex" flexDirection="column" textAlign="center" alignSelf="center">
            <Heading size="xl" color="#00664F">
              {holdCount}
            </Heading>
            Holds worth £{getNumberWithCommas(holdValue)}
          </Container>
          <InsightButtons
            payRunId={payRunId}
            payRunNumber={payRunNumber}
            status={status}
            isCedarFileDownloaded={isCedarFileDownloaded}
            hasInvoices={hasInvoices}
            update={update}
            paidBy={paidBy}
            paidOn={paidOn}
            isLoading={insightDataLoading}
          />
        </Container>
      </Container>
    </>
  );
};

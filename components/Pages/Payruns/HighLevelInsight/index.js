import React, { useState } from 'react';
import { Container, Heading, Hint, HorizontalSeparator } from 'components';
import { getNumberWithCommas } from 'service';
import { useDispatch } from 'react-redux';
import { rejectPayRun } from 'api/PayRun';
import { addNotification } from 'reducers/notificationsReducer';
import ApproveDeclineModal from '../ApproveDeclineModal';
import { InsightButtons } from './InsightButtons';

export const HighLevelInsight = ({
  payRunId,
  total = 0,
  difference = 0,
  suppliers = 0,
  serviceUsers = 0,
  holdCount = 0,
  holdValue = 0,
  updateData,
  hasInvoices,
  status,
  isCedarFileDownloaded,
  insightDataLoading,
}) => {
  const dispatch = useDispatch();

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const [openedModal, setOpenedModal] = useState('');

  const closeModal = () => setOpenedModal('');

  const increaseOrDecrease = difference > 0 ? 'increase' : 'decrease';

  const onRejectPayRun = async (notes) => {
    await rejectPayRun(payRunId, notes);
    pushNotification(`Pay run status changed`, 'success');
    updateData();
  };

  return (
    <>
      <ApproveDeclineModal
        rejectRequest={onRejectPayRun}
        closeModal={closeModal}
        openedModal={openedModal}
        payRunId={payRunId}
        updateData={updateData}
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
            status={status}
            isCedarFileDownloaded={isCedarFileDownloaded}
            hasInvoices={hasInvoices}
            updateData={updateData}
            isLoading={insightDataLoading}
          />
        </Container>
      </Container>
    </>
  );
};

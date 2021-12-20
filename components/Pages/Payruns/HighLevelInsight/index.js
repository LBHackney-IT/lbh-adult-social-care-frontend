import React, { useState } from 'react';
import { Container, Heading, Hint, HorizontalSeparator } from 'components';
import { formatNumberToCurrency } from 'service';
import { useDispatch } from 'react-redux';
import { rejectPayRun } from 'api/PayRun';
import { addNotification } from 'reducers/notificationsReducer';
import ApproveRejectModal from '../ApproveRejectModal';
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
  updateData,
  hasInvoices,
  status,
  isCedarFileDownloaded,
  insightDataLoading,
  paidBy,
  paidOn,
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
    pushNotification(`Payrun has been rejected`, 'success');
    updateData();
  };

  return (
    <>
      <ApproveRejectModal
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
              {formatNumberToCurrency(total)}
            </Heading>
            <HorizontalSeparator height="5px" />
            {`${formatNumberToCurrency((difference))} ${increaseOrDecrease} from last cycle`}
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
            Holds worth {formatNumberToCurrency(holdValue)}
          </Container>
          <InsightButtons
            payRunId={payRunId}
            openRejectModal={() => setOpenedModal('Reject')}
            payRunNumber={payRunNumber}
            status={status}
            isCedarFileDownloaded={isCedarFileDownloaded}
            hasInvoices={hasInvoices}
            updateData={updateData}
            paidBy={paidBy}
            paidOn={paidOn}
            isLoading={insightDataLoading}
          />
        </Container>
      </Container>
    </>
  );
};

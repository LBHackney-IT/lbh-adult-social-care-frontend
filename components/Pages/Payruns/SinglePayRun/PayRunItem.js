import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Heading,
  HoldPaymentDialog,
  HorizontalSeparator,
  Link,
  VerticalSeparator,
} from 'components';
import { usePushNotification } from 'service';
import { SinglePayRunOverview } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunOverview';
import { SinglePayRunBreakdown } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunBreakdown';
import { useRouter } from 'next/router';
import { getCarePackageReviewRoute, getPaymentHistoryRoute } from 'routes/RouteConstants';
import { updateInvoiceStatus } from 'api/PayRuns';
import ApproveRejectModal from '../ApproveRejectModal';

export const PayRunItem = ({
  searchTerm,
  payRunId,
  item,
  isActivePayRun,
  updateData,
  totalPayTitle,
  padding = '24px 16px',
  isHeld,
}) => {
  if (!item) return null;

  const [invoiceId, setInvoiceId] = useState('');

  const [openedModal, setOpenedModal] = useState('');

  const pushNotification = usePushNotification();

  const rejectInvoiceStatus = async (notes) => {
    try {
      await updateInvoiceStatus(payRunId, invoiceId, 4, notes);
      pushNotification('Invoice has been rejected', 'success');
      await updateData();
      closeModal();
    } catch (e) {
      pushNotification(e);
    }
  };

  const closeModal = () => {
    setInvoiceId('');
    setOpenedModal('');
  };

  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(getCarePackageReviewRoute(item.carePackageId));
  };

  const handlePastPaymentsClick = (e) => {
    e.preventDefault();
    router.push(getPaymentHistoryRoute(item.carePackageId));
  };

  return (
    <>
      <Container background="#FAFAFA" padding={padding}>
        <SinglePayRunOverview
          payRunId={payRunId}
          isActivePayRun={isActivePayRun}
          updateData={updateData}
          openModal={(field) => setOpenedModal(field === '4' ? 'Reject' : 'Hold')}
          searchTerm={searchTerm}
          setInvoiceId={setInvoiceId}
          payRun={item}
          isHeld={isHeld}
        />
        <HorizontalSeparator height="15px" />
        <Collapse>
          <HorizontalSeparator height="16px" />
          <Container
            padding="16px"
            borderTop="1px solid #DEE0E2"
            borderBottom="1px solid #DEE0E2"
            borderLeft="1px solid #DEE0E2"
            borderRight="1px solid #DEE0E2"
          >
            <Container display="grid" gridTemplateColumns="2fr 1fr 1.5fr 1fr">
              <Heading size="m">{item.packageType}</Heading>
              <Heading size="s">Weekly Cost</Heading>
              <Heading size="s">Quantity (days)</Heading>
              <Container textAlign="right">
                <Heading size="s">Total</Heading>
              </Container>
            </Container>
            <HorizontalSeparator height="10px" />
            <Container display="flex" alignItems="baseline">
              <Heading size="s">Package ID</Heading>
              <VerticalSeparator width="10px" />
              {item.carePackageId}
            </Container>
            <SinglePayRunBreakdown totalPayTitle={totalPayTitle} payRun={item} />
            <HorizontalSeparator height="16px" />
            <Container borderBottom="1px solid #DEE0E2" />
            <HorizontalSeparator height="10px" />
            {payRunId && (
              <Container display="grid" gridTemplateColumns="4fr 1fr">
                <Container display="flex">
                  <Link onClick={(e) => handleClick(e)} noVisited>
                    View package summary
                  </Link>
                  <VerticalSeparator width="32px" />
                  Assigned broker: {item?.assignedBrokerName?.toString()}
                </Container>
                <Container display="flex" justifyContent="flex-end">
                  <Link onClick={(e) => handlePastPaymentsClick(e)} noVisited>
                    Past payments
                  </Link>
                </Container>
              </Container>
            )}
          </Container>
        </Collapse>
      </Container>
      {payRunId && (
        <HoldPaymentDialog
          invoiceId={invoiceId}
          payRunId={payRunId}
          updateData={updateData}
          isOpen={openedModal === 'Hold'}
          closeModal={closeModal}
        />
      )}
      <ApproveRejectModal
        closeModal={closeModal}
        openedModal={openedModal !== 'Hold' && openedModal}
        payRunId={payRunId}
        title="Invoice"
        rejectRequest={rejectInvoiceStatus}
        updateData={updateData}
      />
    </>
  );
};

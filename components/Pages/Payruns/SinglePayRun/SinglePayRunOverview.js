import React, { useCallback } from 'react';
import { getNumberWithCommas } from 'service';
import { Button, Container, Heading, HorizontalSeparator, Select, VerticalSeparator } from 'components';
import { useDispatch } from 'react-redux';
import { releaseInvoice, updateInvoiceStatus } from 'api/PayRuns';
import { addNotification } from 'reducers/notificationsReducer';
import { getStatusSelectBackground, getStatusSelectTextColor } from 'service/serviceSelect';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';

const statusOptions = [
  { text: 'Draft', value: 1 },
  { text: 'Held', value: 2 },
  { text: 'Released', value: 3 },
  { text: 'Rejected', value: 4 },
  { text: 'Accepted', value: 5 },
];

export const SinglePayRunOverview = ({ payRunId, openModal, searchTerm, payRun, setInvoiceId, isActivePayRun, updateData, isHeld }) => {
  const dispatch = useDispatch();

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleChange = async (field) => {
    if (!isActivePayRun) return;

    if (field === '2' || field === '4') {
      setInvoiceId(payRun.id);
      openModal(field);
    } else {
      try {
        await updateInvoiceStatus(payRunId, payRun.id, field);
        pushNotification(`Invoice status changed`, 'success');
        updateData();
      } catch (e) {
        pushNotification(e, 'error');
      }
    }
  };

  const background = useCallback(getStatusSelectBackground(payRun.invoiceStatus), [payRun.invoiceStatus]);
  const color = useCallback(getStatusSelectTextColor(payRun.invoiceStatus), [payRun.invoiceStatus]);

  const handleServiceUserName = () => getHighlightedSearchQuery(payRun.serviceUserName, searchTerm);

  const handleClick = async () => {
    try {
      await releaseInvoice(payRunId, payRun.id);
      pushNotification(`Invoice released successfully`, 'success');
      updateData();
    } catch (e) {
      pushNotification(e, 'error');
    }
  };
  return (
    <>
      <Container display="flex" alignItems="baseline">
        <Heading size="m" color="#00664F">
          {handleServiceUserName()}
        </Heading>
        <VerticalSeparator width="24px" />
        <Heading size="s">Invoice ID:</Heading>
        <VerticalSeparator width="5px" />
        {payRun.invoiceId}
      </Container>
      <HorizontalSeparator height="15px" />
      <Container display="flex" alignItems="flex-end" justifyContent="space-between">
        <Container>
          <Container display="flex" alignItems="center">
            <Heading size="s">Supplier:</Heading>
            <VerticalSeparator width="5px" />
            {payRun.supplierId}
          </Container>
          {payRun.supplierName}
        </Container>
        <Container>
          <Heading size="s">Package Type:</Heading>
          {payRun.packageType}
        </Container>
        <Container>
          <Heading size="s">Total Cost:</Heading>
          {payRun.netTotal >= 0
            ? `£${getNumberWithCommas(payRun.netTotal)}`
            : `-£${getNumberWithCommas(Math.abs(payRun.netTotal))}`}
        </Container>
        {!isHeld ? (
          <Select
            style={{ background, color, border: 'none' }}
            options={statusOptions}
            disabled={!isActivePayRun}
            IconComponent={!isActivePayRun ? null : undefined}
            onChangeValue={handleChange}
            value={payRun.invoiceStatus}
          />
        ) : (
          <Button onClick={handleClick} secondary color="yellow">
            Release
          </Button>
        )}
      </Container>
    </>
  );
};

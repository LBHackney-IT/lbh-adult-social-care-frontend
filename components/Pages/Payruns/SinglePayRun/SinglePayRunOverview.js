import React, { useCallback } from 'react';
import { formatDate, formatNumberToCurrency } from 'service';
import { Button, Container, Heading, HorizontalSeparator, Select, VerticalSeparator } from 'components';
import { useDispatch } from 'react-redux';
import { releaseInvoice, updateInvoiceStatus } from 'api/PayRuns';
import { addNotification } from 'reducers/notificationsReducer';
import { getStatusSelectBackground, getStatusSelectTextColor } from 'service/serviceSelect';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';

const statusOptions = [
  { text: 'Held', value: 2 },
  { text: 'Rejected', value: 4 },
  { text: 'Accepted', value: 5 },
];

export const SinglePayRunOverview = ({
  payRunPeriods,
  payRunId,
  openModal,
  searchTerm,
  payRun,
  setInvoiceId,
  isActivePayRun,
  updateData,
  isHeld
}) => {
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
  const handleInvoiceNumber = () => getHighlightedSearchQuery(payRun.invoiceNumber, searchTerm);
  const handleSupplierId = () => getHighlightedSearchQuery(Number(payRun.supplierId).toString(), searchTerm);
  const handleSupplierName = () => getHighlightedSearchQuery(payRun.supplierName, searchTerm);

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
        <Heading size="s">Invoice Number:</Heading>
        <VerticalSeparator width="5px" />
        {handleInvoiceNumber()}
        <VerticalSeparator width={24} />
        {payRunPeriods && <>
          <Heading size="s">Pay Run Period:</Heading>
          <VerticalSeparator width="5px" />
          <p>
            {formatDate(payRunPeriods.startDate, 'dd/MM/yy')}
            {' - '}
            {formatDate(payRunPeriods.endDate, 'dd/MM/yy')}
          </p>
        </>}
      </Container>
      <HorizontalSeparator height="15px" />
      <Container display="grid" gridTemplateColumns="2fr 1.5fr 1fr 0.5fr" columnGap="10px" columnCount="3">
        <Container>
          <Container display="flex" alignItems="center">
            <Heading size="s">Supplier:</Heading>
            <VerticalSeparator width="5px" />
            {handleSupplierId()}
          </Container>
          {handleSupplierName()}
        </Container>
        <Container>
          <Heading size="s">Package Type:</Heading>
          {payRun.packageType}
        </Container>
        <Container>
          <Heading size="s">Total Cost:</Heading>
          {formatNumberToCurrency(payRun.netTotal)}
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
          <Container>
            <Button onClick={handleClick} secondary color="yellow">
              Release
            </Button>
          </Container>
        )}
      </Container>
    </>
  );
};

import React, { useCallback } from 'react';
import { getNumberWithCommas } from 'service';
import { Container, Heading, HorizontalSeparator, Select, VerticalSeparator } from 'components';
import { useDispatch } from 'react-redux';
import { updatePayRunStatus } from 'api/PayRuns';
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

export const SinglePayRunOverview = ({ searchTerm, payRun, setInvoiceId, update }) => {
  const dispatch = useDispatch();

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleChange = async (field) => {
    if (field === '2') {
      setInvoiceId(payRun.id);
    } else {
      try {
        await updatePayRunStatus(payRun.id, payRun.invoiceId, field);
        pushNotification(`Invoice status changed`, 'success');
        update();
      } catch (e) {
        pushNotification(e, 'error');
      }
    }
  };

  const background = useCallback(getStatusSelectBackground(payRun.invoiceStatus), [payRun.invoiceStatus]);
  const color = useCallback(getStatusSelectTextColor(payRun.invoiceStatus), [payRun.invoiceStatus]);

  return (
    <>
      <Container display="flex" alignItems="baseline">
        <Heading size="m">
          {React.useMemo(() => getHighlightedSearchQuery(payRun.serviceUserName, searchTerm), [payRun.serviceUserName, searchTerm])}
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
          <Heading size="s">Total Cost:</Heading>£{getNumberWithCommas(payRun.grossTotal)}
        </Container>
        <Select
          style={{ background, color, border: 'none' }}
          options={statusOptions}
          onChangeValue={handleChange}
          value={payRun.invoiceStatus}
        />
      </Container>
    </>
  );
};

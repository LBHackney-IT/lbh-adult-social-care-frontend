import React, { useState } from 'react';
import { getNumberWithCommas } from 'service';
import { Container, Heading, HorizontalSeparator, Select, VerticalSeparator } from 'components';
import { updatePayRunStatus } from 'api/PayRuns';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';

const statusOptions = [
  { text: 'Draft', value: 1 },
  { text: 'Held', value: 2 },
  { text: 'Released', value: 3 },
  { text: 'Rejected', value: 4 },
  { text: 'Accepted', value: 5 },
];



export const SinglePayRunOverview = ({ payRun }) => {
  const [statusValue, setStatusValue] = useState(payRun.invoiceStatus);
  const dispatch = useDispatch();

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleChange = async (field) => {
    try {
      await updatePayRunStatus(payRun.id, payRun.invoiceId, field);
      pushNotification(`Funded Nursing Care created successfully`, 'success');
      setStatusValue(field);
    } catch (e) {
      pushNotification(e);
    }
    setStatusValue(field);
  }

  return (
    <>
      <Container display="flex" alignItems="baseline">
        <Heading size="m">{payRun.serviceUserName}</Heading>
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
        <Select options={statusOptions} onChangeValue={handleChange} value={statusValue} />
      </Container>
    </>
  );
};

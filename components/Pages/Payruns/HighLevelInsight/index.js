import React from 'react';
import { Button, Container, Heading, Hint, HorizontalSeparator } from 'components';
import { getNumberWithCommas } from 'service';
import { approvePayRun } from 'api/PayRun';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';

export const HighLevelInsight = ({
  payRunId,
  total = 0,
  difference = 0,
  suppliers = 0,
  serviceUsers = 0,
  holdCount = 0,
  holdValue = 0,
}) => {
  const dispatch = useDispatch();
  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };
  const handleApprove = async () => {
    try {
      await approvePayRun({ payRunId });
      pushNotification(`Invoice status changed`, 'success');
    } catch (e) {
      pushNotification(e, 'error');
    }
  };

  const handleReject = () => {
    console.log('reject clicked');
  };

  const increaseOrDecrease = difference > 0 ? 'increase' : 'decrease';
  return (
    <Container background="#FAFAFA" padding="24px 16px">
      <Container display="grid" gridTemplateColumns="2fr 1fr 1fr 1.5fr 1fr" alignItems="flex-end">
        <Container display="flex" flexDirection="column">
          <Hint>High Level Insight</Hint>
          <HorizontalSeparator height="5px" />
          <Heading size="xl" color="#00664F">
            £{getNumberWithCommas(total)}
          </Heading>
          <HorizontalSeparator height="5px" />
          {`£${getNumberWithCommas(Math.abs(difference))} ${increaseOrDecrease} from last cycle`}
        </Container>
        <Container display="flex" flexDirection="column">
          <Heading size="xl" color="#00664F">
            {suppliers}
          </Heading>
          Suppliers
        </Container>
        <Container display="flex" flexDirection="column">
          <Heading size="xl" color="#00664F">
            {serviceUsers}
          </Heading>
          Service Users
        </Container>
        <Container display="flex" flexDirection="column">
          <Heading size="xl" color="#00664F">
            {holdCount}
          </Heading>
          Holds worth £{getNumberWithCommas(holdValue)}
        </Container>
        <Container display="flex" flexDirection="column">
          <Button onClick={handleApprove}>Approve</Button>
          <HorizontalSeparator height="10px" />
          <Button onClick={handleReject} outline>
            Reject
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

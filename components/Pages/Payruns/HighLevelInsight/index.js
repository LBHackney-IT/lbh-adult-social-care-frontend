import React, { useState } from 'react';
import { Button, Container, Heading, Hint, HorizontalSeparator } from 'components';
import { getNumberWithCommas } from 'service';
import ApproveDeclineModal from '../ApproveDeclineModal';

export const HighLevelInsight = ({
  payRunId,
  total = 0,
  difference = 0,
  suppliers = 0,
  serviceUsers = 0,
  holdCount = 0,
  holdValue = 0,
  update,
}) => {
  const [openedModal, setOpenedModal] = useState('');

  const openModal = (name) => () => setOpenedModal(name);

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
          <Container border="1px solid rgba(82, 90, 91, 0.25)" />

          <Container display="flex" flexDirection="column" textAlign="center" alignSelf="center">
            <Heading size="xl" color="#00664F">
              {suppliers}
            </Heading>
            Suppliers
          </Container>
          <Container border="1px solid rgba(82, 90, 91, 0.25)" />
          <Container display="flex" flexDirection="column" textAlign="center" alignSelf="center">
            <Heading size="xl" color="#00664F">
              {serviceUsers}
            </Heading>
            Service Users
          </Container>
          <Container border="1px solid rgba(82, 90, 91, 0.25)" />
          <Container display="flex" flexDirection="column" textAlign="center" alignSelf="center">
            <Heading size="xl" color="#00664F">
              {holdCount}
            </Heading>
            Holds worth £{getNumberWithCommas(holdValue)}
          </Container>
          <Container display="flex" flexDirection="column" alignSelf="center">
            <Button onClick={openModal('Approve')}>Approve</Button>
            <HorizontalSeparator height="10px" />
            <Button className="no-border link-button" color="red" secondary onClick={openModal('Decline')} outline>
              Reject
            </Button>
          </Container>
        </Container>
      </Container>
    </>
  );
};

import { Button, Container, Dialog, Heading, Hint, HorizontalSeparator } from 'components';
import DatePick from 'components/DatePick';
import React, { memo, useState } from 'react';
import { formatDate, getNumberWithCommas } from 'service';

const EndCareChargeModal = ({ isOpen, onClose, handleConfirmation, chargeType, careCharge }) => {
  const charge = careCharge[0];
  const handleSubmit = () => {
    handleConfirmation(endDate);
    onClose();
  };
  const [endDate, setEndDate] = useState(charge?.endDate ? new Date(charge?.endDate) : new Date());
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Container display="flex" flexDirection="column">
        <Heading size="l">End current element</Heading>
        <HorizontalSeparator height="30px" />
        <Container
          borderTop="1px solid #c9cacb"
          borderBottom="1px solid #c9cacb"
          borderRight="1px solid #c9cacb"
          borderLeft="1px solid #c9cacb"
          padding="24px"
        >
          <Heading size="m">Residential SU contribution</Heading>
          <Hint>{chargeType}</Hint>
          <HorizontalSeparator height="15px" />
          <Container display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr">
            <Container>
              <Heading size="s">Value</Heading>£{getNumberWithCommas(charge?.cost)}
            </Container>
            <Container>
              <Heading size="s">Start date</Heading>
              {formatDate(charge?.startDate)}
            </Container>
            <Container>
              <Heading size="s">End date</Heading>
              {formatDate(endDate)}
            </Container>
            <Container>
              <Heading size="s">Type</Heading>
              Net
            </Container>
          </Container>
          <HorizontalSeparator height="15px" />
          <Heading size="s">End date</Heading>
          <DatePick dateValue={endDate} setDate={setEndDate} />
        </Container>
        <HorizontalSeparator height={24} />
        <Container display="flex" justifyContent="space-between">
          <Button onClick={handleSubmit} outline secondary color="gray" largeButton>
            Cancel
          </Button>

          <Button onClick={handleSubmit} largeButton>
            End element
          </Button>
        </Container>
      </Container>
    </Dialog>
  );
};

export default memo(EndCareChargeModal);

import { Button, Container, Dialog, Heading, Hint, HorizontalSeparator } from 'components';
import DatePick from 'components/DatePick';
import React, { memo, useState } from 'react';
import { formatDate, getNumberWithCommas } from 'service';

const EndCarePackageModal = ({ isOpen, onClose, handleConfirmation, packageData }) => {
  const handleSubmit = () => {
    handleConfirmation(endDate);
    onClose();
  };

  const [endDate, setEndDate] = useState(packageData?.endDate ? new Date(packageData?.endDate) : new Date());

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Container display="flex" flexDirection="column">
        <Heading size="l">End current packageData</Heading>
        <HorizontalSeparator height="30px" />
        <Container padding="24px">
          <Heading size="m">Residential SU contribution</Heading>
          <HorizontalSeparator height="15px" />
          <Container display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr">
            <Container>
              <Heading size="s">Value</Heading>£{getNumberWithCommas(packageData?.cost)}
            </Container>
            <Container>
              <Heading size="s">Start date</Heading>
              {formatDate(packageData?.startDate)}
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
          <Heading size="s">Select an end date for this package</Heading>
          <DatePick dateValue={endDate} setDate={setEndDate} />
        </Container>
        <HorizontalSeparator height={24} />
        <Container display="flex" justifyContent="space-between">
          <Button onClick={handleSubmit} outline secondary color="gray" largeButton>
            Cancel
          </Button>

          <Button onClick={handleSubmit} largeButton>
            End package
          </Button>
        </Container>
      </Container>
    </Dialog>
  );
};

export default memo(EndCarePackageModal);

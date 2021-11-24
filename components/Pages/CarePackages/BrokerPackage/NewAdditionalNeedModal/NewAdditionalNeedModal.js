import { Container, Dialog, Heading, HorizontalSeparator, Tab, Tabs } from 'components';
import React, { memo } from 'react';
import { NewWeeklyNeed } from './NewWeeklyNeed';
import { NewOneOffNeed } from './NewOneOffNeed';

const NewAdditionalNeedModal = ({ isOpen, onClose, handleConfirmation }) => {
  const handleSubmit = (newNeed) => {
    handleConfirmation(newNeed);
    onClose();
  };
  const tabs = ['Weekly', 'One-Off'];
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Container display="flex" flexDirection="column">
        <Heading size="l">New Additional Need</Heading>
        <HorizontalSeparator height="30px" />
        <Tabs tabs={tabs}>
          <Tab>
            <NewWeeklyNeed createNeed={handleSubmit} />
          </Tab>
          <Tab>
            <NewOneOffNeed createNeed={handleSubmit} />
          </Tab>
        </Tabs>
      </Container>
    </Dialog>
  );
};

export default memo(NewAdditionalNeedModal);

import { Button, Container, Dialog, Heading, HorizontalSeparator, Tab, Tabs, VerticalSeparator } from 'components';
import React, { memo } from 'react';
import { NewWeeklyNeed } from './NewWeeklyNeed';
import { NewOneOffNeed } from './NewOneOffNeed';

const NewAdditionalNeedModal = ({ isOpen, onClose, handleConfirmation }) => {
  const handleClick = (newNeed) => {
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
            <NewWeeklyNeed />
          </Tab>
          <Tab>
            <NewOneOffNeed />
          </Tab>
        </Tabs>
        <Container display="flex" justifyContent="flex-end">
          <Button onClick={handleClick}>Add need</Button>
        </Container>
      </Container>
    </Dialog>
  );
};

export default memo(NewAdditionalNeedModal);

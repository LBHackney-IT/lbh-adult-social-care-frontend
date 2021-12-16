import { Container, Dialog, Heading, HorizontalSeparator, Tab, Tabs } from 'components';
import React, { memo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NewWeeklyNeed } from './NewWeeklyNeed';
import { NewOneOffNeed } from './NewOneOffNeed';

const initialWeeklyNeed = {
  startDate: null,
  cost: null,
  type: 2,
  costPeriod: 2,
  id: uuidv4(),
  isNew: true,
};

const initialOneOfNeed = {
  startDate: null,
  endDate: null,
  cost: null,
  type: 2,
  costPeriod: 3,
  id: uuidv4(),
  isNew: true,
};

const NewAdditionalNeedModal = ({ isOpen, onClose, handleConfirmation }) => {
  const [weeklyNeed, setWeeklyNeed] = useState(initialWeeklyNeed);
  const [oneOfNeed, setOneOfNeed] = useState(initialOneOfNeed);

  const handleClose = () => {
    setOneOfNeed({ ...initialOneOfNeed});
    setWeeklyNeed({ ...initialWeeklyNeed});
    onClose();
  };

  const handleSubmit = (newNeed) => {
    handleConfirmation(newNeed);
    handleClose();
  };

  const onChangeValue = (setter) => ({ field, value }) => {
    setter(prevState => ({
      ...prevState,
      [field.name]: value
    }));
    field.onChange(value);
  };

  const tabs = ['Weekly', 'One-Off'];

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <Container display="flex" flexDirection="column">
        <Heading size="l">New Additional Need</Heading>
        <HorizontalSeparator height="30px" />
        <Tabs tabs={tabs}>
          <Tab>
            <NewWeeklyNeed
              onChangeValue={onChangeValue(setWeeklyNeed)}
              defaultValues={weeklyNeed}
              createNeed={handleSubmit}
            />
          </Tab>
          <Tab>
            <NewOneOffNeed
              onChangeValue={onChangeValue(setOneOfNeed)}
              defaultValues={oneOfNeed}
              createNeed={handleSubmit}
            />
          </Tab>
        </Tabs>
      </Container>
    </Dialog>
  );
};

export default memo(NewAdditionalNeedModal);

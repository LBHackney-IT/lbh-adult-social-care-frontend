import { createDraftPayRun } from 'api/PayRun';
import { Container, Dialog, Heading, HorizontalSeparator, Tab, Tabs } from 'components';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { AdHocAndReleases } from './AdHocAndReleases';
import { RegularCycles } from './RegularCycles';

const CreatePayRunModal = ({ isOpen, onClose, update }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (newPayRun) => {
    const foramttedPayRun = {
      ...newPayRun,
      paidUpToDate: new Date(newPayRun.paidUpToDate).toISOString(),
      paidFromDate:
        newPayRun.paidFromDate && !newPayRun.isOngoing ? new Date(newPayRun.paidFromDate).toISOString() : null,
    };
    createPayRun(foramttedPayRun);
  };

  const createPayRun = async (data) => {
    setIsLoading(true);
    try {
      await createDraftPayRun({ data });
      update();
      onClose();
      dispatch(
        addNotification({
          text: 'payrun successfully created',
          className: 'success',
        })
      );
    } catch (e) {
      dispatch(
        addNotification({
          text: e,
        })
      );
    }
    setIsLoading(false);
  };

  const tabs = ['Regular Cycles', 'Ad-Hoc and Releases'];
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Container display="flex" flexDirection="column">
        <Heading size="l">New Additional Need</Heading>
        <HorizontalSeparator height="30px" />
        <Tabs tabs={tabs}>
          <Tab>
            <RegularCycles createPayrun={handleSubmit} isLoading={isLoading} />
          </Tab>
          <Tab>
            <AdHocAndReleases createPayrun={handleSubmit} isLoading={isLoading} />
          </Tab>
        </Tabs>
      </Container>
    </Dialog>
  );
};

export default memo(CreatePayRunModal);

import React, { memo, useState } from 'react';
import { createDraftPayRun } from 'api/PayRun';
import { Dialog, Heading, HorizontalSeparator, Tab, Tabs } from 'components';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { dateToISOString } from 'service';
import { AdHocAndReleases } from './AdHocAndReleases';
import { RegularCycles } from './RegularCycles';

const CreatePayRunModal = ({ isOpen, onClose, update }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (newPayRun) => {
    const data = {
      ...newPayRun,
      paidUpToDate: dateToISOString(newPayRun.paidUpToDate),
      paidFromDate: newPayRun.paidFromDate && !newPayRun.isOngoing ? dateToISOString(newPayRun.paidFromDate) : null,
    };

    setIsLoading(true);
    try {
      await createDraftPayRun({ data });
      update();
      onClose();
      dispatch(addNotification({ text: 'Payrun successfully created', className: 'success' }));
    } catch (e) {
      dispatch(addNotification({ text: e }));
    }
    setIsLoading(false);
  };

  const tabs = ['Regular Cycles', 'Ad-Hoc/Releases'];
  return (
    <Dialog className='create-pay-run__modal' isOpen={isOpen} onClose={onClose}>
      <Heading size="l">New Additional Need</Heading>
      <HorizontalSeparator height="30px" />
      <Tabs tabs={tabs}>
        <Tab>
          <RegularCycles createPayrun={handleSubmit} isLoading={isLoading} onClose={onClose} />
        </Tab>
        <Tab>
          <AdHocAndReleases createPayrun={handleSubmit} isLoading={isLoading} onClose={onClose} />
        </Tab>
      </Tabs>
    </Dialog>
  );
};

export default memo(CreatePayRunModal);

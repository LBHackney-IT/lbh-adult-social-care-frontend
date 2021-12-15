import React, { memo, useState } from 'react';
import { createDraftPayRun } from 'api/PayRun';
import { Dialog, Heading, HorizontalSeparator, Tab, Tabs } from 'components';
import { dateToIsoString, usePushNotification } from 'service';
import { AdHocAndReleases } from './AdHocAndReleases';
import { RegularCycles } from './RegularCycles';

const CreatePayRunModal = ({ isOpen, onClose, update }) => {
  const pushNotification = usePushNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (newPayRun) => {
    const data = {
      ...newPayRun,
      paidUpToDate: dateToIsoString(newPayRun.paidUpToDate),
      paidFromDate: null,
    };

    setIsLoading(true);
    try {
      await createDraftPayRun({ data });
      update();
      onClose();
      pushNotification('Payrun successfully created', 'success');
    } catch (e) {
      pushNotification(e);
    }
    setIsLoading(false);
  };

  const tabs = ['Regular Cycles', 'Ad-Hoc/Releases'];
  return (
    <Dialog className="create-pay-run__modal" isOpen={isOpen} onClose={onClose}>
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
